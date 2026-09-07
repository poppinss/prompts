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

test.group('Prompts | selectKey', () => {
  test('trap selectKey prompt', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Select environment').chooseOption(0)

    const env = await prompt.selectKey('Select environment', [
      { name: 'p', message: 'Production' },
      { name: 's', message: 'Staging' },
      { name: 'd', message: 'Development' },
    ])

    assert.equal(env, 'p')
  })

  test('reply directly with option value', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Select environment').replyWith('s')

    const env = await prompt.selectKey('Select environment', [
      { name: 'p', message: 'Production' },
      { name: 's', message: 'Staging' },
    ])

    assert.equal(env, 's')
  })

  test('select first option when no input is provided', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Select environment')

    const env = await prompt.selectKey('Select environment', [
      { name: 'p', message: 'Production' },
      { name: 's', message: 'Staging' },
    ])

    assert.equal(env, 'p')
  })

  test('invoke result method to transform return value', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Select environment').chooseOption(1)

    const env = await prompt.selectKey(
      'Select environment',
      [
        { name: 'p', message: 'Production' },
        { name: 's', message: 'Staging' },
      ],
      {
        result(value) {
          return value.toUpperCase()
        },
      }
    )

    assert.equal(env, 'S')
  })
})
