# @poppinss/prompts
> Beautiful CLI prompts powered by [@clack/prompts](https://www.npmjs.com/package/@clack/prompts) with built-in testing support

[![gh-workflow-image]][gh-workflow-url] [![typescript-image]][typescript-url] [![npm-image]][npm-url] [![license-image]][license-url]

## Why this package exists?

There are many CLI prompt libraries in the Node ecosystem. However, they all fall short when it comes to writing tests that involve prompts.

Let's say you are writing tests for a command that triggers CLI prompts. Unfortunately, the CLI process will stall since it is waiting for manual input.

This package makes testing prompts easier by allowing you to **trap** them during testing.

## Usage

Install the package from the npm registry as follows.

```sh
npm i @poppinss/prompts
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
      return choices.length > 0 || 'Select at least one driver'
    },
  }
)
```

## Available prompts
Following is the list of available prompts

### ask

Prompt the user to type text.

```ts
await prompt.ask('Specify the model name')
```

```ts
// With validation
await prompt.ask('Specify the model name', {
  validate(value) {
    return value.length > 0 || 'Model name is required'
  },
})
```

```ts
// With default value
await prompt.ask('Specify the model name', {
  default: 'User',
})
```

```ts
// With hint (shown as placeholder)
await prompt.ask('Specify the model name', {
  hint: 'e.g. User',
})
```

### secure

Prompt the user to type text with masked output.

```ts
await prompt.secure('Enter account password')
```

```ts
// With custom mask character
await prompt.secure('Enter account password', {
  mask: '*',
})
```

```ts
// With validation
await prompt.secure('Enter account password', {
  validate(value) {
    return value.length >= 6 || 'Password must be at least 6 characters'
  },
})
```

### list

Accept a comma-separated list of values.

```ts
const tags = await prompt.list('Enter tags to assign')
```

### confirm

Present the user with a `Y/N` option and return a boolean.

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

Display a list of choices for single selection.

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
    message: 'PostgreSQL',
    hint: 'recommended' 
  },
  { 
    name: 'mssql',
    message: 'MSSQL', 
    disabled: true 
  },
])
```

```ts
// Limit visible options (scrollable)
await prompt.choice('Select framework', ['React', 'Vue', 'Svelte', 'Solid', 'Angular'], {
  maxItems: 3,
})
```

```ts
// Default selection by value
await prompt.choice('Select package manager', ['npm', 'yarn', 'pnpm'], {
  default: 'pnpm',
})
```

### multiple

Display a list of choices for multiple selection.

```ts
await prompt.multiple('Select database drivers', [
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
  },
])
```

```ts
// With maxItems and default values
await prompt.multiple('Select features', ['Auth', 'Mail', 'Cache', 'Queue'], {
  maxItems: 3,
  default: ['Auth'],
})
```

### autocomplete

A searchable select prompt with fuzzy filtering.

```ts
// Single selection
const city = await prompt.autocomplete('Select your city', cities)
```

```ts
// Multiple selection
const cities = await prompt.autocomplete('Select cities', cities, {
  multiple: true,
  limit: 5,
})
```

### selectKey

Select a value by pressing a key bound to an option.

```ts
const env = await prompt.selectKey('Select environment', [
  { name: 'p', message: 'Production', hint: 'deploy to prod' },
  { name: 's', message: 'Staging' },
  { name: 'd', message: 'Development' },
])
// User presses 'p' → env === 'p'
```

### groupMultiselect

Multiple selection organized by named groups.

```ts
const packages = await prompt.groupMultiselect('Select packages', {
  Database: [
    { name: 'lucid', message: '@adonisjs/lucid' },
    { name: 'redis', message: '@adonisjs/redis' },
  ],
  Auth: [
    { name: 'auth', message: '@adonisjs/auth' },
    { name: 'bouncer', message: '@adonisjs/bouncer' },
  ],
})
```

```ts
// With selectable group headers
await prompt.groupMultiselect('Select packages', groups, {
  selectableGroups: true,
})
```

### path

File or directory path input with filesystem autocomplete.

```ts
const file = await prompt.path('Select config file')
```

```ts
// Directories only
const dir = await prompt.path('Select output directory', {
  onlyDirectories: true,
})
```

### group

Chain prompts sequentially, passing accumulated results to each subsequent prompt.

```ts
const config = await prompt.group({
  name: () => prompt.ask('Project name'),
  useTs: () => prompt.confirm('Use TypeScript?'),
  framework: ({ results }) =>
    prompt.choice(`Setup ${results.name} with`, ['React', 'Vue', 'Svelte']),
})

// config.name, config.useTs, config.framework
```

## Prompt options

### Common options

| Option     | Type          | Description                                                                                                                          |
| ---------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `default`  | varies        | Default value when no input is provided                                                                                              |
| `name`     | `string`      | Unique name for the prompt (used for trapping)                                                                                       |
| `hint`     | `string`      | Hint text shown as placeholder in the input field                                                                                    |
| `validate` | `Function`    | Validate user input. Return `true` to pass, or a string error message to fail. Supports async validators.                            |
| `result`   | `Function`    | Transform the return value before it is returned                                                                                     |
| `format`   | `Function`    | Visual-only: transforms the displayed value during input (no effect on the return value). Not supported by all underlying renderers. |
| `signal`   | `AbortSignal` | Cancel the prompt programmatically via an AbortController                                                                            |

### Prompt-specific options

| Option             | Prompt               | Type      | Description                                |
| ------------------ | -------------------- | --------- | ------------------------------------------ |
| `mask`             | `secure`             | `string`  | Custom mask character (default: bullet)    |
| `maxItems`         | `choice`, `multiple` | `number`  | Limit visible options with scrolling       |
| `limit`            | `autocomplete`       | `number`  | Max visible autocomplete options           |
| `multiple`         | `autocomplete`       | `boolean` | Enable multiple selection                  |
| `selectableGroups` | `groupMultiselect`   | `boolean` | Allow selecting entire groups              |
| `onlyDirectories`  | `path`               | `boolean` | Restrict to directories only               |
| `root`             | `path`               | `string`  | Base directory for filesystem autocomplete |
| `seperator`        | `list`               | `string`  | Custom separator (default: `,`)            |

### Choice object

Choices for `choice`, `multiple`, `selectKey`, and `groupMultiselect` can be objects:

```ts
{
  name: 'value',      // The value returned when selected
  message: 'Display', // Text displayed in the terminal
  hint: 'extra info', // Optional hint text
  disabled: true,     // Optional: disable this option
}
```

## Testing traps

The biggest reason for using this package is the testing traps API. Testing traps allow you to handle prompts programmatically.

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

// Trap by name
prompt.trap('modelName').replyWith('User')
```

### Trap methods

#### replyWith

Set the return value for the prompt.

```ts
prompt.trap('modelName').replyWith('User')
```

#### accept

Accept `toggle` and `confirm` prompts with `true`.

```ts
prompt.trap('Want to delete all files?').accept()
```

#### reject

Reject `toggle` and `confirm` prompts with `false`.

```ts
prompt.trap('Want to delete all files?').reject()
```

#### chooseOption

Choose an option by index for `select` and `selectKey` prompts.

```ts
prompt.trap('Select package manager').chooseOption(0)
```

#### chooseOptions

Choose multiple options by indexes for `multiselect` and `groupMultiselect` prompts. For `groupMultiselect`, indexes are flattened across all groups.

```ts
prompt.trap('Select database drivers').chooseOptions([1, 2])
```

#### cancel

Simulate a prompt cancellation (Ctrl+C / Escape). The prompt will throw `E_PROMPT_CANCELLED`.

```ts
prompt.trap('Enter name').cancel()
```

### Assertions

You can define assertions to test the `validate` method behavior.

```ts
// Assert that empty string fails validation
prompt.trap('modelName').assertFails('')

// Assert with expected error message
prompt.trap('modelName').assertFails('', 'Enter model name')

// Assert with regex match on error message
prompt.trap('modelName').assertFails('', /required/)

// Assert that a value passes validation
prompt.trap('modelName').assertPasses('User')
```

Assertions can be chained:

```ts
prompt
  .trap('modelName')
  .assertFails('', 'Model name is required')
  .assertPasses('User')
  .assertPasses('app_user')
  .replyWith('User')
```

### Testing group prompts

Trap each individual prompt within the group:

```ts
prompt.trap('Project name').replyWith('my-app')
prompt.trap('Use TypeScript?').accept()

const config = await prompt.group({
  name: () => prompt.ask('Project name'),
  useTs: () => prompt.confirm('Use TypeScript?'),
})
```

### Testing cancellation

```ts
import { Prompt, errors } from '@poppinss/prompts'

const prompt = new Prompt()
prompt.trap('Enter name').cancel()

try {
  await prompt.ask('Enter name')
} catch (error) {
  assert.instanceOf(error, errors.E_PROMPT_CANCELLED)
  assert.equal(error.code, 'E_PROMPT_CANCELLED')
}
```

## Handling cancellation

When a prompt is cancelled using `Ctrl+C`, it throws an `E_PROMPT_CANCELLED` error.

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
