/*
 * @poppinss/prompts
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import useColors from '@poppinss/colors'
import { EventEmitter } from 'node:events'
import { ObjectBuilder } from '@poppinss/utils'

import {
  PromptChoice,
  PromptContract,
  EnumPromptOptions,
  TextPromptOptions,
  PromptEventOptions,
  TogglePromptOptions,
  ChoicePromptOptions,
  BooleanPromptOptions,
  MultiplePromptOptions,
  AutoCompletePromptOptions,
} from './types.js'

/**
 * Colors and icons to use.
 */
const colors = useColors.ansi()
export const icons =
  process.platform === 'win32' && !process.env.WT_SESSION ? { pointer: '>' } : { pointer: '❯' }

/**
 * Base class extended by [[Enquirer]] and [[Emitter]] classes to have
 * common interface.
 */
export abstract class Prompt extends EventEmitter implements PromptContract {
  protected abstract prompt(options: any): Promise<any>

  on(event: 'prompt', callback: (options: PromptEventOptions) => any): this
  on(event: 'prompt:error', callback: (message: string) => any): this
  on(event: 'prompt:answer', callback: (message: any) => any): this
  on(event: string, callback: (...args: any[]) => any): this {
    super.on(event, callback)
    return this
  }

  /**
   * Prompts for text input
   */
  async ask<Result extends any = string>(
    title: string,
    options?: TextPromptOptions<Result>
  ): Promise<Result> {
    options = options || {}

    const builder = new ObjectBuilder()
    builder.add('type', 'input')
    builder.add('name', options.name || 'prompt')
    builder.add('message', title)
    builder.add('hint', options.hint)
    builder.add('initial', options.default)
    builder.add('result', options.result)
    builder.add('format', options.format)
    builder.add('validate', options.validate)
    builder.add('prefix', colors.dim(icons.pointer))
    builder.add('styles', {
      danger: (value: string) => colors.red(value),
      submitted: (value: string) => colors.cyan(value),
    })

    return this.prompt(builder.toObject())
  }

  /**
   * Prompts for text input
   */
  async enum<Result extends any = string[]>(
    title: string,
    options?: EnumPromptOptions<Result>
  ): Promise<Result> {
    options = options || {}

    const builder = new ObjectBuilder()
    builder.add('type', 'list')
    builder.add('sep', options.seperator || ',')
    builder.add('name', options.name)
    builder.add('message', title)
    builder.add('hint', options.hint)
    builder.add('initial', options.default)
    builder.add('result', options.result)
    builder.add('format', options.format)
    builder.add('validate', options.validate)
    builder.add('prefix', colors.dim(icons.pointer))
    builder.add('styles', {
      danger: (value: string) => colors.red(value),
    })

    return this.prompt(builder.toObject())
  }

  /**
   * Prompts for text input but mangles the output (for password)
   */
  async secure<Result extends any = string>(
    title: string,
    options?: TextPromptOptions<Result>
  ): Promise<Result> {
    options = options || {}

    const builder = new ObjectBuilder()
    builder.add('type', 'password')
    builder.add('name', options.name)
    builder.add('message', title)
    builder.add('initial', options.default)
    builder.add('result', options.result)
    builder.add('format', options.format)
    builder.add('validate', options.validate)
    builder.add('prefix', colors.dim(icons.pointer))
    builder.add('styles', {
      danger: (value: string) => colors.red(value),
      submitted: (value: string) => colors.cyan(value),
    })

    return this.prompt(builder.toObject())
  }

  /**
   * Asks for `Y/n`
   */
  async confirm<Result extends any = boolean>(
    title: string,
    options?: BooleanPromptOptions<Result>
  ): Promise<Result> {
    options = options || {}

    const builder = new ObjectBuilder()
    builder.add('type', 'confirm')
    builder.add('name', options.name)
    builder.add('message', title)
    builder.add('hint', options.hint)
    builder.add('initial', options.default)
    builder.add('result', options.result)
    builder.add('format', options.format)
    builder.add('validate', options.validate)
    builder.add('prefix', colors.dim(icons.pointer))
    builder.add('styles', {
      danger: (value: string) => colors.red(value),
      submitted: (value: string) => colors.cyan(value),
    })

    return this.prompt(builder.toObject())
  }

  /**
   * Similar to [[this.confirm]] but with custom toggle options
   */
  async toggle<Result extends any = boolean>(
    title: string,
    choices: [string, string],
    options?: TogglePromptOptions<Result>
  ): Promise<Result> {
    options = options || {}

    const builder = new ObjectBuilder()
    builder.add('type', 'toggle')
    builder.add('name', options.name)
    builder.add('message', title)
    builder.add('hint', options.hint)
    builder.add('initial', options.default)
    builder.add('result', options.result)
    builder.add('format', options.format)
    builder.add('validate', options.validate)
    builder.add('enabled', choices[0])
    builder.add('disabled', choices[1])
    builder.add('prefix', colors.dim(icons.pointer))
    builder.add('styles', {
      danger: (value: string) => colors.red(value),
      submitted: (value: string) => colors.cyan(value),
    })

    return this.prompt(builder.toObject())
  }

  /**
   * Prompts for text input
   */
  async choice<Choice extends string, Result extends any = Choice>(
    title: string,
    choices: readonly (Choice | PromptChoice<Choice>)[],
    options?: ChoicePromptOptions<Choice, Result>
  ): Promise<Result> {
    options = options || {}

    const builder = new ObjectBuilder()
    builder.add('type', 'select')
    builder.add('name', options.name)
    builder.add('message', title)
    builder.add('initial', options.default)
    builder.add('hint', options.hint || 'Press <ENTER> to select')
    builder.add('result', options.result)
    builder.add('format', options.format)
    builder.add('validate', options.validate)
    builder.add('prefix', colors.dim(icons.pointer))
    builder.add('styles', {
      danger: (value: string) => colors.red(value),
      submitted: (value: string) => colors.cyan(value),
    })

    builder.add(
      'choices',
      choices.map((choice) => {
        if (typeof choice === 'string') {
          return { name: choice, message: choice, value: choice }
        }
        return choice
      })
    )

    return this.prompt(builder.toObject())
  }

  /**
   * Prompts for text input
   */
  async multiple<Choice extends string, Result extends any = Choice[]>(
    title: string,
    choices: readonly (Choice | PromptChoice<Choice>)[],
    options?: MultiplePromptOptions<Choice, Result>
  ): Promise<Result> {
    options = options || {}

    const builder = new ObjectBuilder()
    builder.add('type', 'multiselect')
    builder.add('name', options.name)
    builder.add('message', title)
    builder.add('initial', options.default)
    builder.add('result', options.result)
    builder.add('format', options.format)
    builder.add('hint', options.hint || 'Press <SPACE> to select')
    builder.add('validate', options.validate)
    builder.add('prefix', colors.dim(icons.pointer))
    builder.add('styles', {
      danger: (value: string) => colors.red(value),
      submitted: (value: string) => colors.cyan(value),
    })

    builder.add('indicator', (state: any, choice: any) => {
      if (choice.enabled) {
        return colors.cyan(state.symbols.radio.on)
      }
      return colors.dim(state.symbols.radio.off)
    })

    builder.add(
      'choices',
      choices.map((choice) => {
        if (typeof choice === 'string') {
          return { name: choice, message: choice, value: choice }
        }
        return choice
      })
    )

    return this.prompt(builder.toObject())
  }

  /**
   * Prompts for text input
   */
  async autocomplete<
    Choice extends string,
    Multiple extends boolean = false,
    Result extends any = Multiple extends true ? Choice[] : Choice
  >(
    title: string,
    choices: readonly Choice[],
    options?: AutoCompletePromptOptions<Choice, Multiple, Result>
  ): Promise<Result> {
    options = options || {}

    const builder = new ObjectBuilder()
    builder.add('type', 'autocomplete')
    builder.add('name', options.name)
    builder.add('message', title)
    builder.add('initial', options.default)
    builder.add('multiple', options.multiple)
    builder.add('result', options.result)
    builder.add('hint', options.hint || '(Type to filter) or (Press <ENTER> to select)')
    builder.add('format', options.format)
    builder.add('validate', options.validate)
    builder.add('choices', choices)
    builder.add('prefix', colors.dim(icons.pointer))
    builder.add('styles', {
      danger: (value: string) => colors.red(value),
      submitted: (value: string) => colors.cyan(value),
    })

    return this.prompt(builder.toObject())
  }
}
