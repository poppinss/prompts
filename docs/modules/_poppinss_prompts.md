**[@poppinss/prompts](../README.md)**

[Globals](../README.md) › [@poppinss/prompts](_poppinss_prompts.md)

# External module: @poppinss/prompts

## Index

### Classes

* [EmitterPrompt](../classes/_poppinss_prompts.emitterprompt.md)
* [EnquirerPrompt](../classes/_poppinss_prompts.enquirerprompt.md)
* [Prompt](../classes/_poppinss_prompts.prompt.md)

### Interfaces

* [PromptContract](../interfaces/_poppinss_prompts.promptcontract.md)

### Type aliases

* [BooleanPromptOptions](_poppinss_prompts.md#booleanpromptoptions)
* [ChoicePromptOptions](_poppinss_prompts.md#choicepromptoptions)
* [MultiplePromptOptions](_poppinss_prompts.md#multiplepromptoptions)
* [PromptChoice](_poppinss_prompts.md#promptchoice)
* [PromptEventOptions](_poppinss_prompts.md#prompteventoptions)
* [PromptFormatFunction](_poppinss_prompts.md#promptformatfunction)
* [PromptState](_poppinss_prompts.md#promptstate)
* [PromptValidationFunction](_poppinss_prompts.md#promptvalidationfunction)
* [TextPromptOptions](_poppinss_prompts.md#textpromptoptions)
* [TogglePromptOptions](_poppinss_prompts.md#togglepromptoptions)

## Type aliases

###  BooleanPromptOptions

Ƭ **BooleanPromptOptions**: *object*

Shape of boolean prompts

#### Type declaration:

___

###  ChoicePromptOptions

Ƭ **ChoicePromptOptions**: *object*

Prompt options for the choice prompt

#### Type declaration:

___

###  MultiplePromptOptions

Ƭ **MultiplePromptOptions**: *object*

Prompt options for the multiple prompt

#### Type declaration:

___

###  PromptChoice

Ƭ **PromptChoice**: *object*

Shape of the prompt choice

#### Type declaration:

___

###  PromptEventOptions

Ƭ **PromptEventOptions**: *object*

The following options are passed to the emitter `prompt`
event handler

#### Type declaration:

___

###  PromptFormatFunction

Ƭ **PromptFormatFunction**: *function*

Shape of prompt format function. It is called on every keystroke

#### Type declaration:

▸ (`value`: T): *T | Promise‹T›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |

___

###  PromptState

Ƭ **PromptState**: *object*

The state of prompt shared with the validate function

#### Type declaration:

___

###  PromptValidationFunction

Ƭ **PromptValidationFunction**: *function*

Shape of prompt validate function

#### Type declaration:

▸ (`value`: T["value"], `state`: T): *boolean | string | Promise‹boolean | string›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T["value"] |
`state` | T |

___

###  TextPromptOptions

Ƭ **TextPromptOptions**: *object*

Prompt options for text based prompts

#### Type declaration:

___

###  TogglePromptOptions

Ƭ **TogglePromptOptions**: *object*

Options for a toggle prompt

#### Type declaration: