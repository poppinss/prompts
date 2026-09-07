/*
 * @poppinss/prompts
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { Prompt } from '../../src/clack.js'

test.group('Prompts | path', () => {
  test('trap path prompt', async ({ assert, expectTypeOf }) => {
    const prompt = new Prompt()
    prompt.trap('Select config directory').replyWith('/home/user/config')

    const result = await prompt.path('Select config directory')
    expectTypeOf(result).toEqualTypeOf<string>()
    assert.equal(result, '/home/user/config')
  })

  test('use default value when no input is provided', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Select config directory')

    const result = await prompt.path('Select config directory', {
      default: '/etc/config',
    })

    assert.equal(result, '/etc/config')
  })

  test('invoke result method to transform return value', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Select directory').replyWith('/home/user')

    const result = await prompt.path('Select directory', {
      result(value) {
        return `${value}/config`
      },
    })

    assert.equal(result, '/home/user/config')
  })

  test('fail when assertions are defined without the validations in place', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Select directory').assertFails('').replyWith('/home/user')

    await assert.rejects(
      () => prompt.path('Select directory'),
      'Expected prompt validation to fail'
    )
  })

  test('validate path input', async ({ assert }) => {
    const prompt = new Prompt()
    prompt
      .trap('Select directory')
      .assertFails('', 'Path is required')
      .assertPasses('/home/user')
      .replyWith('/home/user')

    const result = await prompt.path('Select directory', {
      validate(value) {
        if (!value) return 'Path is required'
        return true
      },
    })

    assert.equal(result, '/home/user')
  })
})
