/*
 * @poppinss/prompts
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { Prompt } from '../../src/enquirer.js'

test.group('Prompts | confirm', () => {
  test('trap confirm prompt', async ({ assert, expectTypeOf }) => {
    const prompt = new Prompt()
    prompt.trap('Delete the file?').accept()

    const shouldDeleteFiles = await prompt.confirm('Delete the file?')
    expectTypeOf(shouldDeleteFiles).toEqualTypeOf<boolean>()
    assert.isTrue(shouldDeleteFiles)
  })

  test('use default value when no input is provided', async ({ assert, expectTypeOf }) => {
    const prompt = new Prompt()
    prompt.trap('Delete the file?')

    const shouldDeleteFiles = await prompt.confirm('Delete the file?', {
      default: true,
    })
    expectTypeOf(shouldDeleteFiles).toEqualTypeOf<boolean>()
    assert.isTrue(shouldDeleteFiles)
  })

  test('return false when value is accepted explicitly', async ({ assert, expectTypeOf }) => {
    const prompt = new Prompt()
    prompt.trap('Delete the file?')

    const shouldDeleteFiles = await prompt.confirm('Delete the file?')
    expectTypeOf(shouldDeleteFiles).toEqualTypeOf<boolean>()
    assert.isFalse(shouldDeleteFiles)
  })

  test('fail when assertions are defined without the validations in place', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Delete the file?').assertFails('').replyWith('virk')

    await assert.rejects(() => prompt.confirm('Delete the file?'), 'Expected assertion to fail')
  })

  test('fail when expected failing assertion passes', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Delete the file?').assertFails('').replyWith('virk')

    await assert.rejects(
      () =>
        prompt.confirm('Delete the file?', {
          validate() {
            return true
          },
        }),
      'Expected assertion to fail'
    )
  })

  test('fail when expected passing assertion fails', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Delete the file?').assertPasses('foo').replyWith('virk')

    await assert.rejects(
      () =>
        prompt.confirm('Delete the file?', {
          validate() {
            return false
          },
        }),
      'Expected assertion to pass, instead it failed'
    )
  })

  test('fail when expected failing assertion fails with a different message', async ({
    assert,
  }) => {
    const prompt = new Prompt()
    prompt.trap('Delete the file?').assertFails('', 'You should not delete files').replyWith('virk')

    await assert.rejects(
      () =>
        prompt.confirm('Delete the file?', {
          validate() {
            return 'Do not delete files'
          },
        }),
      'Expected assertion to fail with message "You should not delete files"'
    )
  })

  test('invoke result method to transform return value', async ({ assert, expectTypeOf }) => {
    const prompt = new Prompt()
    prompt.trap('Delete the file?').accept()

    const shouldDeleteFiles = await prompt.confirm('Delete the file?', {
      result(value) {
        return value ? 'Y' : 'N'
      },
    })

    expectTypeOf(shouldDeleteFiles).toEqualTypeOf<string>()
    assert.equal(shouldDeleteFiles, 'Y')
  })
})
