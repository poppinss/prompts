/*
 * @poppinss/prompts
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { EnquirerPrompt } from '../../src/enquirer.js'

test.group('Prompts | trap', () => {
  test('trap prompt by message', async ({ assert, expectTypeOf }) => {
    const prompt = new EnquirerPrompt()
    prompt.trap("What's your username?").replyWith('virk')

    const username = await prompt.ask("What's your username?")
    expectTypeOf(username).toEqualTypeOf<string>()
    assert.equal(username, 'virk')
  })

  test('trap prompt by name', async ({ assert, expectTypeOf }) => {
    const prompt = new EnquirerPrompt()
    prompt.trap('username').replyWith('virk')

    const username = await prompt.ask("What's your username?", { name: 'username' })
    expectTypeOf(username).toEqualTypeOf<string>()
    assert.equal(username, 'virk')
  })

  test('restore trap once the prompt is triggered', async ({ assert }) => {
    const prompt = new EnquirerPrompt()
    prompt.trap('username').replyWith('virk')

    await prompt.ask("What's your username?", { name: 'username' })
    assert.deepEqual(prompt.traps, [])
  })

  test('restore trap even when prompt raising an exception', async ({ assert }) => {
    const prompt = new EnquirerPrompt()
    prompt.trap('username').replyWith('virk').assertFails('')

    await assert.rejects(() => prompt.ask("What's your username?", { name: 'username' }))
    assert.deepEqual(prompt.traps, [])
  })

  test('return titles for pending traps', async ({ assert }) => {
    const prompt = new EnquirerPrompt()
    prompt.trap("What's your username?").replyWith('virk')
    assert.deepEqual(prompt.traps, ["What's your username?"])
  })
})
