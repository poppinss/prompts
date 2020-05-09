/*
 * @poppinss/prompts
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import { Prompt } from '../index'
const prompt = new Prompt()

async function run () {
  const name = await prompt.ask('What is your name?', {
    name: 'name',
    async result (value) {
      return Number(value)
    },
  })

  const column = await prompt.autocomplete('Choose account password', [
    'text',
    'string',
    'integer',
    'increments',
  ], {
    multiple: true,
    default: 1,
  })

  const password = await prompt.secure('Choose account password', {
    name: 'password',
  })

  const client = await prompt.choice('Select installation client', [
    'npm',
    'yarn',
  ], {
    name: 'client',
    async validate () {
      return true
    },
  })

  const deps = await prompt.multiple('Select base dependencies', [
    {
      name: 'core',
      message: '@adonisjs/core',
    },
    {
      name: 'redis',
      message: '@adonisjs/redis',
    },
  ] as const, { name: 'deps' })

  console.log({ name, password, client, deps, column })
}

run().then(() => {}).catch(console.error)
