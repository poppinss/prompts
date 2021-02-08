/*
 * @poppinss/prompts
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export class ObjectBuilder {
  private source: { [key: string]: any } = {}

  public addProp(key: string, value: any) {
    if (value === undefined) {
      return
    }
    this.source[key] = value
  }

  public toJSON(): { [key: string]: any } {
    return this.source
  }
}
