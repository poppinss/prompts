**[@poppinss/prompts](../README.md)**

[Globals](../README.md) › [@poppinss/prompts](../modules/_poppinss_prompts.md) › [Prompt](_poppinss_prompts.prompt.md) › [EventEmitter](_poppinss_prompts.prompt.eventemitter.md)

# Class: EventEmitter

## Hierarchy

* **EventEmitter**

## Index

### Properties

* [defaultMaxListeners](_poppinss_prompts.prompt.eventemitter.md#static-defaultmaxlisteners)

### Methods

* [addListener](_poppinss_prompts.prompt.eventemitter.md#addlistener)
* [emit](_poppinss_prompts.prompt.eventemitter.md#emit)
* [eventNames](_poppinss_prompts.prompt.eventemitter.md#eventnames)
* [getMaxListeners](_poppinss_prompts.prompt.eventemitter.md#getmaxlisteners)
* [listenerCount](_poppinss_prompts.prompt.eventemitter.md#listenercount)
* [listeners](_poppinss_prompts.prompt.eventemitter.md#listeners)
* [off](_poppinss_prompts.prompt.eventemitter.md#off)
* [on](_poppinss_prompts.prompt.eventemitter.md#on)
* [once](_poppinss_prompts.prompt.eventemitter.md#once)
* [prependListener](_poppinss_prompts.prompt.eventemitter.md#prependlistener)
* [prependOnceListener](_poppinss_prompts.prompt.eventemitter.md#prependoncelistener)
* [rawListeners](_poppinss_prompts.prompt.eventemitter.md#rawlisteners)
* [removeAllListeners](_poppinss_prompts.prompt.eventemitter.md#removealllisteners)
* [removeListener](_poppinss_prompts.prompt.eventemitter.md#removelistener)
* [setMaxListeners](_poppinss_prompts.prompt.eventemitter.md#setmaxlisteners)
* [listenerCount](_poppinss_prompts.prompt.eventemitter.md#static-listenercount)

## Properties

### `Static` defaultMaxListeners

▪ **defaultMaxListeners**: *number*

## Methods

###  addListener

▸ **addListener**(`event`: string | symbol, `listener`: function): *this*

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

###  emit

▸ **emit**(`event`: string | symbol, ...`args`: any[]): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`event` | string \| symbol |
`...args` | any[] |

**Returns:** *boolean*

___

###  eventNames

▸ **eventNames**(): *Array‹string | symbol›*

**Returns:** *Array‹string | symbol›*

___

###  getMaxListeners

▸ **getMaxListeners**(): *number*

**Returns:** *number*

___

###  listenerCount

▸ **listenerCount**(`type`: string | symbol): *number*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string \| symbol |

**Returns:** *number*

___

###  listeners

▸ **listeners**(`event`: string | symbol): *Function[]*

**Parameters:**

Name | Type |
------ | ------ |
`event` | string \| symbol |

**Returns:** *Function[]*

___

###  off

▸ **off**(`event`: string | symbol, `listener`: function): *this*

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

▸ **on**(`event`: string | symbol, `listener`: function): *this*

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

###  once

▸ **once**(`event`: string | symbol, `listener`: function): *this*

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

**Parameters:**

Name | Type |
------ | ------ |
`event` | string \| symbol |

**Returns:** *Function[]*

___

###  removeAllListeners

▸ **removeAllListeners**(`event?`: string | symbol): *this*

**Parameters:**

Name | Type |
------ | ------ |
`event?` | string \| symbol |

**Returns:** *this*

___

###  removeListener

▸ **removeListener**(`event`: string | symbol, `listener`: function): *this*

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

###  setMaxListeners

▸ **setMaxListeners**(`n`: number): *this*

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *this*

___

### `Static` listenerCount

▸ **listenerCount**(`emitter`: EventEmitter, `event`: string | symbol): *number*

**`deprecated`** since v4.0.0

**Parameters:**

Name | Type |
------ | ------ |
`emitter` | EventEmitter |
`event` | string \| symbol |

**Returns:** *number*