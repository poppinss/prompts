[@poppinss/prompts](../README.md) › ["src/Enquirer"](../modules/_src_enquirer_.md) › [EnquirerPrompt](_src_enquirer_.enquirerprompt.md)

# Class: EnquirerPrompt

Uses the `enquirer` package to prompt user for input. The `$prompt`
method is invoked by the extended `Prompt` class.

## Hierarchy

  ↳ [Prompt](_src_base_.prompt.md)

  ↳ **EnquirerPrompt**

## Implements

* [PromptContract](../interfaces/_poppinss_prompts.promptcontract.md)

## Index

### Methods

* [addListener](_src_enquirer_.enquirerprompt.md#addlistener)
* [ask](_src_enquirer_.enquirerprompt.md#ask)
* [choice](_src_enquirer_.enquirerprompt.md#choice)
* [confirm](_src_enquirer_.enquirerprompt.md#confirm)
* [emit](_src_enquirer_.enquirerprompt.md#emit)
* [eventNames](_src_enquirer_.enquirerprompt.md#eventnames)
* [getMaxListeners](_src_enquirer_.enquirerprompt.md#getmaxlisteners)
* [listenerCount](_src_enquirer_.enquirerprompt.md#listenercount)
* [listeners](_src_enquirer_.enquirerprompt.md#listeners)
* [multiple](_src_enquirer_.enquirerprompt.md#multiple)
* [off](_src_enquirer_.enquirerprompt.md#off)
* [on](_src_enquirer_.enquirerprompt.md#on)
* [once](_src_enquirer_.enquirerprompt.md#once)
* [prependListener](_src_enquirer_.enquirerprompt.md#prependlistener)
* [prependOnceListener](_src_enquirer_.enquirerprompt.md#prependoncelistener)
* [prompt](_src_enquirer_.enquirerprompt.md#protected-prompt)
* [rawListeners](_src_enquirer_.enquirerprompt.md#rawlisteners)
* [removeAllListeners](_src_enquirer_.enquirerprompt.md#removealllisteners)
* [removeListener](_src_enquirer_.enquirerprompt.md#removelistener)
* [secure](_src_enquirer_.enquirerprompt.md#secure)
* [setMaxListeners](_src_enquirer_.enquirerprompt.md#setmaxlisteners)
* [toggle](_src_enquirer_.enquirerprompt.md#toggle)

## Methods

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

*Inherited from [Prompt](_src_base_.prompt.md).[ask](_src_base_.prompt.md#ask)*

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

*Inherited from [Prompt](_src_base_.prompt.md).[choice](_src_base_.prompt.md#choice)*

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

*Inherited from [Prompt](_src_base_.prompt.md).[confirm](_src_base_.prompt.md#confirm)*

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

*Inherited from [Prompt](_src_base_.prompt.md).[multiple](_src_base_.prompt.md#multiple)*

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

*Inherited from [Prompt](_src_base_.prompt.md).[on](_src_base_.prompt.md#on)*

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

*Inherited from [Prompt](_src_base_.prompt.md).[on](_src_base_.prompt.md#on)*

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

*Inherited from [Prompt](_src_base_.prompt.md).[on](_src_base_.prompt.md#on)*

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

### `Protected` prompt

▸ **prompt**(`options`: any): *Promise‹any›*

*Overrides [Prompt](_src_base_.prompt.md).[prompt](_src_base_.prompt.md#protected-abstract-prompt)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | any |

**Returns:** *Promise‹any›*

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

*Inherited from [Prompt](_src_base_.prompt.md).[secure](_src_base_.prompt.md#secure)*

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

*Inherited from [Prompt](_src_base_.prompt.md).[toggle](_src_base_.prompt.md#toggle)*

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
