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

test.group('Prompts | input', () => {
  test('trap input prompt', async ({ assert, expectTypeOf }) => {
    const prompt = new Prompt()
    prompt.trap("What's your username?").replyWith('virk')

    const username = await prompt.ask("What's your username?")
    expectTypeOf(username).toEqualTypeOf<string>()
    assert.equal(username, 'virk')
  })

  test('use default value when no input is provided', async ({ assert, expectTypeOf }) => {
    const prompt = new Prompt()
    prompt.trap("What's your username?")

    const username = await prompt.ask("What's your username?", {
      default: 'virk',
    })
    expectTypeOf(username).toEqualTypeOf<string>()
    assert.equal(username, 'virk')
  })

  test('fail when assertions are defined without the validations in place', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap("What's your username?").assertFails('').replyWith('virk')

    await assert.rejects(
      () => prompt.ask("What's your username?"),
      'Expected prompt validation to fail'
    )
  })

  test('fail when expected failing assertion passes', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap("What's your username?").assertFails('').replyWith('virk')

    await assert.rejects(
      () =>
        prompt.ask("What's your username?", {
          validate() {
            return true
          },
        }),
      'Expected prompt validation to fail'
    )
  })

  test('fail when expected passing assertion fails', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap("What's your username?").assertPasses('foo').replyWith('virk')

    await assert.rejects(
      () =>
        prompt.ask("What's your username?", {
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
    prompt.trap("What's your username?").assertFails('', 'Username is required').replyWith('virk')
    await assert.rejects(
      () =>
        prompt.ask("What's your username?", {
          validate() {
            return 'Enter username'
          },
        }),
      `Expected prompt validation message to equal 'Username is required'`
    )
  })

  test('pass when expected assertion passed', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap("What's your username?").assertFails('', 'Username is required').replyWith('virk')

    const username = await prompt.ask("What's your username?", {
      validate() {
        return 'Username is required'
      },
    })

    assert.equal(username, 'virk')
  })

  test('assert validation message against a regex', async ({ assert }) => {
    const prompt = new Prompt()
    prompt
      .trap("What's your username?")
      .assertFails('', /\w+ is required/)
      .replyWith('virk')

    const username = await prompt.ask("What's your username?", {
      validate() {
        return 'Username is required'
      },
    })

    assert.equal(username, 'virk')
  })

  test('fail when validation message does not pass regex check', async ({ assert }) => {
    const prompt = new Prompt()
    prompt
      .trap("What's your username?")
      .assertFails('', /\w+ is required/)
      .replyWith('virk')

    await assert.rejects(
      () =>
        prompt.ask("What's your username?", {
          validate() {
            return 'Enter username'
          },
        }),
      'Expected prompt validation message to match /\\w+ is required/'
    )
  })

  test('invoke result method to transform return value', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap("What's your username?").replyWith('virk')

    const username = await prompt.ask("What's your username?", {
      result(value) {
        return value.toUpperCase()
      },
    })

    assert.equal(username, 'VIRK')
  })
})
