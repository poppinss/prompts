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

test.group('Prompts | trap', () => {
  test('trap prompt by message', async ({ assert, expectTypeOf }) => {
    const prompt = new Prompt()
    prompt.trap("What's your username?").replyWith('virk')

    const username = await prompt.ask("What's your username?")
    expectTypeOf(username).toEqualTypeOf<string>()
    assert.equal(username, 'virk')
  })

  test('trap prompt by name', async ({ assert, expectTypeOf }) => {
    const prompt = new Prompt()
    prompt.trap('username').replyWith('virk')

    const username = await prompt.ask("What's your username?", { name: 'username' })
    expectTypeOf(username).toEqualTypeOf<string>()
    assert.equal(username, 'virk')
  })

  test('restore trap once the prompt is triggered', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('username').replyWith('virk')

    await prompt.ask("What's your username?", { name: 'username' })
    assert.equal(prompt.traps.prompts.size, 0)
  })

  test('restore trap even when prompt raises an exception', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('username').replyWith('virk').assertFails('')

    await assert.rejects(() => prompt.ask("What's your username?", { name: 'username' }))
    assert.equal(prompt.traps.prompts.size, 0)
  })

  test('get pending prompts', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap("What's your username?").replyWith('virk')
    assert.deepEqual(Array.from(prompt.traps.prompts.keys()), ["What's your username?"])
  })

  test('throw error when there are pending prompts', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap("What's your username?").replyWith('virk')

    try {
      prompt.traps.verify()
    } catch (error) {
      assert.match(error.stack, /trap\.spec\.ts/)
      assert.equal(error.message, 'Expected prompt "What\'s your username?" to get triggered')
    }
  })
})
