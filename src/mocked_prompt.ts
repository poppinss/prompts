/*
 * @poppinss/utils
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { inspect } from 'node:util'
import { AssertionError } from 'node:assert'
import { PromptState } from './types.js'

export class MockedPrompt {
  /**
   * The final answer to reply with
   */
  #answer: any

  /**
   * The selected index for the select prompt
   */
  #choiceSelection: number

  /**
   * Selected indexes for the multi-select prompt
   */
  #multiChoiceSelection: number[]

  /**
   * Expected assertions
   */
  #assertions: {
    value: string
    expectsError: boolean // Does assertion expects error?
    expectedErrorMessage?: string | RegExp
    error: AssertionError
  }[] = []

  /**
   * Set the answer without overriding the existing one
   */
  #setAnswer(answer: string | number | boolean | string[]) {
    if (this.#answer === undefined) {
      this.#answer = answer
    }
  }

  /**
   * Choose the default option when no explicit selection was made.
   *
   * - Choose the initial value
   * - Or, select the first option, if no initial value exists
   */
  #setSelectDefaults(options: any) {
    const defaultAnswer = options.initial !== undefined ? options.initial : 0
    if (typeof defaultAnswer === 'number') {
      if (this.#choiceSelection === undefined) {
        this.#choiceSelection = defaultAnswer
      }

      return
    }

    if (defaultAnswer !== undefined) {
      this.#setAnswer(defaultAnswer)
    }
  }

  /**
   * Choose the default option when no explicit selection was made.
   *
   * - Choose the initial value
   */
  #setMultiSelectDefaults(options: any) {
    this.#setAnswer(options.initial)
  }

  /**
   * Select the default answer for the toggle prompt when no
   * explicit selection was made.
   *
   * - Choose the initial value (if exists)
   * - Set answer to false
   */
  #setToggleDefaults(options: any) {
    this.#setAnswer(options.initial !== undefined ? options.initial : false)
  }

  /**
   * Select the default answer for the confirmation prompt, when
   * no explicit selection was made
   *
   * - Choose the initial value (if exists)
   * - Set answer to false
   */
  #setConfirmationDefaults(options: any) {
    this.#setAnswer(options.initial !== undefined ? options.initial : false)
  }

  /**
   * Select the default answer for the input and password prompts, when
   * no explicit selection was made
   *
   * - Choose the initial value (if exists)
   */
  #setTextDefaults(options: any) {
    this.#setAnswer(options.initial)
  }

  /**
   * Conditionals to find the prompt type
   */
  #isToggle(options: any) {
    return options.type === 'toggle'
  }
  #isConfirmation(options: any) {
    return options.type === 'confirm'
  }
  #isSelect(options: any) {
    return (
      (options.type === 'select' && options.choices) ||
      (options.type === 'autocomplete' && !options.multiple && options.choices)
    )
  }
  #isMultiSelect(options: any) {
    return (
      (options.type === 'multiselect' && options.choices) ||
      (options.type === 'autocomplete' && options.multiple && options.choices)
    )
  }
  #isText(options: any) {
    return options.type === 'input' || options.type === 'password' || options.type === 'list'
  }

  /**
   * Run assertions on the final answer
   */
  async #assert(options: any) {
    /**
     * State for the validation method
     */
    const state: PromptState<any> = {
      message: options.message,
      type: options.type,
      name: options.name,
      value: '',
    }

    /**
     * Expected there should be assertions, but the prompt has not
     * defined the validate function
     */
    if (!options.validate && this.#assertions.length) {
      throw this.#assertions[0].error
    }

    /**
     * Go through all the expected assertions
     */
    for (let assertion of this.#assertions) {
      const result = await options.validate(assertion.value, state)

      /**
       * Expected the value to pass the validation, but the validation
       * result returns a non true value
       */
      if (!assertion.expectsError) {
        if (result !== true) {
          throw assertion.error
        }
      } else {
        /**
         * Expected the value to fail the assertion, but the
         * validation method returned true
         */
        if (result === true) {
          throw assertion.error
        }

        /**
         * Validation failed but the error message is different
         */
        if (
          typeof assertion.expectedErrorMessage === 'string' &&
          result !== assertion.expectedErrorMessage
        ) {
          assertion.error.actual = result
          throw assertion.error
        }

        if (
          assertion.expectedErrorMessage instanceof RegExp &&
          !assertion.expectedErrorMessage.test(result)
        ) {
          throw assertion.error
        }
      }
    }
  }

  /**
   * Format user input. Inside CLI, the method is called
   * as the user types
   */
  #formatInput(input: string, options: any) {
    if (options.type === 'list') {
      return input.split(options.sep)
    }

    return input
  }

  /**
   * Transform the final result
   */
  async #transformResult(result: any, options: any) {
    if (typeof options.result === 'function') {
      return options.result(result)
    }

    return result
  }

  /**
   * Convert the user selection choice to answer
   */
  #convertChoiceToAnswer(options: any) {
    if (this.#answer !== undefined) {
      return
    }

    const answer = options.choices[this.#choiceSelection]
    this.#setAnswer(typeof answer === 'string' ? answer : answer?.name)
  }

  /**
   * Convert the user multiple selection choice to answer
   */
  #convertMultipleChoicesToAnswer(options: any) {
    if (this.#answer !== undefined) {
      if (!Array.isArray(this.#answer)) {
        this.#answer = [this.#answer]
      }
      return
    }

    /**
     * Initiate multi choice selection array
     */
    if (!this.#multiChoiceSelection) {
      this.#multiChoiceSelection =
        this.#choiceSelection !== undefined ? [this.#choiceSelection] : []
    }

    const answers = this.#multiChoiceSelection.map((index) => {
      const answer = options.choices[index]
      return typeof answer === 'string' ? answer : answer?.name
    })

    this.#setAnswer(answers)
  }

  constructor() {}

  /**
   * Reply to prompt with a given answer
   */
  replyWith(answer: string | string[] | boolean | number): this {
    this.#answer = answer
    return this
  }

  /**
   * Accept the confirmation or the toggle prompt
   */
  accept(): this {
    return this.replyWith(true)
  }

  /**
   * Reject the confirmation or the toggle prompt
   */
  reject(): this {
    return this.replyWith(false)
  }

  /**
   * Choose a select option by index. The index starts with zero
   */
  chooseOption(index: number): this {
    this.#choiceSelection = index
    return this
  }

  /**
   * Choose multiple options by indexes. The index starts with zero
   */
  chooseOptions(indexes: number[]): this {
    this.#multiChoiceSelection = indexes
    return this
  }

  /**
   * Expect the given value to fail the prompt validation
   */
  assertFails(value: string, message?: string | RegExp): this {
    if (!message) {
      this.#assertions.push({
        value,
        expectsError: true,
        expectedErrorMessage: message,
        error: new AssertionError({
          message: 'Expected prompt validation to fail',
          stackStartFn: this.assertFails,
        }),
      })
      return this
    }

    if (typeof message === 'string') {
      const error = new AssertionError({
        message: `Expected prompt validation message to equal ${inspect(message)}`,
        expected: message,
        operator: 'strictEqual',
        stackStartFn: this.assertFails,
      })
      Object.defineProperty(error, 'showDiff', { value: true })

      this.#assertions.push({
        value,
        expectsError: true,
        expectedErrorMessage: message,
        error,
      })

      return this
    }

    this.#assertions.push({
      value,
      expectsError: true,
      expectedErrorMessage: message,
      error: new AssertionError({
        message: `Expected prompt validation message to match ${inspect(message)}`,
        expected: message,
      }),
    })

    return this
  }

  /**
   * Expect the given value to pass the prompt validation
   */
  assertPasses(value: string): this {
    const error = new AssertionError({
      message: 'Expected assertion to pass, instead it failed',
    })
    this.#assertions.push({
      value,
      expectsError: false,
      error: error,
    })

    return this
  }

  /**
   * Handle the prompt
   */
  async handle(options: any): Promise<any> {
    if (this.#isSelect(options)) {
      this.#setSelectDefaults(options)
      this.#convertChoiceToAnswer(options)
    } else if (this.#isMultiSelect(options)) {
      this.#setMultiSelectDefaults(options)
      this.#convertMultipleChoicesToAnswer(options)
    } else if (this.#isToggle(options)) {
      this.#setToggleDefaults(options)
    } else if (this.#isConfirmation(options)) {
      this.#setConfirmationDefaults(options)
    } else if (this.#isText(options)) {
      this.#setTextDefaults(options)
    }

    this.#answer = this.#formatInput(this.#answer, options)
    await this.#assert(options)
    return this.#transformResult(this.#answer, options)
  }
}
