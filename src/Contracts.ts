/*
 * @poppinss/prompts
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
export type PromptFormatFunction<T extends any> = (value: T) => T | Promise<T>

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
	format?: PromptFormatFunction<string>
	validate?: PromptValidationFunction<PromptState<string>>
}

/**
 * Prompt options for enum prompt
 */
export type EnumPromptOptions<Result extends any> = {
	default?: string
	name?: string
	result?: PromptResultFunction<string[], Result>
	format?: PromptFormatFunction<string>
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
	format?: PromptFormatFunction<Choice>
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
	format?: PromptFormatFunction<Choice>
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
	format?: PromptFormatFunction<boolean>
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
	format?: PromptFormatFunction<boolean>
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
	format?: PromptFormatFunction<Choice>
	validate?: PromptValidationFunction<
		PromptState<Multiple extends true ? Choice[] : Choice> & { choices: PromptChoice<Choice>[] }
	>
}

/**
 * The following options are passed to the emitter `prompt`
 * event handler
 */
export type PromptEventOptions = {
	name: string
	type: string
	message: string
	initial?: string | boolean | string[]
	result?: PromptResultFunction<any, any>
	format?: PromptFormatFunction<any>
	validate?: PromptValidationFunction<any>
	answer(answer: any): Promise<void>
	accept(): Promise<void>
	decline(): Promise<void>
	select(index: number): Promise<void>
	multiSelect(indexes: number[]): Promise<void>
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

/**
 * Shape of prompts class.
 */
export interface PromptContract {
	ask<Result extends any = string>(
		title: string,
		options?: TextPromptOptions<Result>
	): Promise<Result>

	enum<Result extends any = string[]>(
		title: string,
		options?: EnumPromptOptions<Result>
	): Promise<Result>

	secure<Result extends any = string>(
		title: string,
		options?: TextPromptOptions<Result>
	): Promise<Result>

	confirm<Result extends any = boolean>(
		title: string,
		options?: BooleanPromptOptions<Result>
	): Promise<Result>

	toggle<Result extends any = boolean>(
		title: string,
		choices: [string, string],
		options?: TogglePromptOptions<Result>
	): Promise<Result>

	/**
	 * Prompts to select one item
	 */
	choice<Choice extends string, Result extends any = Choice>(
		title: string,
		choices: readonly (Choice | PromptChoice<Choice>)[],
		options?: ChoicePromptOptions<Choice, Result>
	): Promise<Result>

	/**
	 * Prompts to select multiple item
	 */
	multiple<Choice extends string, Result extends any = Choice[]>(
		title: string,
		choices: readonly (Choice | PromptChoice<Choice>)[],
		options?: MultiplePromptOptions<Choice, Result>
	): Promise<Result>

	/**
	 * Prompts for choice with auto complete feature
	 */
	autocomplete<
		Choice extends string,
		Multiple extends boolean = false,
		Result extends any = Multiple extends true ? Choice[] : Choice
	>(
		title: string,
		choices: readonly Choice[],
		options?: AutoCompletePromptOptions<Choice, Multiple, Result>
	): Promise<Result>

	on(event: 'prompt', callback: (options: PromptEventOptions) => any): this
	on(event: 'prompt:error', callback: (message: string) => any): this
	on(event: 'prompt:answer', callback: (message: any) => any): this
	on(event: string, callback: (...args: any[]) => any): this
}
