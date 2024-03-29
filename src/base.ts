/*
 * @poppinss/prompts
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { AssertionError } from 'node:assert'
import { ObjectBuilder } from '@poppinss/utils'

import {
  PromptChoice,
  ListPromptOptions,
  TextPromptOptions,
  TogglePromptOptions,
  ChoicePromptOptions,
  BooleanPromptOptions,
  MultiplePromptOptions,
  AutoCompletePromptOptions,
} from './types.js'

import { colors } from './colors.js'
import { MockedPrompt } from './mocked_prompt.js'
import { promptHiglight, promptPrefix, promptStyles } from './prompt_options.js'

/**
 * Base prompt class exposes the public API for triggering prompts. The
 * implementations just need to implement a single prompt method.
 */
export abstract class BasePrompt {
  traps: {
    prompts: Map<string, { prompt: MockedPrompt; triggerError: AssertionError }>
    verify: () => void
  } = {
    prompts: new Map(),
    verify() {
      this.prompts.forEach((entry) => {
        throw entry.triggerError
      })
    },
  }

  /**
   * Handle the prompt. The mocked prompts are given preference if one exists
   */
  #handlePrompt(options: any) {
    let mockedPrompt: MockedPrompt | undefined

    if (this.traps.prompts.has(options.name)) {
      mockedPrompt = this.traps.prompts.get(options.name)!.prompt
      this.traps.prompts.delete(options.name)
    } else if (this.traps.prompts.has(options.message)) {
      mockedPrompt = this.traps.prompts.get(options.message)!.prompt
      this.traps.prompts.delete(options.message)
    }

    if (mockedPrompt) {
      return mockedPrompt.handle(options)
    }

    return this.prompt(options)
  }

  protected abstract prompt(options: any): Promise<any>

  /**
   * Prompts for text input
   */
  async ask<Result extends any = string>(
    title: string,
    options?: TextPromptOptions<Result>
  ): Promise<Result> {
    options = options || {}

    const builder = new ObjectBuilder({})
    builder.add('type', 'input')
    builder.add('name', options.name || 'prompt')
    builder.add('message', title)
    builder.add('hint', options.hint)
    builder.add('initial', options.default)
    builder.add('result', options.result)
    builder.add('format', options.format)
    builder.add('validate', options.validate)
    builder.add('prefix', promptPrefix)
    builder.add('styles', promptStyles)

    return this.#handlePrompt(builder.toObject())
  }

  /**
   * Prompt to accept a list of comma separated values
   */
  async list<Result extends any = string[]>(
    title: string,
    options?: ListPromptOptions<Result>
  ): Promise<Result> {
    options = options || {}

    const builder = new ObjectBuilder({})
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
    builder.add('prefix', promptPrefix)
    builder.add('styles', promptStyles)

    return this.#handlePrompt(builder.toObject())
  }

  /**
   * Prompts for text input but masks the output (for password)
   */
  async secure<Result extends any = string>(
    title: string,
    options?: TextPromptOptions<Result>
  ): Promise<Result> {
    options = options || {}

    const builder = new ObjectBuilder({})
    builder.add('type', 'password')
    builder.add('name', options.name || 'prompt')
    builder.add('message', title)
    builder.add('initial', options.default)
    builder.add('result', options.result)
    builder.add('format', options.format)
    builder.add('validate', options.validate)
    builder.add('prefix', promptPrefix)
    builder.add('styles', promptStyles)

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

    const builder = new ObjectBuilder({})
    builder.add('type', 'confirm')
    builder.add('name', options.name || 'prompt')
    builder.add('message', title)
    builder.add('hint', options.hint)
    builder.add('initial', options.default)
    builder.add('result', options.result)
    builder.add('format', options.format)
    builder.add('validate', options.validate)
    builder.add('prefix', promptPrefix)
    builder.add('styles', promptStyles)

    return this.#handlePrompt(builder.toObject())
  }

  /**
   * Similar to [[this.confirm]] but with custom names for the `Y/n` options
   */
  async toggle<Result extends any = boolean>(
    title: string,
    choices: [string, string],
    options?: TogglePromptOptions<Result>
  ): Promise<Result> {
    options = options || {}

    const builder = new ObjectBuilder({})
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
    builder.add('prefix', promptPrefix)
    builder.add('styles', promptStyles)

    return this.#handlePrompt(builder.toObject())
  }

  /**
   * Prompt to select a value from the list of options
   */
  async choice<Choice extends string, Result extends any = Choice>(
    title: string,
    choices: readonly (Choice | PromptChoice<Choice>)[],
    options?: ChoicePromptOptions<Choice, Result>
  ): Promise<Result> {
    options = options || {}

    const builder = new ObjectBuilder({})
    builder.add('type', 'select')
    builder.add('name', options.name || 'prompt')
    builder.add('message', title)
    builder.add('initial', options.default)
    builder.add('hint', options.hint || 'Press <ENTER> to select')
    builder.add('result', options.result)
    builder.add('format', options.format)
    builder.add('validate', options.validate)
    builder.add('prefix', promptPrefix)
    builder.add('styles', promptStyles)

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
   * Prompt to select multiple values from the list of options
   */
  async multiple<Choice extends string, Result extends any = Choice[]>(
    title: string,
    choices: readonly (Choice | PromptChoice<Choice>)[],
    options?: MultiplePromptOptions<Choice, Result>
  ): Promise<Result> {
    options = options || {}

    const builder = new ObjectBuilder({})
    builder.add('type', 'multiselect')
    builder.add('name', options.name || 'prompt')
    builder.add('message', title)
    builder.add('initial', options.default)
    builder.add('result', options.result)
    builder.add('format', options.format)
    builder.add('hint', options.hint || 'Press <SPACE> to select')
    builder.add('validate', options.validate)
    builder.add('prefix', promptPrefix)
    builder.add('styles', promptStyles)

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
   * Prompt to select one or multiple values from the list of searchable
   * options.
   */
  async autocomplete<
    Choice extends string,
    Multiple extends boolean = false,
    Result extends any = Multiple extends true ? Choice[] : Choice,
  >(
    title: string,
    choices: readonly Choice[],
    options?: AutoCompletePromptOptions<Choice, Multiple, Result>
  ): Promise<Result> {
    options = options || {}

    const builder = new ObjectBuilder({})
    builder.add('type', 'autocomplete')
    builder.add('name', options.name || 'prompt')
    builder.add('message', title)
    builder.add('initial', options.default)
    builder.add('multiple', options.multiple)
    builder.add('result', options.result)
    builder.add(
      'hint',
      options.hint || options.multiple ? 'Press <SPACE> to select' : 'Press <ENTER> to select'
    )
    builder.add('format', options.format)
    builder.add('limit', options.limit)
    builder.add('validate', options.validate)
    builder.add('footer', options.footer)
    builder.add('choices', choices)
    builder.add('prefix', promptPrefix)
    builder.add('highlight', promptHiglight)
    builder.add('styles', promptStyles)

    return this.#handlePrompt(builder.toObject())
  }

  /**
   * Trap a prompt by its message or unique name
   */
  trap(message: string) {
    /**
     * Trigger error is raised when the prompt is not triggered but
     * trapped
     */
    const triggerError = new AssertionError({
      message: `Expected prompt "${message}" to get triggered`,
    })
    const mockedPrompt = new MockedPrompt()

    this.traps.prompts.set(message, { prompt: mockedPrompt, triggerError })
    return mockedPrompt
  }
}
