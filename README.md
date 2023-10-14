# @poppinss/prompts
> Wrapper over [enquirer](https://npm.im/enquirer) with better support for testing

[![gh-workflow-image]][gh-workflow-url] [![typescript-image]][typescript-url] [![npm-image]][npm-url] [![license-image]][license-url]

## Why this package exists?
There are many CLI prompts libraries in the Node ecosystem. However, they all fall short when it comes to writing tests that involve prompts.

Let's say you are writing tests for a command that triggers CLI prompts. Unfortunately, the CLI process will stall since it is waiting for manual input. 

This package makes testing prompts easier by allowing you to trap them during testing.

It is worth noting we only export the following prompts from the [enquirer package](https://npm.im/enquirer), and also, the API is somewhat different.

- input
- list
- password
- confirm
- toggle
- select
- multiselect
- autocomplete

## Usage
Install the package from the npm registry as follows.

```sh
npm i @poppinss/prompts

# Yarn lovers
yarn add @poppinss/prompts
```

Next, create an instance of the prompt class. If you want, you can re-use the single instance throughout the entire process lifecycle.

```ts
import { Prompt } from '@poppinss/prompts'

const prompt = new Prompt()

const modelName = await prompt.ask('Specify the model name')

const drivers = await prompt.multiple(
  'Select database drivers',
  [
    {
      name: 'sqlite',
      message: 'SQLite3',
    },
    {
      name: 'mysql',
      message: 'MYSQL',
    },
  ],
  {
    validate(choices) {
      return choices.length > 0
    }
  }
)
```

## Available prompts
Following is the list of available prompts

### ask
Prompt the user to type text. The `ask` method uses the [enquirer input](https://github.com/enquirer/enquirer#input-prompt) prompt.

The method accepts the prompt message as the first param and the [options object](#prompt-options) as the second param.

```ts
await prompt.ask('Specify the model name')
```

```ts
// Validate input
await prompt.ask('Specify the model name', {
  validate(value) {
    return value.length > 0
  }
})
```

```ts
// Default value
await prompt.ask('Specify the model name', {
  default: 'User'
})
```

### secure
Prompt the user to type text. The output on the terminal gets masked with a star `*`. The `secure` method uses the [enquirer password](https://github.com/enquirer/enquirer#password-prompt) prompt.

The method accepts the prompt message as the first param and the options object as the second param.

```ts
await prompt.secure('Enter account password')
```

```ts
await prompt.secure('Enter account password', {
  validate(value) {
    return value.length < 6
      ? 'Password must be 6 characters long'
      : true
  }
})
```

### list

The `list` method uses the [enquirer list](https://github.com/enquirer/enquirer#list-prompt) prompt. It allows you to accept a comma-separated list of values.

```ts
const tags = await prompt.list('Enter tags to assign')
```

```ts
// Default list of tags
const tags = await prompt.list('Enter tags to assign', {
  default: ['node.js', 'javascript']
})
```

### confirm

The `confirm` method uses [enquirer confirm](https://github.com/enquirer/enquirer#confirm-prompt) prompt. It presents the user with a `Y/N` option and returns a boolean value.

```ts
const shouldDeleteFiles = await prompt.confirm('Want to delete all files?')

if (shouldDeleteFiles) {
  // take action
}
```

### toggle

The `toggle` prompt is similar to the `confirm` prompt but allows you to specify custom display values for `true` and `false`.

```ts
const shouldDeleteFiles = await prompt.confirm('Want to delete all files?', ['Yup', 'Nope'])

if (shouldDeleteFiles) {
  // take action
}
```

### choice

The `choice` method uses the [enquirer select](https://github.com/enquirer/enquirer#select-prompt) prompt. It allows you to display a list of choices for selection.

```ts
await prompt.choice('Select package manager', [
  'npm',
  'yarn',
  'pnpm'
])
```

The selection options can also be an object with the `name` and the `message` properties. 

- The value of the `name` property is returned as the prompt result.
- The `message` property is displayed in the terminal.

```ts
await prompt.choice('Select database driver', [
  {
    name: 'sqlite',
    message: 'SQLite'
  },
  {
    name: 'mysql',
    message: 'MySQL'
  },
  {
    name: 'pg',
    message: 'PostgreSQL'
  }
])
```

### multiple

The `multiple` method uses the [enquirer multiselect](https://github.com/enquirer/enquirer#multiselect-prompt) prompt. It allows you to display a list of choices for multiple selections.

```ts
await prompt.multiple('Select database driver', [
  {
    name: 'sqlite',
    message: 'SQLite'
  },
  {
    name: 'mysql',
    message: 'MySQL'
  },
  {
    name: 'pg',
    message: 'PostgreSQL'
  }
])
```

### autocomplete

The `autocomplete` prompt is a combination of the `select` and the `multiselect` prompt, but with the ability to fuzzy search the choices.

```ts
const cities = []

await prompt.autocomplete('Select your city', cities)
```

## Prompt Options

Following is the list of options accepted by the prompts.

<table>
    <tr>
        <td>Option</td>
        <td>Accepted by</td>
        <td>Type</td>
        <td>Description</td>
    </tr>
    <tr>
        <td><code>default</code></td>
        <td>All prompts</td>
        <td>String</td>
        <td>
        The default value to use when no value is entered. In case of <code>select</code>, <code>multiselect</code>, and <code>autocomplete</code> prompts, the value can be the choices array index.
        </td>
    </tr>
    <tr>
        <td><code>name</code></td>
        <td>All prompts</td>
        <td>String</td>
        <td>The unique name for the prompt</td>
    </tr>
    <tr>
        <td><code>hint</code></td>
        <td>All prompts</td>
        <td>String</td>
        <td>The hint text to display next to the prompt</td>
    </tr>
    <tr>
        <td><code>result</code></td>
        <td>All prompts</td>
        <td>Function</td>
        <td>
        <p>
        Transform the prompt return value. The value passed to the <code>result</code> method depends upon the prompt. For example, the <code>multiselect</code> prompt value will be an array of selected choices.
        </p>
        <pre><code>{
  result(value) {
    return value.toUpperCase()
  }
}</code></pre>
        </td>
    </tr>
    <tr>
        <td><code>format</code></td>
        <td>All prompts</td>
        <td>Function</td>
        <td>
        <p>Format the input value as the user types. The formatting is only applied to the CLI output, not the return value.</p>
        <pre><code>{
  format(value) {
    return value.toUpperCase()
  }
}</code></pre>
        </td>
    </tr>
    <tr>
        <td><code>validate</code></td>
        <td>All prompts</td>
        <td>Function</td>
        <td><p>Validate the user input. Returning <code>true</code> from the method will be pass the validation. Returning <code>false</code> or an error message string will be considered as a failure.</p>
        <pre><code>{
  format(value) {
    return value.length > 6
      ? true
      : 'Model name should be atleast 6 characters long.'
  }
}</code></pre></td>
    </tr>
    <tr>
        <td><code>limit</code></td>
        <td><code>autocomplete</code></td>
        <td>Number</td>
        <td>Limit the number of options to display. You will have you to scroll to view the rest of the options.</td>
    </tr>
</table>

## Testing traps
The biggest reason for using this package is for the testing traps API. Testing traps allow you to handle prompts programmatically.

In the following example, we trap the prompt by its display message and answer it using the `replyWith` method.

```ts
import { Prompt } from '@poppinss/prompts'
const prompt = new Prompt()

test('test some example command', () => {
  prompt.trap('Specify the model name').replyWith('User')

  // run command that triggers the prompt
})
```

The `prompt.trap` method matches the exact prompt message. You can also assign a unique name to your prompts and use that for trapping the prompt. For example:

```ts
await prompt.ask('Specify the model name', {
  name: 'modelName'
})

// Trap with prompt name
prompt.trap('modelName')
```

### Assertions
You can define assertions on the prompt to test the `validate` method behavior. For example: Assert that the validate method disallows empty strings.

```ts
prompt
  .trap('modelName')
  .assertFails('')

// Assert the validation method to print a specific error message
prompt
  .trap('modelName')
  .assertFails('', 'Enter model name')
```

The `assertFails` method accepts the input to be tested against the `validate` method. The second argument is an optional message you expect the `validate` method to print.

Similarly, you can use the `assertPasses` method to test whether the `validate` method allows for acceptable values.

```ts
prompt
  .trap('modelName')
  .assertPasses('User')
  .assertPasses('app_user')
  .assertPasses('models/User')
  .replyWith('User')
```

### Traps API

Following is the list of available methods on a trapped prompt.

#### replyWith

Set the return value for the prompt.

```ts
prompt.trap('modelName').replyWith('User')
```

#### accept

Accept the `toggle` and the `confirm` prompts with a `true` value.

```ts
prompt.trap('Want to delete all files?').accept()
```

#### reject

Reject the `toggle` and the `confirm` prompts with a `false` value.

```ts
prompt.trap('Want to delete all files?').reject()
```

#### chooseOption

Choose an option by its index for a `select` prompt.

```ts
prompt
  .trap('Select package manager')
  .chooseOption(0)
```

If you do not choose any option explicitly, then the first option will be selected by default.

#### chooseOptions

Choose multiple options by their indexes for a `multiselect` prompt.

```ts
prompt
  .trap('Select database manager')
  .chooseOptions([1, 2])
```

## Handling prompts cancellation error
Enquirer throws an error when a prompt is cancelled using `Ctrl + C`. You can capture the exception by wrapping the prompt display code inside a `try/catch` block and check for `E_PROMPT_CANCELLED` error.

```ts
import { Prompt, errors } from '@poppinss/prompts'

const prompt = new Prompt()

try {
  const modelName = await prompt.ask('Specify the model name')
} catch (error) {
  if (error instanceof errors.E_PROMPT_CANCELLED) {
    console.log('Prompt cancelled')
  }
}
```

[gh-workflow-image]: https://img.shields.io/github/actions/workflow/status/poppinss/prompts/checks.yml?style=for-the-badge
[gh-workflow-url]: https://github.com/poppinss/prompts/actions/workflows/checks.yml "Github action"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]: "typescript"

[npm-image]: https://img.shields.io/npm/v/@poppinss/prompts.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/@poppinss/prompts 'npm'

[license-image]: https://img.shields.io/npm/l/@poppinss/prompts?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md 'license'
