**[@poppinss/prompts](../README.md)**

[Globals](../README.md) › [@poppinss/prompts](../modules/_poppinss_prompts.md) › [EmitterPrompt](_poppinss_prompts.emitterprompt.md)

# Class: EmitterPrompt

Use event emitter to emit different prompt events, which can be
used to answer the prompts programmatically.

## Hierarchy

  * [Prompt](_poppinss_prompts.prompt.md)

  * **EmitterPrompt**

## Implements

* [PromptContract](../interfaces/_poppinss_prompts.promptcontract.md)

## Index

### Methods

* [$prompt](_poppinss_prompts.emitterprompt.md#protected-$prompt)
* [addListener](_poppinss_prompts.emitterprompt.md#addlistener)
* [ask](_poppinss_prompts.emitterprompt.md#ask)
* [choice](_poppinss_prompts.emitterprompt.md#choice)
* [confirm](_poppinss_prompts.emitterprompt.md#confirm)
* [emit](_poppinss_prompts.emitterprompt.md#emit)
* [eventNames](_poppinss_prompts.emitterprompt.md#eventnames)
* [getMaxListeners](_poppinss_prompts.emitterprompt.md#getmaxlisteners)
* [listenerCount](_poppinss_prompts.emitterprompt.md#listenercount)
* [listeners](_poppinss_prompts.emitterprompt.md#listeners)
* [multiple](_poppinss_prompts.emitterprompt.md#multiple)
* [off](_poppinss_prompts.emitterprompt.md#off)
* [on](_poppinss_prompts.emitterprompt.md#on)
* [once](_poppinss_prompts.emitterprompt.md#once)
* [prependListener](_poppinss_prompts.emitterprompt.md#prependlistener)
* [prependOnceListener](_poppinss_prompts.emitterprompt.md#prependoncelistener)
* [rawListeners](_poppinss_prompts.emitterprompt.md#rawlisteners)
* [removeAllListeners](_poppinss_prompts.emitterprompt.md#removealllisteners)
* [removeListener](_poppinss_prompts.emitterprompt.md#removelistener)
* [secure](_poppinss_prompts.emitterprompt.md#secure)
* [setMaxListeners](_poppinss_prompts.emitterprompt.md#setmaxlisteners)
* [toggle](_poppinss_prompts.emitterprompt.md#toggle)

## Methods

### `Protected` $prompt

▸ **$prompt**(`options`: any): *Promise‹any›*

*Overrides [Prompt](_poppinss_prompts.prompt.md).[$prompt](_poppinss_prompts.prompt.md#protected-abstract-$prompt)*

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

▸ **ask**(`title`: string, `options?`: [TextPromptOptions](../modules/_poppinss_prompts.md#textpromptoptions)): *Promise‹string›*

*Implementation of [PromptContract](../interfaces/_poppinss_prompts.promptcontract.md)*

*Inherited from [Prompt](_poppinss_prompts.prompt.md).[ask](_poppinss_prompts.prompt.md#ask)*

Prompts for text input

**Parameters:**

Name | Type |
------ | ------ |
`title` | string |
`options?` | [TextPromptOptions](../modules/_poppinss_prompts.md#textpromptoptions) |

**Returns:** *Promise‹string›*

___

###  choice

▸ **choice**(`title`: string, `choices`: string | object[], `options?`: [ChoicePromptOptions](../modules/_poppinss_prompts.md#choicepromptoptions)): *Promise‹string›*

*Inherited from [Prompt](_poppinss_prompts.prompt.md).[choice](_poppinss_prompts.prompt.md#choice)*

Prompts for text input

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

*Implementation of [PromptContract](../interfaces/_poppinss_prompts.promptcontract.md)*

*Inherited from [Prompt](_poppinss_prompts.prompt.md).[confirm](_poppinss_prompts.prompt.md#confirm)*

Asks for `Y/n`

**Parameters:**

Name | Type |
------ | ------ |
`title` | string |
`options?` | [BooleanPromptOptions](../modules/_poppinss_prompts.md#booleanpromptoptions) |

**Returns:** *Promise‹boolean›*

___

###  emit

▸ **emit**(`event`: string | symbol, ...`args`: any[]): *boolean*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`event` | string \| symbol |
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
`type` | string \| symbol |

**Returns:** *number*

___

###  listeners

▸ **listeners**(`event`: string | symbol): *Function[]*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`event` | string \| symbol |

**Returns:** *Function[]*

___

###  multiple

▸ **multiple**(`title`: string, `choices`: string | object[], `options?`: [MultiplePromptOptions](../modules/_poppinss_prompts.md#multiplepromptoptions)): *Promise‹string[]›*

*Inherited from [Prompt](_poppinss_prompts.prompt.md).[multiple](_poppinss_prompts.prompt.md#multiple)*

Prompts for text input

**Parameters:**

Name | Type |
------ | ------ |
`title` | string |
`choices` | string \| object[] |
`options?` | [MultiplePromptOptions](../modules/_poppinss_prompts.md#multiplepromptoptions) |

**Returns:** *Promise‹string[]›*

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

*Inherited from [Prompt](_poppinss_prompts.prompt.md).[on](_poppinss_prompts.prompt.md#on)*

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

*Inherited from [Prompt](_poppinss_prompts.prompt.md).[on](_poppinss_prompts.prompt.md#on)*

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

*Inherited from [Prompt](_poppinss_prompts.prompt.md).[on](_poppinss_prompts.prompt.md#on)*

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
`event` | string \| symbol |

**Returns:** *Function[]*

___

###  removeAllListeners

▸ **removeAllListeners**(`event?`: string | symbol): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`event?` | string \| symbol |

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

▸ **secure**(`title`: string, `options?`: [TextPromptOptions](../modules/_poppinss_prompts.md#textpromptoptions)): *Promise‹string›*

*Implementation of [PromptContract](../interfaces/_poppinss_prompts.promptcontract.md)*

*Inherited from [Prompt](_poppinss_prompts.prompt.md).[secure](_poppinss_prompts.prompt.md#secure)*

Prompts for text input but mangles the output (for password)

**Parameters:**

Name | Type |
------ | ------ |
`title` | string |
`options?` | [TextPromptOptions](../modules/_poppinss_prompts.md#textpromptoptions) |

**Returns:** *Promise‹string›*

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

▸ **toggle**(`title`: string, `choices`: [string, string], `options?`: [TogglePromptOptions](../modules/_poppinss_prompts.md#togglepromptoptions)): *Promise‹boolean›*

*Implementation of [PromptContract](../interfaces/_poppinss_prompts.promptcontract.md)*

*Inherited from [Prompt](_poppinss_prompts.prompt.md).[toggle](_poppinss_prompts.prompt.md#toggle)*

Similar to [[this.confirm]] but with custom toggle options

**Parameters:**

Name | Type |
------ | ------ |
`title` | string |
`choices` | [string, string] |
`options?` | [TogglePromptOptions](../modules/_poppinss_prompts.md#togglepromptoptions) |

**Returns:** *Promise‹boolean›*