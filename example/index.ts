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
  })

  const password = await prompt.secure('Choose account password', {
    name: 'password',
  })

  const client = await prompt.choice('Select installation client', [
    'npm',
    'yarn',
  ], { name: 'client' })

  const deps = await prompt.multiple('Select base dependencies', [
    '@adonisjs/core',
    '@adonisjs/redis',
  ], { name: 'deps' })

  console.log({ name, password, client, deps })
}

run().then(() => {}).catch(console.error)
