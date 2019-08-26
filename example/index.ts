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

  const toppings = await prompt.choice('Select toppings', [
    {
      name: 'Jalapenos',
      hint: '(Marinated in vinegar, will taste sour)',
    },
    {
      name: 'Lettuce',
      hint: '(Freshly picked from farms)',
    },
  ])

  console.log({ name, password, client, deps, toppings })
}

run().then(console.log).catch(console.error)
