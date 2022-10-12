/*
 * @poppinss/prompts
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Exception } from '@poppinss/utils'

/**
 * Exception raised when the prompt is cancelled
 */
export class PromptCancelledException extends Exception {
  static message = 'Prompt cancelled'
  static status = 500
  static code = 'E_PROMPT_CANCELLED'
}
