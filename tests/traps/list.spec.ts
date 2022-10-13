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

test.group('Prompts | list', () => {
  test('trap list prompt', async ({ assert, expectTypeOf }) => {
    const prompt = new Prompt()
    prompt.trap('Enter tags').replyWith('node,js')

    const tags = await prompt.list('Enter tags')
    expectTypeOf(tags).toEqualTypeOf<string[]>()
    assert.deepEqual(tags, ['node', 'js'])
  })

  test('use custom separator', async ({ assert, expectTypeOf }) => {
    const prompt = new Prompt()
    prompt.trap('Enter tags').replyWith('node, js')

    const tags = await prompt.list('Enter tags', { seperator: ', ' })
    expectTypeOf(tags).toEqualTypeOf<string[]>()
    assert.deepEqual(tags, ['node', 'js'])
  })

  test('use default value when no input is provided', async ({ assert, expectTypeOf }) => {
    const prompt = new Prompt()
    prompt.trap('Enter tags')

    const tags = await prompt.list('Enter tags', {
      default: 'node,js',
    })
    expectTypeOf(tags).toEqualTypeOf<string[]>()
    assert.deepEqual(tags, ['node', 'js'])
  })

  test('fail when assertions are defined without the validations in place', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Enter tags').assertFails('').replyWith('node,js')

    await assert.rejects(() => prompt.list('Enter tags'), 'Expected assertion to fail')
  })

  test('fail when expected failing assertion passes', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Enter tags').assertFails('').replyWith('node,js')

    await assert.rejects(
      () =>
        prompt.list('Enter tags', {
          validate() {
            return true
          },
        }),
      'Expected assertion to fail'
    )
  })

  test('fail when expected passing assertion fails', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Enter tags').assertPasses('foo').replyWith('node,js')

    await assert.rejects(
      () =>
        prompt.list('Enter tags', {
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
    prompt.trap('Enter tags').assertFails('', 'Tags are required').replyWith('secret')
    await assert.rejects(
      () =>
        prompt.list('Enter tags', {
          validate() {
            return 'Enter tags'
          },
        }),
      'Expected assertion to fail with message "Tags are required"'
    )
  })

  test('invoke result method to transform return value', async ({ assert, expectTypeOf }) => {
    const prompt = new Prompt()
    prompt.trap('Enter tags').replyWith('node,js')

    const tags = await prompt.list('Enter tags', {
      result(values) {
        return values.map((value) => value.toUpperCase())
      },
    })

    expectTypeOf(tags).toEqualTypeOf<string[]>()
    assert.deepEqual(tags, ['NODE', 'JS'])
  })
})
