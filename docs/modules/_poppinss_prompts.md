[@poppinss/prompts](../README.md) › [@poppinss/prompts](_poppinss_prompts.md)

# Module: @poppinss/prompts

## Index

### Interfaces

* [PromptContract](../interfaces/_poppinss_prompts.promptcontract.md)

### Type aliases

* [BooleanPromptOptions](_poppinss_prompts.md#booleanpromptoptions)
* [ChoicePromptOptions](_poppinss_prompts.md#choicepromptoptions)
* [MultiplePromptOptions](_poppinss_prompts.md#multiplepromptoptions)
* [PromptChoice](_poppinss_prompts.md#promptchoice)
* [PromptEventOptions](_poppinss_prompts.md#prompteventoptions)
* [PromptFormatFunction](_poppinss_prompts.md#promptformatfunction)
* [PromptResultFunction](_poppinss_prompts.md#promptresultfunction)
* [PromptState](_poppinss_prompts.md#promptstate)
* [PromptValidationFunction](_poppinss_prompts.md#promptvalidationfunction)
* [TextPromptOptions](_poppinss_prompts.md#textpromptoptions)
* [TogglePromptOptions](_poppinss_prompts.md#togglepromptoptions)

## Type aliases

###  BooleanPromptOptions

Ƭ **BooleanPromptOptions**: *object*

Shape of boolean prompts

#### Type declaration:

* **default**? : *undefined | false | true*

* **format**? : *[PromptFormatFunction](_poppinss_prompts.md#promptformatfunction)‹boolean›*

* **name**? : *undefined | string*

* **result**? : *[PromptResultFunction](_poppinss_prompts.md#promptresultfunction)‹boolean›*

* **validate**? : *[PromptValidationFunction](_poppinss_prompts.md#promptvalidationfunction)‹[PromptState](_poppinss_prompts.md#promptstate)‹boolean››*

___

###  ChoicePromptOptions

Ƭ **ChoicePromptOptions**: *object*

Prompt options for the choice prompt

#### Type declaration:

* **default**? : *undefined | string*

* **format**? : *[PromptFormatFunction](_poppinss_prompts.md#promptformatfunction)‹string›*

* **name**? : *undefined | string*

* **result**? : *[PromptResultFunction](_poppinss_prompts.md#promptresultfunction)‹string›*

* **validate**? : *[PromptValidationFunction](_poppinss_prompts.md#promptvalidationfunction)‹[PromptState](_poppinss_prompts.md#promptstate)‹string› & object›*

___

###  MultiplePromptOptions

Ƭ **MultiplePromptOptions**: *object*

Prompt options for the multiple prompt

#### Type declaration:

* **default**? : *string[]*

* **format**? : *[PromptFormatFunction](_poppinss_prompts.md#promptformatfunction)‹string[]›*

* **name**? : *undefined | string*

* **result**? : *[PromptResultFunction](_poppinss_prompts.md#promptresultfunction)‹string[]›*

* **validate**? : *[PromptValidationFunction](_poppinss_prompts.md#promptvalidationfunction)‹[PromptState](_poppinss_prompts.md#promptstate)‹string[]› & object›*

___

###  PromptChoice

Ƭ **PromptChoice**: *object*

Shape of the prompt choice

#### Type declaration:

* **disabled**? : *undefined | false | true*

* **hint**? : *undefined | string*

* **message**? : *undefined | string*

* **name**: *string*

___

###  PromptEventOptions

Ƭ **PromptEventOptions**: *object*

The following options are passed to the emitter `prompt`
event handler

#### Type declaration:

* **format**? : *[PromptFormatFunction](_poppinss_prompts.md#promptformatfunction)‹any›*

* **initial**? : *string | boolean | string[]*

* **message**: *string*

* **name**: *string*

* **result**? : *[PromptResultFunction](_poppinss_prompts.md#promptresultfunction)‹any›*

* **type**: *string*

* **validate**? : *[PromptValidationFunction](_poppinss_prompts.md#promptvalidationfunction)‹any›*

* **accept**(): *Promise‹void›*

* **answer**(`answer`: any): *Promise‹void›*

* **decline**(): *Promise‹void›*

* **multiSelect**(`indexes`: number[]): *Promise‹void›*

* **select**(`index`: number): *Promise‹void›*

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

###  PromptResultFunction

Ƭ **PromptResultFunction**: *function*

Shape of prompt result function. It is called before returning the result
and after validation

#### Type declaration:

▸ (`value`: T): *any | Promise‹any›*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |

___

###  PromptState

Ƭ **PromptState**: *object*

The state of prompt shared with the validate function

#### Type declaration:

* **message**: *string*

* **name**: *string*

* **type**: *string*

* **value**: *T*

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

* **default**? : *undefined | string*

* **format**? : *[PromptFormatFunction](_poppinss_prompts.md#promptformatfunction)‹string›*

* **name**? : *undefined | string*

* **result**? : *[PromptResultFunction](_poppinss_prompts.md#promptresultfunction)‹string›*

* **validate**? : *[PromptValidationFunction](_poppinss_prompts.md#promptvalidationfunction)‹[PromptState](_poppinss_prompts.md#promptstate)‹string››*

___

###  TogglePromptOptions

Ƭ **TogglePromptOptions**: *object*

Options for a toggle prompt

#### Type declaration:

* **default**? : *undefined | false | true*

* **format**? : *[PromptFormatFunction](_poppinss_prompts.md#promptformatfunction)‹boolean›*

* **name**? : *undefined | string*

* **result**? : *[PromptResultFunction](_poppinss_prompts.md#promptresultfunction)‹boolean›*

* **validate**? : *[PromptValidationFunction](_poppinss_prompts.md#promptvalidationfunction)‹[PromptState](_poppinss_prompts.md#promptstate)‹boolean››*
