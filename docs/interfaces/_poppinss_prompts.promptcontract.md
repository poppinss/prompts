**[@poppinss/prompts](../README.md)**

[Globals](../README.md) › [@poppinss/prompts](../modules/_poppinss_prompts.md) › [PromptContract](_poppinss_prompts.promptcontract.md)

# Interface: PromptContract

Shape of prompts class.

## Hierarchy

* **PromptContract**

## Implemented by

* [EmitterPrompt](../classes/_src_emitter_.emitterprompt.md)
* [EnquirerPrompt](../classes/_src_enquirer_.enquirerprompt.md)
* [Prompt](../classes/_src_base_.prompt.md)

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

▸ **ask**<**Result**>(`title`: string, `options?`: [TextPromptOptions](../modules/_poppinss_prompts.md#textpromptoptions)): *Promise‹Result›*

**Type parameters:**

▪ **Result**: *any*

**Parameters:**

Name | Type |
------ | ------ |
`title` | string |
`options?` | [TextPromptOptions](../modules/_poppinss_prompts.md#textpromptoptions) |

**Returns:** *Promise‹Result›*

___

###  choice

▸ **choice**<**Result**>(`title`: string, `choices`: string | object[], `options?`: [ChoicePromptOptions](../modules/_poppinss_prompts.md#choicepromptoptions)): *Promise‹Result›*

**Type parameters:**

▪ **Result**: *any*

**Parameters:**

Name | Type |
------ | ------ |
`title` | string |
`choices` | string \| object[] |
`options?` | [ChoicePromptOptions](../modules/_poppinss_prompts.md#choicepromptoptions) |

**Returns:** *Promise‹Result›*

___

###  confirm

▸ **confirm**<**Result**>(`title`: string, `options?`: [BooleanPromptOptions](../modules/_poppinss_prompts.md#booleanpromptoptions)): *Promise‹Result›*

**Type parameters:**

▪ **Result**: *any*

**Parameters:**

Name | Type |
------ | ------ |
`title` | string |
`options?` | [BooleanPromptOptions](../modules/_poppinss_prompts.md#booleanpromptoptions) |

**Returns:** *Promise‹Result›*

___

###  multiple

▸ **multiple**<**Result**>(`title`: string, `choices`: string | object[], `options?`: [MultiplePromptOptions](../modules/_poppinss_prompts.md#multiplepromptoptions)): *Promise‹Result›*

**Type parameters:**

▪ **Result**: *any*

**Parameters:**

Name | Type |
------ | ------ |
`title` | string |
`choices` | string \| object[] |
`options?` | [MultiplePromptOptions](../modules/_poppinss_prompts.md#multiplepromptoptions) |

**Returns:** *Promise‹Result›*

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

▸ **secure**<**Result**>(`title`: string, `options?`: [TextPromptOptions](../modules/_poppinss_prompts.md#textpromptoptions)): *Promise‹Result›*

**Type parameters:**

▪ **Result**: *any*

**Parameters:**

Name | Type |
------ | ------ |
`title` | string |
`options?` | [TextPromptOptions](../modules/_poppinss_prompts.md#textpromptoptions) |

**Returns:** *Promise‹Result›*

___

###  toggle

▸ **toggle**<**Result**>(`title`: string, `choices`: [string, string], `options?`: [TogglePromptOptions](../modules/_poppinss_prompts.md#togglepromptoptions)): *Promise‹Result›*

**Type parameters:**

▪ **Result**: *any*

**Parameters:**

Name | Type |
------ | ------ |
`title` | string |
`choices` | [string, string] |
`options?` | [TogglePromptOptions](../modules/_poppinss_prompts.md#togglepromptoptions) |

**Returns:** *Promise‹Result›*