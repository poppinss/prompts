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

test.group('Prompts | group', () => {
  test('chain prompts and pass accumulated results', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Project name').replyWith('my-app')
    prompt.trap('Database password').replyWith('secret')

    const config = await prompt.group({
      name: () => prompt.ask('Project name'),
      password: () => prompt.secure('Database password'),
    })

    assert.equal(config.name, 'my-app')
    assert.equal(config.password, 'secret')
  })

  test('pass results from prior prompts to subsequent ones', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Project name').replyWith('my-app')
    prompt.trap('Confirm name').accept()

    let receivedKeys: string[] = []

    const config = await prompt.group({
      name: () => prompt.ask('Project name'),
      confirmed: ({ results }) => {
        receivedKeys = Object.keys(results)
        return prompt.confirm('Confirm name')
      },
    })

    assert.equal(config.name, 'my-app')
    assert.isTrue(config.confirmed)
    assert.deepEqual(receivedKeys, ['name'])
  })

  test('group with different prompt types', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Name').replyWith('my-app')
    prompt.trap('Use TypeScript?').accept()
    prompt.trap('Select framework').chooseOption(1)
    prompt.trap('Select features').chooseOptions([0, 1])

    const config = await prompt.group({
      name: () => prompt.ask('Name'),
      typescript: () => prompt.confirm('Use TypeScript?'),
      framework: () => prompt.choice('Select framework', ['React', 'Vue', 'Svelte']),
      features: () => prompt.multiple('Select features', ['Auth', 'Mail', 'Cache']),
    })

    assert.equal(config.name, 'my-app')
    assert.isTrue(config.typescript)
    assert.equal(config.framework, 'Vue')
    assert.deepEqual(config.features, ['Auth', 'Mail'])
  })
})
