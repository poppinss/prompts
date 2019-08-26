/*
* @adonisjs/ace
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * The state of prompt shared with the validate function
 */
export type PromptState<T extends any> = {
  type: string
  name: string,
  message: string,
  value: T,
}

/**
 * Shape of prompt validate function
 */
export type PromptValidationFunction<T extends PromptState<any>> = (
  value: T['value'],
  state: T,
) => boolean | string | Promise<boolean | string>

/**
 * Shape of prompt format function. It is called on every keystroke
 */
export type PromptFormatFunction<T extends any> = (value: T) => T | Promise<T>

/**
 * Prompt options for text based prompts
 */
export type TextPromptOptions = {
  default?: string,
  name?: string,
  format?: PromptFormatFunction<string>,
  validate?: PromptValidationFunction<PromptState<string>>,
}

/**
 * Prompt options for the choice prompt
 */
export type ChoicePromptOptions = {
  default?: string,
  name?: string,
  format?: PromptFormatFunction<string>,
  validate?: PromptValidationFunction<PromptState<string> & { choices: PromptChoice[] }>,
}

/**
 * Prompt options for the multiple prompt
 */
export type MultiplePromptOptions = {
  default?: string[],
  name?: string,
  format?: PromptFormatFunction<string[]>,
  validate?: PromptValidationFunction<PromptState<string[]> & { choices: PromptChoice[] }>,
}

/**
 * Shape of boolean prompts
 */
export type BooleanPromptOptions = {
  default?: boolean,
  name?: string,
  format?: PromptFormatFunction<boolean>,
  validate?: PromptValidationFunction<PromptState<boolean>>,
}

/**
 * Options for a toggle prompt
 */
export type TogglePromptOptions = {
  default?: boolean,
  name?: string,
  format?: PromptFormatFunction<string>,
  validate?: PromptValidationFunction<PromptState<boolean>>,
}

/**
 * The following options are passed to the emitter `prompt`
 * event handler
 */
export type PromptEventOptions = {
  name: string,
  type: string,
  message: string,
  initial?: string | boolean | string[],
  format?: PromptFormatFunction<any>,
  validate?: PromptValidationFunction<any>,
  answer (answer: any): Promise<void>,
  accept (): Promise<void>,
  decline (): Promise<void>,
  select (index: number): Promise<void>,
  multiSelect (indexes: number[]): Promise<void>,
}

/**
 * Shape of the prompt choice
 */
export type PromptChoice = {
  name: string,
  message?: string,
  value?: string,
  hint?: string,
  disabled?: boolean,
}

/**
 * Shape of prompts class.
 */
export interface PromptContract {
  ask (title: string, options?: TextPromptOptions): Promise<string>,
  secure (title: string, options?: TextPromptOptions): Promise<string>,
  confirm (title: string, options?: BooleanPromptOptions): Promise<boolean>,
  toggle (title: string, choices: [string, string], options?: TogglePromptOptions): Promise<boolean>,
  choice (title: string, choices: (string | PromptChoice)[], options?: ChoicePromptOptions): Promise<string>,

  multiple (
    title: string,
    choices: (string | PromptChoice)[],
    options?: MultiplePromptOptions,
  ): Promise<string[]>,

  on (event: 'prompt', callback: (options: PromptEventOptions) => any): this,
  on (event: 'prompt:error', callback: (message: string) => any): this,
  on (event: 'prompt:answer', callback: (message: any) => any): this,
  on (event: string, callback: (...args: any[]) => any): this,
}
