/*
 * @poppinss/prompts
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { EventEmitter } from 'events'
import { Colors } from '@poppinss/colors'

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
} from './Contracts'

import { ObjectBuilder } from './ObjectBuilder'

/**
 * Colors and icons to use.
 */
const colors = new Colors()
export const icons = process.platform === 'win32' ? { pointer: '>' } : { pointer: '❯' }

/**
 * Base class extended by [[Enquirer]] and [[Emitter]] classes to have
 * common interface.
 */
export abstract class Prompt extends EventEmitter implements PromptContract {
	protected abstract prompt(options: any): Promise<any>

	public on(event: 'prompt', callback: (options: PromptEventOptions) => any): this
	public on(event: 'prompt:error', callback: (message: string) => any): this
	public on(event: 'prompt:answer', callback: (message: any) => any): this
	public on(event: string, callback: (...args: any[]) => any): this {
		super.on(event, callback)
		return this
	}

	/**
	 * Prompts for text input
	 */
	public async ask<Result extends any = string>(
		title: string,
		options?: TextPromptOptions<Result>
	): Promise<Result> {
		options = options || {}

		const builder = new ObjectBuilder()
		builder.addProp('type', 'input')
		builder.addProp('name', options.name)
		builder.addProp('message', title)
		builder.addProp('hint', options.hint)
		builder.addProp('initial', options.default)
		builder.addProp('result', options.result)
		builder.addProp('format', options.format)
		builder.addProp('validate', options.validate)
		builder.addProp('prefix', colors.dim(icons.pointer))
		builder.addProp('styles', {
			danger: (value: string) => colors.red(value),
			submitted: (value: string) => colors.cyan(value),
		})
		return this.prompt(builder.toJSON())
	}

	/**
	 * Prompts for text input
	 */
	public async enum<Result extends any = string[]>(
		title: string,
		options?: EnumPromptOptions<Result>
	): Promise<Result> {
		options = options || {}

		const builder = new ObjectBuilder()
		builder.addProp('type', 'list')
		builder.addProp('sep', options.seperator || ',')
		builder.addProp('name', options.name)
		builder.addProp('message', title)
		builder.addProp('hint', options.hint)
		builder.addProp('initial', options.default)
		builder.addProp('result', options.result)
		builder.addProp('format', options.format)
		builder.addProp('validate', options.validate)
		builder.addProp('prefix', colors.dim(icons.pointer))
		builder.addProp('styles', {
			danger: (value: string) => colors.red(value),
		})

		return this.prompt(builder.toJSON())
	}

	/**
	 * Prompts for text input but mangles the output (for password)
	 */
	public async secure<Result extends any = string>(
		title: string,
		options?: TextPromptOptions<Result>
	): Promise<Result> {
		options = options || {}

		const builder = new ObjectBuilder()
		builder.addProp('type', 'password')
		builder.addProp('name', options.name)
		builder.addProp('message', title)
		builder.addProp('initial', options.default)
		builder.addProp('result', options.result)
		builder.addProp('format', options.format)
		builder.addProp('validate', options.validate)
		builder.addProp('prefix', colors.dim(icons.pointer))
		builder.addProp('styles', {
			danger: (value: string) => colors.red(value),
			submitted: (value: string) => colors.cyan(value),
		})

		return this.prompt(builder.toJSON())
	}

	/**
	 * Asks for `Y/n`
	 */
	public async confirm<Result extends any = boolean>(
		title: string,
		options?: BooleanPromptOptions<Result>
	): Promise<Result> {
		options = options || {}

		const builder = new ObjectBuilder()
		builder.addProp('type', 'confirm')
		builder.addProp('name', options.name)
		builder.addProp('message', title)
		builder.addProp('hint', options.hint)
		builder.addProp('initial', options.default)
		builder.addProp('result', options.result)
		builder.addProp('format', options.format)
		builder.addProp('validate', options.validate)
		builder.addProp('prefix', colors.dim(icons.pointer))
		builder.addProp('styles', {
			danger: (value: string) => colors.red(value),
			submitted: (value: string) => colors.cyan(value),
		})

		return this.prompt(builder.toJSON())
	}

	/**
	 * Similar to [[this.confirm]] but with custom toggle options
	 */
	public async toggle<Result extends any = boolean>(
		title: string,
		choices: [string, string],
		options?: TogglePromptOptions<Result>
	): Promise<Result> {
		options = options || {}

		const builder = new ObjectBuilder()
		builder.addProp('type', 'toggle')
		builder.addProp('name', options.name)
		builder.addProp('message', title)
		builder.addProp('hint', options.hint)
		builder.addProp('initial', options.default)
		builder.addProp('result', options.result)
		builder.addProp('format', options.format)
		builder.addProp('validate', options.validate)
		builder.addProp('enabled', choices[0])
		builder.addProp('disabled', choices[1])
		builder.addProp('prefix', colors.dim(icons.pointer))
		builder.addProp('styles', {
			danger: (value: string) => colors.red(value),
			submitted: (value: string) => colors.cyan(value),
		})

		return this.prompt(builder.toJSON())
	}

	/**
	 * Prompts for text input
	 */
	public async choice<Choice extends string, Result extends any = Choice>(
		title: string,
		choices: readonly (Choice | PromptChoice<Choice>)[],
		options?: ChoicePromptOptions<Choice, Result>
	): Promise<Result> {
		options = options || {}

		const builder = new ObjectBuilder()
		builder.addProp('type', 'select')
		builder.addProp('name', options.name)
		builder.addProp('message', title)
		builder.addProp('initial', options.default)
		builder.addProp('hint', options.hint)
		builder.addProp('result', options.result)
		builder.addProp('format', options.format)
		builder.addProp('validate', options.validate)
		builder.addProp('prefix', colors.dim(icons.pointer))
		builder.addProp('styles', {
			danger: (value: string) => colors.red(value),
			submitted: (value: string) => colors.cyan(value),
		})

		builder.addProp(
			'choices',
			choices.map((choice) => {
				if (typeof choice === 'string') {
					return { name: choice, message: choice, value: choice }
				}
				return choice
			})
		)

		return this.prompt(builder.toJSON())
	}

	/**
	 * Prompts for text input
	 */
	public async multiple<Choice extends string, Result extends any = Choice[]>(
		title: string,
		choices: readonly (Choice | PromptChoice<Choice>)[],
		options?: MultiplePromptOptions<Choice, Result>
	): Promise<Result> {
		options = options || {}

		const builder = new ObjectBuilder()
		builder.addProp('type', 'multiselect')
		builder.addProp('name', options.name)
		builder.addProp('message', title)
		builder.addProp('initial', options.default)
		builder.addProp('result', options.result)
		builder.addProp('format', options.format)
		builder.addProp('hint', options.hint)
		builder.addProp('validate', options.validate)
		builder.addProp('prefix', colors.dim(icons.pointer))
		builder.addProp('styles', {
			danger: (value: string) => colors.red(value),
			submitted: (value: string) => colors.cyan(value),
		})

		builder.addProp('indicator', (state: any, choice: any) => {
			if (choice.enabled) {
				return colors.cyan(state.symbols.radio.on)
			}
			return colors.grey(state.symbols.radio.off)
		})

		builder.addProp(
			'choices',
			choices.map((choice) => {
				if (typeof choice === 'string') {
					return { name: choice, message: choice, value: choice }
				}
				return choice
			})
		)

		return this.prompt(builder.toJSON())
	}

	/**
	 * Prompts for text input
	 */
	public async autocomplete<
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
		builder.addProp('type', 'autocomplete')
		builder.addProp('name', options.name)
		builder.addProp('message', title)
		builder.addProp('initial', options.default)
		builder.addProp('multiple', options.multiple)
		builder.addProp('result', options.result)
		builder.addProp('hint', options.hint)
		builder.addProp('format', options.format)
		builder.addProp('validate', options.validate)
		builder.addProp('choices', choices)
		builder.addProp('prefix', colors.dim(icons.pointer))
		builder.addProp('styles', {
			danger: (value: string) => colors.red(value),
			submitted: (value: string) => colors.cyan(value),
		})

		return this.prompt(builder.toJSON())
	}
}
