/*
 * @poppinss/prompts
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

export class ObjectBuilder {
  private _source: any = {}

  public addProp (key, value) {
    if (value === undefined) {
      return
    }
    this._source[key] = value
  }

  public toJSON () {
    return this._source
  }
}
