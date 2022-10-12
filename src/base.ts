/*
 * @poppinss/prompts
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ObjectBuilder } from '@poppinss/utils'

import {
  PromptChoice,
  EnumPromptOptions,
  TextPromptOptions,
  TogglePromptOptions,
  ChoicePromptOptions,
  BooleanPromptOptions,
  MultiplePromptOptions,
  AutoCompletePromptOptions,
} from './types.js'

import { icons } from './icons.js'
import { colors } from './colors.js'
import { MockedPrompt } from './mocked_prompt.js'

/**
 * Base prompt class exposes the public API for triggering prompts. The
 * implementations just need to implement a single prompt method.
 */
export abstract class Prompt {
  #mockedPrompts: Map<string, MockedPrompt> = new Map()

  /**
   * Handle the prompt. The mocked prompts are given preference if one exists
   */
  #handlePrompt(options: any) {
    let mockedPrompt: MockedPrompt | undefined

    if (this.#mockedPrompts.has(options.name)) {
      mockedPrompt = this.#mockedPrompts.get(options.name)!
      this.#mockedPrompts.delete(options.name)
    } else if (this.#mockedPrompts.has(options.message)) {
      mockedPrompt = this.#mockedPrompts.get(options.message)!
      this.#mockedPrompts.delete(options.message)
    }

    if (mockedPrompt) {
      return mockedPrompt.handle(options)
    }

    return this.prompt(options)
  }

  protected abstract prompt(options: any): Promise<any>

  /**
   * A list of pending mocked prompts. These prompts were never
   * triggered, however the trap was registered for them
   */
  get traps(): string[] {
    return Array.from(this.#mockedPrompts.keys())
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

    return this.#handlePrompt(builder.toObject())
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
    builder.add('name', options.name || 'prompt')
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

    return this.#handlePrompt(builder.toObject())
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
    builder.add('name', options.name || 'prompt')
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

    return this.#handlePrompt(builder.toObject())
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

    return this.#handlePrompt(builder.toObject())
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
    builder.add('name', options.name || 'prompt')
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

    return this.#handlePrompt(builder.toObject())
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
    builder.add('name', options.name || 'prompt')
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

    return this.#handlePrompt(builder.toObject())
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
    builder.add('name', options.name || 'prompt')
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

    return this.#handlePrompt(builder.toObject())
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
    builder.add('name', options.name || 'prompt')
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

    return this.#handlePrompt(builder.toObject())
  }

  /**
   * Trap a prompt by its message or unique name
   */
  trap(message: string) {
    const mockedPrompt = new MockedPrompt()
    this.#mockedPrompts.set(message, mockedPrompt)

    return mockedPrompt
  }
}
