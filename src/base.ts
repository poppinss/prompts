/*
 * @poppinss/prompts
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { AssertionError } from 'node:assert'

import {
  type PromptChoice,
  type ListPromptOptions,
  type TextPromptOptions,
  type SecurePromptOptions,
  type PathPromptOptions,
  type TogglePromptOptions,
  type ChoicePromptOptions,
  type BooleanPromptOptions,
  type MultiplePromptOptions,
  type SelectKeyPromptOptions,
  type AutoCompletePromptOptions,
  type GroupMultiSelectPromptOptions,
} from './types.js'

import { MockedPrompt } from './mocked_prompt.js'
import type { InternalPromptOptions, InternalChoice } from './internal_types.js'

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
  #handlePrompt(options: InternalPromptOptions) {
    let mockedPrompt: MockedPrompt | undefined

    if (this.traps.prompts.has(options.name)) {
      mockedPrompt = this.traps.prompts.get(options.name)!.prompt
      this.traps.prompts.delete(options.name)
    } else if (this.traps.prompts.has(options.message)) {
      mockedPrompt = this.traps.prompts.get(options.message)!.prompt
      this.traps.prompts.delete(options.message)
    }

    if (mockedPrompt) return mockedPrompt.handle(options)

    return this.prompt(options)
  }

  /**
   * Map public choices to internal format
   */
  #mapChoices<Choice extends string>(
    choices: readonly (Choice | PromptChoice<Choice>)[]
  ): InternalChoice[] {
    return choices.map((choice) => {
      if (typeof choice === 'string') return { name: choice, message: choice, value: choice }
      return choice
    })
  }

  protected abstract prompt(options: InternalPromptOptions): Promise<any>

  /**
   * Prompts for text input
   */
  async ask<Result extends any = string>(
    title: string,
    options?: TextPromptOptions<Result>
  ): Promise<Result> {
    return this.#handlePrompt({
      type: 'input',
      name: options?.name || 'prompt',
      message: title,
      hint: options?.hint,
      initial: options?.default,
      result: options?.result,
      format: options?.format,
      validate: options?.validate,
      signal: options?.signal,
    })
  }

  /**
   * Prompt to accept a list of comma separated values
   */
  async list<Result extends any = string[]>(
    title: string,
    options?: ListPromptOptions<Result>
  ): Promise<Result> {
    return this.#handlePrompt({
      type: 'list',
      name: options?.name || 'prompt',
      message: title,
      sep: options?.seperator || ',',
      hint: options?.hint,
      initial: options?.default,
      result: options?.result,
      format: options?.format,
      validate: options?.validate,
      signal: options?.signal,
    })
  }

  /**
   * Prompts for text input but masks the output (for password)
   */
  async secure<Result extends any = string>(
    title: string,
    options?: SecurePromptOptions<Result>
  ): Promise<Result> {
    return this.#handlePrompt({
      type: 'password',
      name: options?.name || 'prompt',
      message: title,
      initial: options?.default,
      mask: options?.mask,
      result: options?.result,
      format: options?.format,
      validate: options?.validate,
      signal: options?.signal,
    })
  }

  /**
   * Asks for `Y/n`
   */
  async confirm<Result extends any = boolean>(
    title: string,
    options?: BooleanPromptOptions<Result>
  ): Promise<Result> {
    return this.#handlePrompt({
      type: 'confirm',
      name: options?.name || 'prompt',
      message: title,
      hint: options?.hint,
      initial: options?.default,
      result: options?.result,
      format: options?.format,
      validate: options?.validate,
      signal: options?.signal,
    })
  }

  /**
   * Similar to [[this.confirm]] but with custom names for the `Y/n` options
   */
  async toggle<Result extends any = boolean>(
    title: string,
    choices: [string, string],
    options?: TogglePromptOptions<Result>
  ): Promise<Result> {
    return this.#handlePrompt({
      type: 'toggle',
      name: options?.name || 'prompt',
      message: title,
      hint: options?.hint,
      initial: options?.default,
      result: options?.result,
      format: options?.format,
      validate: options?.validate,
      signal: options?.signal,
      enabled: choices[0],
      disabled: choices[1],
    })
  }

  /**
   * Prompt to select a value from the list of options
   */
  async choice<Choice extends string, Result extends any = Choice>(
    title: string,
    choices: readonly (Choice | PromptChoice<Choice>)[],
    options?: ChoicePromptOptions<Choice, Result>
  ): Promise<Result> {
    return this.#handlePrompt({
      type: 'select',
      name: options?.name || 'prompt',
      message: title,
      initial: options?.default,
      hint: options?.hint || 'Press <ENTER> to select',
      result: options?.result,
      format: options?.format,
      validate: options?.validate,
      signal: options?.signal,
      maxItems: options?.maxItems,
      choices: this.#mapChoices(choices),
    })
  }

  /**
   * Prompt to select multiple values from the list of options
   */
  async multiple<Choice extends string, Result extends any = Choice[]>(
    title: string,
    choices: readonly (Choice | PromptChoice<Choice>)[],
    options?: MultiplePromptOptions<Choice, Result>
  ): Promise<Result> {
    return this.#handlePrompt({
      type: 'multiselect',
      name: options?.name || 'prompt',
      message: title,
      initial: options?.default,
      result: options?.result,
      format: options?.format,
      hint: options?.hint || 'Press <SPACE> to select',
      validate: options?.validate,
      signal: options?.signal,
      maxItems: options?.maxItems,
      choices: this.#mapChoices(choices),
    })
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
    return this.#handlePrompt({
      type: 'autocomplete',
      name: options?.name || 'prompt',
      message: title,
      initial: options?.default,
      multiple: options?.multiple,
      result: options?.result,
      hint:
        options?.hint ||
        (options?.multiple ? 'Press <SPACE> to select' : 'Press <ENTER> to select'),
      format: options?.format,
      limit: options?.limit,
      validate: options?.validate,
      signal: options?.signal,
      footer: options?.footer,
      choices: [...choices],
    })
  }

  /**
   * Prompt to select a value by pressing a key bound to an option
   */
  async selectKey<Choice extends string, Result extends any = Choice>(
    title: string,
    choices: readonly PromptChoice<Choice>[],
    options?: SelectKeyPromptOptions<Choice, Result>
  ): Promise<Result> {
    return this.#handlePrompt({
      type: 'select-key',
      name: options?.name || 'prompt',
      message: title,
      result: options?.result,
      signal: options?.signal,
      choices: this.#mapChoices(choices),
    })
  }

  /**
   * Prompt to select multiple values organized by groups
   */
  async groupMultiselect<Choice extends string, Result extends any = Choice[]>(
    title: string,
    groups: Record<string, readonly (Choice | PromptChoice<Choice>)[]>,
    options?: GroupMultiSelectPromptOptions<Choice, Result>
  ): Promise<Result> {
    const mappedGroups: Record<string, InternalChoice[]> = {}
    for (const [group, items] of Object.entries(groups)) {
      mappedGroups[group] = this.#mapChoices(items)
    }

    return this.#handlePrompt({
      type: 'group-multiselect',
      name: options?.name || 'prompt',
      message: title,
      hint: options?.hint || 'Press <SPACE> to select',
      initial: options?.default,
      result: options?.result,
      validate: options?.validate,
      signal: options?.signal,
      selectableGroups: options?.selectableGroups,
      groups: mappedGroups,
    })
  }

  /**
   * Prompt for a file or directory path with filesystem autocomplete
   */
  async path<Result extends any = string>(
    title: string,
    options?: PathPromptOptions<Result>
  ): Promise<Result> {
    return this.#handlePrompt({
      type: 'path',
      name: options?.name || 'prompt',
      message: title,
      initial: options?.default,
      root: options?.root,
      onlyDirectories: options?.onlyDirectories,
      result: options?.result,
      validate: options?.validate,
      signal: options?.signal,
    })
  }

  /**
   * Chain prompts sequentially, passing accumulated results between them
   */
  async group<T extends Record<string, any>>(prompts: {
    [K in keyof T]: (opts: { results: Partial<T> }) => Promise<T[K]>
  }): Promise<T> {
    const results = {} as T
    for (const [key, promptFn] of Object.entries(prompts)) {
      const value = await (promptFn as any)({ results })
      ;(results as any)[key] = value
    }

    return results
  }

  /**
   * Trap a prompt by its message or unique name
   */
  trap(message: string) {
    const triggerError = new AssertionError({
      message: `Expected prompt "${message}" to get triggered`,
    })
    const mockedPrompt = new MockedPrompt()

    this.traps.prompts.set(message, { prompt: mockedPrompt, triggerError })
    return mockedPrompt
  }
}
