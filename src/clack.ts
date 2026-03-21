/*
 * @poppinss/prompts
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import * as clack from '@clack/prompts'
import { BasePrompt } from './base.js'
import { E_PROMPT_CANCELLED } from './errors.js'
import type { InternalPromptOptions, InternalChoice } from './internal_types.js'

/**
 * Uses the `@clack/prompts` package to prompt user for input. The `prompt`
 * method is invoked by the extended `BasePrompt` class.
 */
export class Prompt extends BasePrompt {
  /**
   * Check if the user cancelled the prompt and throw
   */
  #assertNotCancelled(value: unknown): asserts value is Exclude<typeof value, symbol> {
    if (clack.isCancel(value)) throw new E_PROMPT_CANCELLED()
  }

  /**
   * Run validation on a prompt result. Supports both sync and async
   * validators. Returns the error message string if validation fails,
   * or `undefined` if it passes.
   */
  async #validate(value: unknown, options: InternalPromptOptions): Promise<string | undefined> {
    if (!options.validate) return undefined

    const result = await options.validate(value, {
      type: options.type,
      name: options.name,
      message: options.message,
      value,
    })

    if (result === true) return undefined
    if (typeof result === 'string') return result

    return 'Validation failed'
  }

  /**
   * Prompt the user in a loop until validation passes or the
   * user cancels. This allows us to support async validators
   * that clack does not natively support.
   */
  async #promptWithValidation(
    options: InternalPromptOptions,
    promptFn: () => Promise<unknown>
  ): Promise<unknown> {
    while (true) {
      const result = await promptFn()
      this.#assertNotCancelled(result)

      const error = await this.#validate(result, options)
      if (!error) return result

      clack.log.warning(error)
    }
  }

  /**
   * Map internal choices to clack option format
   */
  #mapChoices(choices: (string | InternalChoice)[]) {
    return choices.map((choice) => {
      if (typeof choice === 'string') return { value: choice, label: choice }

      return {
        value: choice.name,
        label: choice.message || choice.name,
        hint: choice.hint,
        disabled: choice.disabled,
      }
    })
  }

  /**
   * Resolve an initial value that can be either a numeric index
   * or a string value
   */
  #resolveInitialValue(initial: string | number | undefined, clackOptions: { value: string }[]) {
    if (initial === undefined) return undefined
    if (typeof initial === 'number') return clackOptions[initial]?.value

    return initial
  }

  /**
   * Resolve initial values for multi-select (array of indexes or strings)
   */
  #resolveInitialValues(
    initial: (string | number)[] | undefined,
    clackOptions: { value: string }[]
  ) {
    if (!Array.isArray(initial)) return undefined

    return initial
      .map((i) => (typeof i === 'number' ? clackOptions[i]?.value : i))
      .filter(Boolean) as string[]
  }

  #createTextPrompt(options: Extract<InternalPromptOptions, { type: 'input' | 'list' }>) {
    return () =>
      clack.text({
        message: options.message,
        placeholder: options.hint,
        defaultValue: options.initial,
        signal: options.signal,
      })
  }

  #createPasswordPrompt(options: Extract<InternalPromptOptions, { type: 'password' }>) {
    return () =>
      clack.password({
        message: options.message,
        mask: options.mask,
        signal: options.signal,
      })
  }

  #createConfirmPrompt(options: Extract<InternalPromptOptions, { type: 'confirm' }>) {
    return () =>
      clack.confirm({
        message: options.message,
        initialValue: options.initial ?? false,
        signal: options.signal,
      })
  }

  #createTogglePrompt(options: Extract<InternalPromptOptions, { type: 'toggle' }>) {
    return () =>
      clack.confirm({
        message: options.message,
        active: options.enabled,
        inactive: options.disabled,
        initialValue: options.initial ?? false,
        signal: options.signal,
      })
  }

  #createSelectPrompt(options: Extract<InternalPromptOptions, { type: 'select' }>) {
    const clackOptions = this.#mapChoices(options.choices)
    const initialValue = this.#resolveInitialValue(options.initial, clackOptions)

    return () =>
      clack.select({
        message: options.message,
        options: clackOptions,
        initialValue,
        maxItems: options.maxItems,
        signal: options.signal,
      })
  }

  #createMultiSelectPrompt(options: Extract<InternalPromptOptions, { type: 'multiselect' }>) {
    const clackOptions = this.#mapChoices(options.choices)
    const initialValues = this.#resolveInitialValues(options.initial, clackOptions)

    return () =>
      clack.multiselect({
        message: options.message,
        options: clackOptions,
        initialValues,
        required: false,
        maxItems: options.maxItems,
        signal: options.signal,
      })
  }

  #createSelectKeyPrompt(options: Extract<InternalPromptOptions, { type: 'select-key' }>) {
    const clackOptions = this.#mapChoices(options.choices)

    return () =>
      clack.selectKey({
        message: options.message,
        options: clackOptions,
        signal: options.signal,
      })
  }

  #createGroupMultiSelectPrompt(
    options: Extract<InternalPromptOptions, { type: 'group-multiselect' }>
  ) {
    const clackGroups: Record<string, { value: string; label: string; hint?: string; disabled?: boolean }[]> = {}
    for (const [group, items] of Object.entries(options.groups)) {
      clackGroups[group] = this.#mapChoices(items)
    }

    return () =>
      clack.groupMultiselect({
        message: options.message,
        options: clackGroups,
        initialValues: options.initial,
        required: false,
        selectableGroups: options.selectableGroups,
        signal: options.signal,
      })
  }

  #createPathPrompt(options: Extract<InternalPromptOptions, { type: 'path' }>) {
    return () =>
      clack.path({
        message: options.message,
        initialValue: options.initial,
        root: options.root,
        directory: options.onlyDirectories,
        signal: options.signal,
      })
  }

  #createAutocompletePrompt(options: Extract<InternalPromptOptions, { type: 'autocomplete' }>) {
    const clackOptions = this.#mapChoices(options.choices)

    if (options.multiple) {
      const initialValues = this.#resolveInitialValues(
        options.initial !== undefined ? [options.initial as any] : undefined,
        clackOptions
      )

      return () =>
        clack.autocompleteMultiselect({
          message: options.message,
          options: clackOptions,
          maxItems: options.limit,
          initialValues,
          signal: options.signal,
        })
    }

    const initialValue = this.#resolveInitialValue(
      options.initial as string | number | undefined,
      clackOptions
    )

    return () =>
      clack.autocomplete({
        message: options.message,
        options: clackOptions,
        maxItems: options.limit,
        initialValue,
        signal: options.signal,
      })
  }

  protected async prompt(options: InternalPromptOptions): Promise<any> {
    let promptFn: () => Promise<unknown>

    switch (options.type) {
      case 'input':
      case 'list':
        promptFn = this.#createTextPrompt(options)
        break
      case 'password':
        promptFn = this.#createPasswordPrompt(options)
        break
      case 'confirm':
        promptFn = this.#createConfirmPrompt(options)
        break
      case 'toggle':
        promptFn = this.#createTogglePrompt(options)
        break
      case 'select':
        promptFn = this.#createSelectPrompt(options)
        break
      case 'multiselect':
        promptFn = this.#createMultiSelectPrompt(options)
        break
      case 'autocomplete':
        promptFn = this.#createAutocompletePrompt(options)
        break
      case 'select-key':
        promptFn = this.#createSelectKeyPrompt(options)
        break
      case 'group-multiselect':
        promptFn = this.#createGroupMultiSelectPrompt(options)
        break
      case 'path':
        promptFn = this.#createPathPrompt(options)
        break
      default:
        throw new Error(`Unsupported prompt type: ${(options as any).type}`)
    }

    let result = await this.#promptWithValidation(options, promptFn)

    if (options.type === 'list') {
      result = (result as string).split(options.sep || ',')
    }

    if (typeof options.result === 'function') return options.result(result)
    return result
  }
}
