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

test.group('Prompts | autocomplete', () => {
  test('trap autocomplete prompt', async ({ assert, expectTypeOf }) => {
    const prompt = new Prompt()
    prompt.trap('Select the installation client').chooseOption(0)

    const client = await prompt.autocomplete('Select the installation client', ['npm', 'yarn'])
    expectTypeOf(client).toEqualTypeOf<'npm' | 'yarn'>()
    assert.equal(client, 'npm')
  })

  test('reply directly with option value', async ({ assert, expectTypeOf }) => {
    const prompt = new Prompt()
    prompt.trap('Select the installation client').replyWith('npm')

    const client = await prompt.autocomplete('Select the installation client', ['npm', 'yarn'])
    expectTypeOf(client).toEqualTypeOf<'npm' | 'yarn'>()
    assert.equal(client, 'npm')
  })

  test('use default value when no input is provided', async ({ assert, expectTypeOf }) => {
    const prompt = new Prompt()
    prompt.trap('Select the installation client')

    const client = await prompt.autocomplete('Select the installation client', ['npm', 'yarn'], {
      default: 1,
    })
    expectTypeOf(client).toEqualTypeOf<'npm' | 'yarn'>()
    assert.equal(client, 'yarn')
  })

  test('select multiple options', async ({ assert, expectTypeOf }) => {
    const prompt = new Prompt()
    prompt.trap('Select the installation client').chooseOptions([0, 1])

    const client = await prompt.autocomplete('Select the installation client', ['npm', 'yarn'], {
      multiple: true,
    })

    expectTypeOf(client).toEqualTypeOf<('npm' | 'yarn')[]>()
    assert.deepEqual(client, ['npm', 'yarn'])
  })

  test('fail when assertions are defined without the validations in place', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Select the installation client').assertFails('')

    await assert.rejects(
      () => prompt.autocomplete('Select the installation client', ['npm', 'yarn']),
      'Expected prompt validation to fail'
    )
  })

  test('fail when expected failing assertion passes', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Select the installation client').assertFails('')

    await assert.rejects(
      () =>
        prompt.autocomplete('Select the installation client', ['npm', 'yarn'], {
          validate() {
            return true
          },
        }),
      'Expected prompt validation to fail'
    )
  })

  test('fail when expected passing assertion fails', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Select the installation client').assertPasses('npm')

    await assert.rejects(
      () =>
        prompt.autocomplete('Select the installation client', ['npm', 'yarn'], {
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
    prompt.trap('Select the installation client').assertFails('', 'client is required')

    await assert.rejects(
      () =>
        prompt.autocomplete('Select the installation client', ['npm', 'yarn'], {
          validate() {
            return 'Enter client'
          },
        }),
      `Expected prompt validation message to equal 'client is required'`
    )
  })

  test('invoke result method to transform return value', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Select the installation client').chooseOption(1)

    const client = await prompt.autocomplete('Select the installation client', ['npm', 'yarn'], {
      result(value) {
        return value.toUpperCase()
      },
    })

    assert.equal(client, 'YARN')
  })
})
