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

type ValidationContext = {
  pending?: Promise<boolean | string>
}

type ClackAutocompleteValidation = (
  value: string | string[] | undefined
) => string | Error | undefined

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
   * Wrap the user's validate function for clack's native validate option.
   * Maps our return types (true/false/string) to clack's (undefined/string).
   * Returns undefined if the validator is async since clack cannot handle that.
   */
  #wrapValidateForClack(
    options: InternalPromptOptions,
    context: ValidationContext
  ): ((value: string | undefined) => string | undefined) | undefined {
    if (!options.validate || options.validate.constructor.name === 'AsyncFunction') {
      return undefined
    }

    return (value: string | undefined) => {
      const validationValue = this.#prepareValidationValue(options, value)
      const result = options.validate!(
        validationValue,
        this.#createValidationState(options, validationValue)
      )

      /**
       * A regular function may still return a promise. Clack's native
       * validators are synchronous, so allow the prompt to submit and
       * validate the final value after it resolves.
       */
      if (typeof result === 'object' && result && 'then' in result) {
        context.pending = Promise.resolve(result)
        return undefined
      }

      if (result === true) {
        return undefined
      }

      return typeof result === 'string' ? result : 'Validation failed'
    }
  }

  /**
   * Prepare a value before passing it to a public validator.
   */
  #prepareValidationValue(options: InternalPromptOptions, value: unknown) {
    if (options.type === 'list' && typeof value === 'string') {
      return value.split(options.sep || ',')
    }

    return value
  }

  /**
   * Create the state object expected by public validators.
   */
  #createValidationState(options: InternalPromptOptions, value: unknown) {
    const state: Record<string, unknown> = {
      type: options.type,
      name: options.name,
      message: options.message,
      value,
    }

    if ('choices' in options) state.choices = options.choices
    return state
  }

  /**
   * Whether Clack supports validating this prompt inline.
   */
  #supportsNativeValidation(options: InternalPromptOptions) {
    return (
      options.type === 'input' ||
      options.type === 'list' ||
      options.type === 'password' ||
      options.type === 'path' ||
      options.type === 'autocomplete'
    )
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
      .filter((value): value is string => value !== undefined)
  }

  #createTextPrompt(
    options: Extract<InternalPromptOptions, { type: 'input' | 'list' }>,
    context: ValidationContext
  ) {
    const validate = this.#wrapValidateForClack(options, context)
    return () =>
      clack.text({
        message: options.message,
        placeholder: options.hint,
        defaultValue: options.initial,
        validate,
        signal: options.signal,
      })
  }

  #createPasswordPrompt(
    options: Extract<InternalPromptOptions, { type: 'password' }>,
    context: ValidationContext
  ) {
    const validate = this.#wrapValidateForClack(options, context)
    return () =>
      clack.password({
        message: options.message,
        mask: options.mask,
        validate,
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
    const clackGroups: Record<
      string,
      { value: string; label: string; hint?: string; disabled?: boolean }[]
    > = {}
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

  #createPathPrompt(
    options: Extract<InternalPromptOptions, { type: 'path' }>,
    context: ValidationContext
  ) {
    const validate = this.#wrapValidateForClack(options, context)
    return () =>
      clack.path({
        message: options.message,
        initialValue: options.initial,
        root: options.root,
        directory: options.onlyDirectories,
        validate,
        signal: options.signal,
      })
  }

  #createAutocompletePrompt(
    options: Extract<InternalPromptOptions, { type: 'autocomplete' }>,
    context: ValidationContext
  ) {
    const clackOptions = this.#mapChoices(options.choices)
    const validate = this.#wrapValidateForClack(options, context) as
      | ClackAutocompleteValidation
      | undefined

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
          validate,
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
        validate,
        signal: options.signal,
      })
  }

  protected async prompt(options: InternalPromptOptions): Promise<any> {
    const validationContext: ValidationContext = {}
    let promptFn: () => Promise<unknown>

    switch (options.type) {
      case 'input':
      case 'list':
        promptFn = this.#createTextPrompt(options, validationContext)
        break
      case 'password':
        promptFn = this.#createPasswordPrompt(options, validationContext)
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
        promptFn = this.#createAutocompletePrompt(options, validationContext)
        break
      case 'select-key':
        promptFn = this.#createSelectKeyPrompt(options)
        break
      case 'group-multiselect':
        promptFn = this.#createGroupMultiSelectPrompt(options)
        break
      case 'path':
        promptFn = this.#createPathPrompt(options, validationContext)
        break
      default:
        throw new Error(`Unsupported prompt type: ${(options as any).type}`)
    }

    const usesNativeValidation =
      this.#supportsNativeValidation(options) &&
      options.validate?.constructor.name !== 'AsyncFunction'

    let result: unknown
    while (true) {
      validationContext.pending = undefined
      result = await promptFn()
      this.#assertNotCancelled(result)

      let validationResult: boolean | string | undefined
      if (validationContext.pending) {
        validationResult = await validationContext.pending
      } else if (options.validate && !usesNativeValidation) {
        const validationValue = this.#prepareValidationValue(options, result)
        validationResult = await options.validate(
          validationValue,
          this.#createValidationState(options, validationValue)
        )
      }

      if (validationResult === undefined || validationResult === true) break

      clack.log.warning(
        typeof validationResult === 'string' ? validationResult : 'Validation failed'
      )
    }

    if (options.type === 'list') {
      result = (result as string).split(options.sep || ',')
    }

    if (typeof options.result === 'function') return options.result(result)
    return result
  }
}
