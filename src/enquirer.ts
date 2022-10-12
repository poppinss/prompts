/*
 * @poppinss/prompts
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import enq from 'enquirer'
import { BasePrompt } from './base.js'
import { PromptCancelledException } from './exceptions/prompt_cancelled_exception.js'

/**
 * Since the typings for `enquirer` package is badly broken, we
 * need to cast it to any to make it usable
 */
const enquirer = enq as any

/**
 * Uses the `enquirer` package to prompt user for input. The `$prompt`
 * method is invoked by the extended `Prompt` class.
 */
export class Prompt extends BasePrompt {
  protected async prompt(options: any): Promise<any> {
    let cancelled = false
    options = Object.assign(
      {
        onCancel() {
          cancelled = true
        },
      },
      options
    )

    try {
      const output = await enquirer.prompt(options)
      return output[options.name]
    } catch (error) {
      if (cancelled) {
        throw new PromptCancelledException()
      }

      throw error
    }
  }
}
