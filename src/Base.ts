/**
 * @module @poppinss/prompts
 */

/**
 * @poppinss/prompts
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import Emitter from 'events'
import {
  PromptContract,
  TextPromptOptions,
  BooleanPromptOptions,
  TogglePromptOptions,
  ChoicePromptOptions,
  PromptEventOptions,
  PromptChoice,
  MultiplePromptOptions,
} from './Contracts'

/**
 * Base class extended by [[Enquirer]] and [[Emitter]] classes to have
 * common interface.
 */
export abstract class Prompt extends Emitter implements PromptContract {
  protected abstract $prompt (options: any): Promise<any>

  public on (event: 'prompt', callback: (options: PromptEventOptions) => any): this
  public on (event: 'prompt:error', callback: (message: string) => any): this
  public on (event: 'prompt:answer', callback: (message: any) => any): this
  public on (event: string, callback: (...args: any[]) => any): this {
    super.on(event, callback)
    return this
  }

  /**
   * Prompts for text input
   */
  public async ask<Result extends any = string> (
    title: string,
    options?: TextPromptOptions,
  ): Promise<Result> {
    options = options || {}
    return this.$prompt({
      type: 'input',
      name: options.name,
      message: title,
      initial: options.default,
      result: options.result,
      format: options.format,
      validate: options.validate,
    })
  }

  /**
   * Prompts for text input but mangles the output (for password)
   */
  public async secure<Result extends any = string> (
    title: string,
    options?: TextPromptOptions,
  ): Promise<Result> {
    options = options || {}
    return this.$prompt({
      type: 'password',
      message: title,
      name: options.name,
      initial: options.default,
      result: options.result,
      format: options.format,
      validate: options.validate,
    })
  }

  /**
   * Asks for `Y/n`
   */
  public async confirm<Result extends any = boolean> (
    title: string,
    options?: BooleanPromptOptions,
  ): Promise<Result> {
    options = options || {}
    return this.$prompt({
      type: 'confirm',
      message: title,
      name: options.name,
      initial: options.default,
      result: options.result,
      format: options.format,
      validate: options.validate,
    })
  }

  /**
   * Similar to [[this.confirm]] but with custom toggle options
   */
  public async toggle<Result extends any = boolean> (
    title: string,
    choices: [string, string],
    options?: TogglePromptOptions,
  ): Promise<Result> {
    options = options || {}
    return this.$prompt({
      type: 'toggle',
      message: title,
      name: options.name,
      enabled: choices[0],
      disabled: choices[1],
      initial: options.default,
      result: options.result,
      format: options.format,
      validate: options.validate,
    })
  }

  /**
   * Prompts for text input
   */
  public async choice<Result extends any = string> (
    title: string,
    choices: (string | PromptChoice)[],
    options?: ChoicePromptOptions,
  ): Promise<Result> {
    options = options || {}

    return this.$prompt({
      type: 'select',
      message: title,
      name: options.name,
      choices: choices.map((choice) => {
        if (typeof (choice) === 'string') {
          return { name: choice, message: choice, value: choice }
        }
        return choice
      }),
      initial: options.default,
      result: options.result,
      format: options.format,
      validate: options.validate,
    })
  }

  /**
   * Prompts for text input
   */
  public async multiple<Result extends any = string[]> (
    title: string,
    choices: (string | PromptChoice)[],
    options?: MultiplePromptOptions,
  ): Promise<Result> {
    options = options || {}

    return this.$prompt({
      type: 'multiselect',
      message: title,
      name: options.name,
      choices: choices.map((choice) => {
        if (typeof (choice) === 'string') {
          return { name: choice, message: choice, value: choice }
        }
        return choice
      }),
      initial: options.default,
      result: options.result,
      format: options.format,
      validate: options.validate,
    })
  }
}
