/*
 * @poppinss/prompts
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import { EnquirerPrompt } from '../index'
const prompt = new EnquirerPrompt()

async function run () {
  const name = await prompt.ask('What is your name?', {
    default: 'Virk',
    validate: (value) => value ? true : 'Name is required to continue',
  })

  const password = await prompt.secure('Choose account password', {
    validate: (value) => value ? true : 'Password is required to continue',
  })

  const client = await prompt.choice('Select installation client', ['npm', 'yarn'], {
    validate: (value) => value ? true : 'Choose an installation client to continue',
  })

  const deps = await prompt.multiple('Select base dependencies', ['@adonisjs/core', '@adonisjs/redis'])
  console.log({ name, password, client, deps })
}

run().then(console.log).catch(console.error)
