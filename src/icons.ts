/*
 * @poppinss/prompts
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export const icons =
  process.platform === 'win32' && !process.env.WT_SESSION ? { pointer: '>' } : { pointer: '❯' }
