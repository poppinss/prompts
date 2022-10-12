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

test.group('Prompts | secure', () => {
  test('trap secure prompt', async ({ assert, expectTypeOf }) => {
    const prompt = new Prompt()
    prompt.trap('Choose password').replyWith('secret')

    const password = await prompt.secure('Choose password')
    expectTypeOf(password).toEqualTypeOf<string>()
    assert.equal(password, 'secret')
  })

  test('use default value when no input is provided', async ({ assert, expectTypeOf }) => {
    const prompt = new Prompt()
    prompt.trap('Choose password')

    const password = await prompt.secure('Choose password', {
      default: 'secret',
    })
    expectTypeOf(password).toEqualTypeOf<string>()
    assert.equal(password, 'secret')
  })

  test('fail when assertions are defined without the validations in place', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Choose password').assertFails('').replyWith('secret')

    await assert.rejects(() => prompt.secure('Choose password'), 'Expected assertion to fail')
  })

  test('fail when expected failing assertion passes', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Choose password').assertFails('').replyWith('secret')

    await assert.rejects(
      () =>
        prompt.secure('Choose password', {
          validate() {
            return true
          },
        }),
      'Expected assertion to fail'
    )
  })

  test('fail when expected passing assertion fails', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Choose password').assertPasses('foo').replyWith('secret')

    await assert.rejects(
      () =>
        prompt.secure('Choose password', {
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
    prompt.trap('Choose password').assertFails('', 'Password is required').replyWith('secret')
    await assert.rejects(
      () =>
        prompt.secure('Choose password', {
          validate() {
            return 'Enter password'
          },
        }),
      'Expected assertion to fail with message "Password is required"'
    )
  })

  test('invoke result method to transform return value', async ({ assert, expectTypeOf }) => {
    const prompt = new Prompt()
    prompt.trap('Choose password').replyWith('secret')

    const password = await prompt.secure('Choose password', {
      result(value) {
        return value.toUpperCase()
      },
    })

    expectTypeOf(password).toEqualTypeOf<string>()
    assert.equal(password, 'SECRET')
  })
})
