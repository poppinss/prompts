[@poppinss/prompts](../README.md) › ["src/Base"](../modules/_src_base_.md) › [Prompt](_src_base_.prompt.md)

# Class: Prompt

Base class extended by [[Enquirer]] and [[Emitter]] classes to have
common interface.

## Hierarchy

* internal

  ↳ **Prompt**

  ↳ [EnquirerPrompt](_src_enquirer_.enquirerprompt.md)

  ↳ [EmitterPrompt](_src_emitter_.emitterprompt.md)

## Implements

* [PromptContract](../interfaces/_poppinss_prompts.promptcontract.md)

## Index

### Classes

* [EventEmitter](_src_base_.prompt.eventemitter.md)

### Methods

* [$prompt](_src_base_.prompt.md#protected-abstract-$prompt)
* [addListener](_src_base_.prompt.md#addlistener)
* [ask](_src_base_.prompt.md#ask)
* [choice](_src_base_.prompt.md#choice)
* [confirm](_src_base_.prompt.md#confirm)
* [emit](_src_base_.prompt.md#emit)
* [eventNames](_src_base_.prompt.md#eventnames)
* [getMaxListeners](_src_base_.prompt.md#getmaxlisteners)
* [listenerCount](_src_base_.prompt.md#listenercount)
* [listeners](_src_base_.prompt.md#listeners)
* [multiple](_src_base_.prompt.md#multiple)
* [off](_src_base_.prompt.md#off)
* [on](_src_base_.prompt.md#on)
* [once](_src_base_.prompt.md#once)
* [prependListener](_src_base_.prompt.md#prependlistener)
* [prependOnceListener](_src_base_.prompt.md#prependoncelistener)
* [rawListeners](_src_base_.prompt.md#rawlisteners)
* [removeAllListeners](_src_base_.prompt.md#removealllisteners)
* [removeListener](_src_base_.prompt.md#removelistener)
* [secure](_src_base_.prompt.md#secure)
* [setMaxListeners](_src_base_.prompt.md#setmaxlisteners)
* [toggle](_src_base_.prompt.md#toggle)
* [once](_src_base_.prompt.md#static-once)

## Methods

### `Protected` `Abstract` $prompt

▸ **$prompt**(`options`: any): *Promise‹any›*

**Parameters:**

Name | Type |
------ | ------ |
`options` | any |

**Returns:** *Promise‹any›*

___

###  addListener

▸ **addListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  ask

▸ **ask**<**Result**>(`title`: string, `options?`: [TextPromptOptions](../modules/_poppinss_prompts.md#textpromptoptions)): *Promise‹Result›*

*Implementation of [PromptContract](../interfaces/_poppinss_prompts.promptcontract.md)*

Prompts for text input

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

Prompts for text input

**Type parameters:**

▪ **Result**: *any*

**Parameters:**

Name | Type |
------ | ------ |
`title` | string |
`choices` | string &#124; object[] |
`options?` | [ChoicePromptOptions](../modules/_poppinss_prompts.md#choicepromptoptions) |

**Returns:** *Promise‹Result›*

___

###  confirm

▸ **confirm**<**Result**>(`title`: string, `options?`: [BooleanPromptOptions](../modules/_poppinss_prompts.md#booleanpromptoptions)): *Promise‹Result›*

*Implementation of [PromptContract](../interfaces/_poppinss_prompts.promptcontract.md)*

Asks for `Y/n`

**Type parameters:**

▪ **Result**: *any*

**Parameters:**

Name | Type |
------ | ------ |
`title` | string |
`options?` | [BooleanPromptOptions](../modules/_poppinss_prompts.md#booleanpromptoptions) |

**Returns:** *Promise‹Result›*

___

###  emit

▸ **emit**(`event`: string | symbol, ...`args`: any[]): *boolean*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |
`...args` | any[] |

**Returns:** *boolean*

___

###  eventNames

▸ **eventNames**(): *Array‹string | symbol›*

*Inherited from void*

**Returns:** *Array‹string | symbol›*

___

###  getMaxListeners

▸ **getMaxListeners**(): *number*

*Inherited from void*

**Returns:** *number*

___

###  listenerCount

▸ **listenerCount**(`type`: string | symbol): *number*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string &#124; symbol |

**Returns:** *number*

___

###  listeners

▸ **listeners**(`event`: string | symbol): *Function[]*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  multiple

▸ **multiple**<**Result**>(`title`: string, `choices`: string | object[], `options?`: [MultiplePromptOptions](../modules/_poppinss_prompts.md#multiplepromptoptions)): *Promise‹Result›*

Prompts for text input

**Type parameters:**

▪ **Result**: *any*

**Parameters:**

Name | Type |
------ | ------ |
`title` | string |
`choices` | string &#124; object[] |
`options?` | [MultiplePromptOptions](../modules/_poppinss_prompts.md#multiplepromptoptions) |

**Returns:** *Promise‹Result›*

___

###  off

▸ **off**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  on

▸ **on**(`event`: "prompt", `callback`: function): *this*

*Overrides void*

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

*Overrides void*

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

*Overrides void*

**Parameters:**

▪ **event**: *"prompt:answer"*

▪ **callback**: *function*

▸ (`message`: any): *any*

**Parameters:**

Name | Type |
------ | ------ |
`message` | any |

**Returns:** *this*

___

###  once

▸ **once**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  prependListener

▸ **prependListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  prependOnceListener

▸ **prependOnceListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  rawListeners

▸ **rawListeners**(`event`: string | symbol): *Function[]*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  removeAllListeners

▸ **removeAllListeners**(`event?`: string | symbol): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`event?` | string &#124; symbol |

**Returns:** *this*

___

###  removeListener

▸ **removeListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  secure

▸ **secure**<**Result**>(`title`: string, `options?`: [TextPromptOptions](../modules/_poppinss_prompts.md#textpromptoptions)): *Promise‹Result›*

*Implementation of [PromptContract](../interfaces/_poppinss_prompts.promptcontract.md)*

Prompts for text input but mangles the output (for password)

**Type parameters:**

▪ **Result**: *any*

**Parameters:**

Name | Type |
------ | ------ |
`title` | string |
`options?` | [TextPromptOptions](../modules/_poppinss_prompts.md#textpromptoptions) |

**Returns:** *Promise‹Result›*

___

###  setMaxListeners

▸ **setMaxListeners**(`n`: number): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *this*

___

###  toggle

▸ **toggle**<**Result**>(`title`: string, `choices`: [string, string], `options?`: [TogglePromptOptions](../modules/_poppinss_prompts.md#togglepromptoptions)): *Promise‹Result›*

*Implementation of [PromptContract](../interfaces/_poppinss_prompts.promptcontract.md)*

Similar to [[this.confirm]] but with custom toggle options

**Type parameters:**

▪ **Result**: *any*

**Parameters:**

Name | Type |
------ | ------ |
`title` | string |
`choices` | [string, string] |
`options?` | [TogglePromptOptions](../modules/_poppinss_prompts.md#togglepromptoptions) |

**Returns:** *Promise‹Result›*

___

### `Static` once

▸ **once**(`emitter`: NodeEventTarget, `event`: string | symbol): *Promise‹any[]›*

**Parameters:**

Name | Type |
------ | ------ |
`emitter` | NodeEventTarget |
`event` | string &#124; symbol |

**Returns:** *Promise‹any[]›*

▸ **once**(`emitter`: DOMEventTarget, `event`: string): *Promise‹any[]›*

**Parameters:**

Name | Type |
------ | ------ |
`emitter` | DOMEventTarget |
`event` | string |

**Returns:** *Promise‹any[]›*
