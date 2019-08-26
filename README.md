# Prompts
> Module on top of [enquirer](https://github.com/enquirer/enquirer) with API for testing as well.

This module is used by AdonisJs with capabilities to use the fake API to test the prompts. I have only implemented a subset of enquirer prompt types, since these are the only ones I need. However, I am open to accept PR for more.

[![circleci-image]][circleci-url] [![npm-image]][npm-url] ![][typescript-image] [![license-image]][license-url]

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of contents

- [Why use this module?](#why-use-this-module)
- [Usage](#usage)
- [Implemented Prompt types](#implemented-prompt-types)
    - [ask(title: string, options?: TextPromptOptions)](#asktitle-string-options-textpromptoptions)
    - [secure(title: string, options?: TextPromptOptions)](#securetitle-string-options-textpromptoptions)
    - [confirm(title: string, options?: BooleanPromptOptions)](#confirmtitle-string-options-booleanpromptoptions)
    - [toggle(title: string, choices: [string, string], options?: TogglePromptOptions)](#toggletitle-string-choices-string-string-options-togglepromptoptions)
    - [choice(title: string, choices: (string | {})[], options?: ChoicePromptOptions)](#choicetitle-string-choices-string---options-choicepromptoptions)
    - [multiple(title: string, choices: (string | {})[], options?: MultiplePromptOptions)](#multipletitle-string-choices-string---options-multiplepromptoptions)
- [Maintainers](#maintainers)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Why use this module?
When using [enquirer](https://github.com/enquirer/enquirer), there is no simple way to test your code that makes use of prompts, since prompts needs manual intervention. This module ships with a parallel implementation that uses the Event emitter to write tests for prompts. For example:

You want test a command that asks for the username and password and this is how you may go about writing it.

```ts
class MyCommand {
  constructor (prompt) {
    this.prompt = prompt
  }

  async run () {
    const username = await this.prompt.ask('Enter account username', { name: 'username' })
    const password = await this.prompt.ask('Enter account password', { name: 'password' })

    console.log({ username, password })
  }
}
```

During the tests, you can pass the emitter based prompt instance to your command as shown below:

```ts
import { FakePrompt } from '@poppinss/prompts'
const prompt = new FakePrompt()

prompt.on('prompt', (prompt) => {
  if (prompt.name === 'username') {    
    prompt.answer('virk')
  } else {
    prompt.answer('secret-password')
  }
})

const myCommand = new MyCommand(prompt)
await myCommand.run()
```

It is as simple as that. There is no need to make any code changes, just make use of the `FakePrompt` class over `Prompt`.

## Usage
Install the package from the npm registry as follows:

```sh
npm i @poppinss/prompts

# yarn
yarn add @poppinss/prompts
```

and then use it as follows:

```ts
import { Prompt } from '@poppinss/prompts'
const prompt = new Prompt()

const username = await prompt.ask('What is your username?')
const password = await prompt.secure('Enter account password')
const client = await prompt.choice('Choose installation client', ['npm', 'yarn'])
```

During tests, replace `Prompt` with `FakePrompt` and everything works as expected. However, do make sure that you listen for the `prompt` event and answer every prompt, otherwise your tests will hang.

## Implemented Prompt types
The following prompt types from enquirer are implemented. The method names exposed by this module are different (my personal preference).

#### ask(title: string, options?: TextPromptOptions)
Uses the `input` prompt type. Optionally you can define the following options.

- **default**: The default value to be used.
- **name**: Name of the prompt. Helpful when you want to answer prompts during testing.
- **format**: Format the value before resolving the promise.
- **validate**: Validate the value to ensure it is correct.

```ts
await prompt.ask('Choose account username', {
  validate (answer) {
    if (!answer || answer.length < 6) {
      return 'Username is required and must be over 6 characters'
    }
    return true
  }
})
```

#### secure(title: string, options?: TextPromptOptions)
Uses the `password` prompt type. You can define the same options as the `ask` method.

```ts
await prompt.secure('Enter account password', {
  validate (answer) {
    if (!answer) {
      return 'Password is required to login'
    }
    return true
  }
})
```

#### confirm(title: string, options?: BooleanPromptOptions)
Uses the [confirm](https://github.com/enquirer/enquirer#confirm-prompt) prompt. The prompt options are same as the `ask` method.

```ts
await prompt.confirm('Want to delete files?')
``` 

#### toggle(title: string, choices: [string, string], options?: TogglePromptOptions)
Use the [toggle](https://github.com/enquirer/enquirer#toggle-prompt) prompt. The prompt options are same as the `ask` method.

```ts
await prompt.toggle('Want to delete files?', ['Yep', 'Nope'])
```

#### choice(title: string, choices: (string | {})[], options?: ChoicePromptOptions)
Uses the [select](https://github.com/enquirer/enquirer#select-prompt) prompt. The prompt options are same as the `ask` method.

```ts
await prompt.choice('Select installation client', ['npm', 'yarn'])
```

Or pass the choice as an object

```ts
await prompt.choice('Select toppings', [
  {
    name: 'Jalapenos',
    hint: 'Marinated in vinegar, will taste sour',
  },
  {
    name: 'Lettuce',
    hint: 'Fresh and leafy',  
  }
])
```

#### multiple(title: string, choices: (string | {})[], options?: MultiplePromptOptions)

Uses the [multiselect](https://github.com/enquirer/enquirer#multiselect-prompt) prompt. The prompt options are same as the `ask` method.

```ts
await prompt.multiple('Select base dependencies', [
  '@adonisjs/core',
  '@adonisjs/bodyparser'
])
```

Or pass the choice as an object

```ts
await prompt.multiple('Select base dependencies', [
  {
    name: '@adonisjs/core',
    message: 'Framework core'
  },
  {
    name: '@adonisjs/bodyparser',
    message: 'Bodyparser'
  }
])
```


## Maintainers
[Harminder virk](https://github.com/thetutlage)

[circleci-image]: https://img.shields.io/circleci/project/github/poppinss/prompts/master.svg?style=for-the-badge&logo=circleci
[circleci-url]: https://circleci.com/gh/poppinss/prompts "circleci"

[npm-image]: https://img.shields.io/npm/v/@poppinss/prompts.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/@poppinss/prompts "npm"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript

[license-url]: LICENSE.md
[license-image]: https://img.shields.io/aur/license/pac.svg?style=for-the-badge
