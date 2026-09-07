/*
 * @poppinss/prompts
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { Prompt, errors } from '../../index.ts'

test.group('Prompts | cancellation', () => {
  test('cancel text prompt throws E_PROMPT_CANCELLED', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Enter name').cancel()

    try {
      await prompt.ask('Enter name')
      assert.fail('Should have thrown')
    } catch (error) {
      assert.instanceOf(error, errors.E_PROMPT_CANCELLED)
    }
  })

  test('cancel secure prompt throws E_PROMPT_CANCELLED', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Enter password').cancel()

    try {
      await prompt.secure('Enter password')
      assert.fail('Should have thrown')
    } catch (error) {
      assert.instanceOf(error, errors.E_PROMPT_CANCELLED)
    }
  })

  test('cancel confirm prompt throws E_PROMPT_CANCELLED', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Continue?').cancel()

    try {
      await prompt.confirm('Continue?')
      assert.fail('Should have thrown')
    } catch (error) {
      assert.instanceOf(error, errors.E_PROMPT_CANCELLED)
    }
  })

  test('cancel toggle prompt throws E_PROMPT_CANCELLED', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Delete files?').cancel()

    try {
      await prompt.toggle('Delete files?', ['Yes', 'No'])
      assert.fail('Should have thrown')
    } catch (error) {
      assert.instanceOf(error, errors.E_PROMPT_CANCELLED)
    }
  })

  test('cancel choice prompt throws E_PROMPT_CANCELLED', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Select client').cancel()

    try {
      await prompt.choice('Select client', ['npm', 'yarn'])
      assert.fail('Should have thrown')
    } catch (error) {
      assert.instanceOf(error, errors.E_PROMPT_CANCELLED)
    }
  })

  test('cancel multiple prompt throws E_PROMPT_CANCELLED', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Select features').cancel()

    try {
      await prompt.multiple('Select features', ['Auth', 'Mail'])
      assert.fail('Should have thrown')
    } catch (error) {
      assert.instanceOf(error, errors.E_PROMPT_CANCELLED)
    }
  })

  test('cancel autocomplete prompt throws E_PROMPT_CANCELLED', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Select state').cancel()

    try {
      await prompt.autocomplete('Select state', ['Punjab', 'Haryana'])
      assert.fail('Should have thrown')
    } catch (error) {
      assert.instanceOf(error, errors.E_PROMPT_CANCELLED)
    }
  })

  test('cancel list prompt throws E_PROMPT_CANCELLED', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Enter tags').cancel()

    try {
      await prompt.list('Enter tags')
      assert.fail('Should have thrown')
    } catch (error) {
      assert.instanceOf(error, errors.E_PROMPT_CANCELLED)
    }
  })

  test('cancel selectKey prompt throws E_PROMPT_CANCELLED', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Select env').cancel()

    try {
      await prompt.selectKey('Select env', [
        { name: 'p', message: 'Production' },
        { name: 's', message: 'Staging' },
      ])
      assert.fail('Should have thrown')
    } catch (error) {
      assert.instanceOf(error, errors.E_PROMPT_CANCELLED)
    }
  })

  test('cancel groupMultiselect prompt throws E_PROMPT_CANCELLED', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Select packages').cancel()

    try {
      await prompt.groupMultiselect('Select packages', {
        DB: [{ name: 'lucid', message: '@adonisjs/lucid' }],
      })
      assert.fail('Should have thrown')
    } catch (error) {
      assert.instanceOf(error, errors.E_PROMPT_CANCELLED)
    }
  })

  test('cancel path prompt throws E_PROMPT_CANCELLED', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Select path').cancel()

    try {
      await prompt.path('Select path')
      assert.fail('Should have thrown')
    } catch (error) {
      assert.instanceOf(error, errors.E_PROMPT_CANCELLED)
    }
  })

  test('cancel in group() propagates E_PROMPT_CANCELLED', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Name').replyWith('my-app')
    prompt.trap('Password').cancel()

    try {
      await prompt.group({
        name: () => prompt.ask('Name'),
        password: () => prompt.secure('Password'),
      })
      assert.fail('Should have thrown')
    } catch (error) {
      assert.instanceOf(error, errors.E_PROMPT_CANCELLED)
    }
  })

  test('E_PROMPT_CANCELLED has correct error code', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Enter name').cancel()

    try {
      await prompt.ask('Enter name')
      assert.fail('Should have thrown')
    } catch (error: any) {
      assert.instanceOf(error, errors.E_PROMPT_CANCELLED)
      assert.equal(error.code, 'E_PROMPT_CANCELLED')
    }
  })
})
