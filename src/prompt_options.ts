/*
 * @poppinss/prompts
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { colors } from './colors.js'
import { icons } from './icons.js'

/**
 * Styles used by prompts
 */
export const promptStyles = {
  danger: (value: string) => colors.red(value),
  submitted: (value: string) => colors.cyan(value),
}

/**
 * Prompt prefix
 */
export const promptPrefix = colors.dim(icons.pointer)

/**
 * Highlight style used by prompt
 */
export const promptHiglight = (value: string) => colors.yellow(value)
