/*
 * @poppinss/prompts
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * The state of prompt shared with the validate function
 */
export type PromptState<T extends any> = {
  type: string
  name: string
  message: string
  value: T
}

/**
 * Shape of prompt validate function
 */
export type PromptValidationFunction<T extends PromptState<any>> = (
  value: T['value'],
  state: T
) => boolean | string | Promise<boolean | string>

/**
 * Shape of prompt format function. It is called on every keystroke
 */
export type PromptFormatFunction<T extends any, Result extends any> = (
  value: T
) => Result | Promise<Result>

/**
 * Shape of prompt result function. It is called before returning the result
 * and after validation
 */
export type PromptResultFunction<T extends any, Result extends any> = (
  value: T
) => Result | Promise<Result>

/**
 * Prompt options for text based prompts
 */
export type TextPromptOptions<Result extends any> = {
  default?: string
  name?: string
  hint?: string
  result?: PromptResultFunction<string, Result>
  format?: PromptFormatFunction<string, string>
  validate?: PromptValidationFunction<PromptState<string>>
}

/**
 * Prompt options for enum prompt
 */
export type EnumPromptOptions<Result extends any> = {
  default?: string
  name?: string
  result?: PromptResultFunction<string[], Result>
  format?: PromptFormatFunction<string, string>
  validate?: PromptValidationFunction<PromptState<string[]>>
  hint?: string
  seperator?: string
}

/**
 * Prompt options for the choice prompt
 */
export type ChoicePromptOptions<Choice extends string, Result extends any> = {
  default?: string
  name?: string
  hint?: string
  result?: PromptResultFunction<Choice, Result>
  format?: PromptFormatFunction<Choice, string>
  validate?: PromptValidationFunction<PromptState<Choice> & { choices: PromptChoice<Choice>[] }>
}

/**
 * Prompt options for the multiple prompt
 */
export type MultiplePromptOptions<Choice extends string, Result extends any> = {
  default?: string[]
  name?: string
  hint?: string
  result?: PromptResultFunction<Choice[], Result>
  format?: PromptFormatFunction<Choice[] | string, string | string[]>
  validate?: PromptValidationFunction<PromptState<Choice[]> & { choices: PromptChoice<Choice>[] }>
}

/**
 * Shape of boolean prompts
 */
export type BooleanPromptOptions<Result extends any> = {
  default?: boolean
  name?: string
  hint?: string
  result?: PromptResultFunction<boolean, Result>
  format?: PromptFormatFunction<boolean, boolean>
  validate?: PromptValidationFunction<PromptState<boolean>>
}

/**
 * Options for a toggle prompt
 */
export type TogglePromptOptions<Result extends any> = {
  default?: boolean
  name?: string
  hint?: string
  result?: PromptResultFunction<boolean, Result>
  format?: PromptFormatFunction<boolean, boolean>
  validate?: PromptValidationFunction<PromptState<boolean>>
}

/**
 * Prompt options for the autocomplete prompt
 */
export type AutoCompletePromptOptions<
  Choice extends string,
  Multiple extends boolean,
  Result extends any
> = {
  default?: number
  limit?: number
  name?: string
  hint?: string
  multiple?: Multiple
  result?: PromptResultFunction<Multiple extends true ? Choice[] : Choice, Result>
  format?: PromptFormatFunction<
    Multiple extends true ? Choice[] | string : Choice | string,
    string[] | string
  >
  validate?: PromptValidationFunction<
    PromptState<Multiple extends true ? Choice[] : Choice> & { choices: PromptChoice<Choice>[] }
  >
  footer?: () => string
}

/**
 * Shape of the prompt choice
 */
export type PromptChoice<Choice extends string> = {
  name: Choice
  message?: string
  hint?: string
  disabled?: boolean
}
