**[@poppinss/prompts](../README.md)**

[Globals](../README.md) › [@poppinss/prompts](../modules/_poppinss_prompts.md) › [PromptContract](_poppinss_prompts.promptcontract.md)

# Interface: PromptContract

Shape of prompts class.

## Hierarchy

* **PromptContract**

## Implemented by

* [EmitterPrompt](../classes/_poppinss_prompts.emitterprompt.md)
* [EnquirerPrompt](../classes/_poppinss_prompts.enquirerprompt.md)
* [Prompt](../classes/_poppinss_prompts.prompt.md)

## Index

### Methods

* [ask](_poppinss_prompts.promptcontract.md#ask)
* [choice](_poppinss_prompts.promptcontract.md#choice)
* [confirm](_poppinss_prompts.promptcontract.md#confirm)
* [multiple](_poppinss_prompts.promptcontract.md#multiple)
* [on](_poppinss_prompts.promptcontract.md#on)
* [secure](_poppinss_prompts.promptcontract.md#secure)
* [toggle](_poppinss_prompts.promptcontract.md#toggle)

## Methods

###  ask

▸ **ask**(`title`: string, `options?`: [TextPromptOptions](../modules/_poppinss_prompts.md#textpromptoptions)): *Promise‹string›*

**Parameters:**

Name | Type |
------ | ------ |
`title` | string |
`options?` | [TextPromptOptions](../modules/_poppinss_prompts.md#textpromptoptions) |

**Returns:** *Promise‹string›*

___

###  choice

▸ **choice**(`title`: string, `choices`: string | object[], `options?`: [ChoicePromptOptions](../modules/_poppinss_prompts.md#choicepromptoptions)): *Promise‹string›*

**Parameters:**

Name | Type |
------ | ------ |
`title` | string |
`choices` | string \| object[] |
`options?` | [ChoicePromptOptions](../modules/_poppinss_prompts.md#choicepromptoptions) |

**Returns:** *Promise‹string›*

___

###  confirm

▸ **confirm**(`title`: string, `options?`: [BooleanPromptOptions](../modules/_poppinss_prompts.md#booleanpromptoptions)): *Promise‹boolean›*

**Parameters:**

Name | Type |
------ | ------ |
`title` | string |
`options?` | [BooleanPromptOptions](../modules/_poppinss_prompts.md#booleanpromptoptions) |

**Returns:** *Promise‹boolean›*

___

###  multiple

▸ **multiple**(`title`: string, `choices`: string | object[], `options?`: [MultiplePromptOptions](../modules/_poppinss_prompts.md#multiplepromptoptions)): *Promise‹string[]›*

**Parameters:**

Name | Type |
------ | ------ |
`title` | string |
`choices` | string \| object[] |
`options?` | [MultiplePromptOptions](../modules/_poppinss_prompts.md#multiplepromptoptions) |

**Returns:** *Promise‹string[]›*

___

###  on

▸ **on**(`event`: "prompt", `callback`: function): *this*

**Parameters:**

▪ **event**: *"prompt"*

▪ **callback**: *function*

▸ (`options`: [PromptEventOptions](../modules/_poppinss_prompts.md#prompteventoptions)): *any*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [PromptEventOptions](../modules/_poppinss_prompts.md#prompteventoptions) |

**Returns:** *this*

▸ **on**(`event`: "prompt:error", `callback`: function): *this*

**Parameters:**

▪ **event**: *"prompt:error"*

▪ **callback**: *function*

▸ (`message`: string): *any*

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |

**Returns:** *this*

▸ **on**(`event`: "prompt:answer", `callback`: function): *this*

**Parameters:**

▪ **event**: *"prompt:answer"*

▪ **callback**: *function*

▸ (`message`: any): *any*

**Parameters:**

Name | Type |
------ | ------ |
`message` | any |

**Returns:** *this*

▸ **on**(`event`: string, `callback`: function): *this*

**Parameters:**

▪ **event**: *string*

▪ **callback**: *function*

▸ (...`args`: any[]): *any*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  secure

▸ **secure**(`title`: string, `options?`: [TextPromptOptions](../modules/_poppinss_prompts.md#textpromptoptions)): *Promise‹string›*

**Parameters:**

Name | Type |
------ | ------ |
`title` | string |
`options?` | [TextPromptOptions](../modules/_poppinss_prompts.md#textpromptoptions) |

**Returns:** *Promise‹string›*

___

###  toggle

▸ **toggle**(`title`: string, `choices`: [string, string], `options?`: [TogglePromptOptions](../modules/_poppinss_prompts.md#togglepromptoptions)): *Promise‹boolean›*

**Parameters:**

Name | Type |
------ | ------ |
`title` | string |
`choices` | [string, string] |
`options?` | [TogglePromptOptions](../modules/_poppinss_prompts.md#togglepromptoptions) |

**Returns:** *Promise‹boolean›*