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

test.group('Prompts | groupMultiselect', () => {
  test('trap groupMultiselect prompt', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Select packages').chooseOptions([0, 2])

    const packages = await prompt.groupMultiselect('Select packages', {
      Database: [
        { name: 'lucid', message: '@adonisjs/lucid' },
        { name: 'redis', message: '@adonisjs/redis' },
      ],
      Auth: [
        { name: 'auth', message: '@adonisjs/auth' },
        { name: 'bouncer', message: '@adonisjs/bouncer' },
      ],
    })

    assert.deepEqual(packages, ['lucid', 'auth'])
  })

  test('reply directly with values', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Select packages').replyWith(['lucid', 'auth'])

    const packages = await prompt.groupMultiselect('Select packages', {
      Database: [{ name: 'lucid', message: '@adonisjs/lucid' }],
      Auth: [{ name: 'auth', message: '@adonisjs/auth' }],
    })

    assert.deepEqual(packages, ['lucid', 'auth'])
  })

  test('select from different groups using indexes', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Select packages').chooseOptions([1, 3])

    const packages = await prompt.groupMultiselect('Select packages', {
      Database: [
        { name: 'lucid', message: '@adonisjs/lucid' },
        { name: 'redis', message: '@adonisjs/redis' },
      ],
      Auth: [
        { name: 'auth', message: '@adonisjs/auth' },
        { name: 'bouncer', message: '@adonisjs/bouncer' },
      ],
    })

    assert.deepEqual(packages, ['redis', 'bouncer'])
  })

  test('invoke result method to transform return value', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Select packages').chooseOptions([0])

    const packages = await prompt.groupMultiselect(
      'Select packages',
      {
        Database: [{ name: 'lucid', message: '@adonisjs/lucid' }],
      },
      {
        result(values) {
          return values.map((v) => v.toUpperCase())
        },
      }
    )

    assert.deepEqual(packages, ['LUCID'])
  })

  test('return empty array when no selection', async ({ assert }) => {
    const prompt = new Prompt()
    prompt.trap('Select packages').chooseOptions([])

    const packages = await prompt.groupMultiselect('Select packages', {
      Database: [{ name: 'lucid', message: '@adonisjs/lucid' }],
    })

    assert.deepEqual(packages, [])
  })
})
