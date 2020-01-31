[@poppinss/prompts](../README.md) › ["src/Base"](../modules/_src_base_.md) › [Prompt](_src_base_.prompt.md)

# Class: Prompt

Base class extended by [[Enquirer]] and [[Emitter]] classes to have
common interface.

## Hierarchy

* EventEmitter

  ↳ **Prompt**

  ↳ [EnquirerPrompt](_src_enquirer_.enquirerprompt.md)

  ↳ [EmitterPrompt](_src_emitter_.emitterprompt.md)

## Implements

* [PromptContract](../interfaces/_poppinss_prompts.promptcontract.md)

## Index

### Constructors

* [constructor](_src_base_.prompt.md#constructor)

### Properties

* [defaultMaxListeners](_src_base_.prompt.md#static-defaultmaxlisteners)

### Methods

* [$prompt](_src_base_.prompt.md#protected-abstract-prompt)
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
* [listenerCount](_src_base_.prompt.md#static-listenercount)

## Constructors

###  constructor

\+ **new Prompt**(`options?`: EventEmitterOptions): *[Prompt](_src_base_.prompt.md)*

*Inherited from [Prompt](_src_base_.prompt.md).[constructor](_src_base_.prompt.md#constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`options?` | EventEmitterOptions |

**Returns:** *[Prompt](_src_base_.prompt.md)*

## Properties

### `Static` defaultMaxListeners

▪ **defaultMaxListeners**: *number*

*Inherited from [Prompt](_src_base_.prompt.md).[defaultMaxListeners](_src_base_.prompt.md#static-defaultmaxlisteners)*

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

*Inherited from [Prompt](_src_base_.prompt.md).[addListener](_src_base_.prompt.md#addlistener)*

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

*Inherited from [Prompt](_src_base_.prompt.md).[emit](_src_base_.prompt.md#emit)*

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |
`...args` | any[] |

**Returns:** *boolean*

___

###  eventNames

▸ **eventNames**(): *Array‹string | symbol›*

*Inherited from [Prompt](_src_base_.prompt.md).[eventNames](_src_base_.prompt.md#eventnames)*

**Returns:** *Array‹string | symbol›*

___

###  getMaxListeners

▸ **getMaxListeners**(): *number*

*Inherited from [Prompt](_src_base_.prompt.md).[getMaxListeners](_src_base_.prompt.md#getmaxlisteners)*

**Returns:** *number*

___

###  listenerCount

▸ **listenerCount**(`type`: string | symbol): *number*

*Inherited from [Prompt](_src_base_.prompt.md).[listenerCount](_src_base_.prompt.md#listenercount)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string &#124; symbol |

**Returns:** *number*

___

###  listeners

▸ **listeners**(`event`: string | symbol): *Function[]*

*Inherited from [Prompt](_src_base_.prompt.md).[listeners](_src_base_.prompt.md#listeners)*

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

*Inherited from [Prompt](_src_base_.prompt.md).[off](_src_base_.prompt.md#off)*

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

*Inherited from [Prompt](_src_base_.prompt.md).[once](_src_base_.prompt.md#once)*

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

*Inherited from [Prompt](_src_base_.prompt.md).[prependListener](_src_base_.prompt.md#prependlistener)*

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

*Inherited from [Prompt](_src_base_.prompt.md).[prependOnceListener](_src_base_.prompt.md#prependoncelistener)*

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

*Inherited from [Prompt](_src_base_.prompt.md).[rawListeners](_src_base_.prompt.md#rawlisteners)*

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  removeAllListeners

▸ **removeAllListeners**(`event?`: string | symbol): *this*

*Inherited from [Prompt](_src_base_.prompt.md).[removeAllListeners](_src_base_.prompt.md#removealllisteners)*

**Parameters:**

Name | Type |
------ | ------ |
`event?` | string &#124; symbol |

**Returns:** *this*

___

###  removeListener

▸ **removeListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [Prompt](_src_base_.prompt.md).[removeListener](_src_base_.prompt.md#removelistener)*

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

*Inherited from [Prompt](_src_base_.prompt.md).[setMaxListeners](_src_base_.prompt.md#setmaxlisteners)*

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

### `Static` listenerCount

▸ **listenerCount**(`emitter`: EventEmitter, `event`: string | symbol): *number*

*Inherited from [Prompt](_src_base_.prompt.md).[listenerCount](_src_base_.prompt.md#static-listenercount)*

**`deprecated`** since v4.0.0

**Parameters:**

Name | Type |
------ | ------ |
`emitter` | EventEmitter |
`event` | string &#124; symbol |

**Returns:** *number*
