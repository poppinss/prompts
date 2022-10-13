/*
 * @poppinss/prompts
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Prompt } from '../index.js'
import { colors } from '../src/colors.js'

const prompt = new Prompt()

async function run() {
  const name = await prompt.ask('What is your name?', {
    name: 'name',
    hint: 'No special characters',
    async result(value) {
      return Number(value)
    },
    validate: (value) => !!value,
  })

  const tags = await prompt.list('Define tags', {
    hint: 'Accepts comma separated values',
  })

  const password = await prompt.secure('Choose account password', {
    name: 'password',
  })

  const client = await prompt.choice('Select installation client', ['npm', 'yarn'], {
    name: 'client',
    format(value) {
      return value.toUpperCase()
    },
    async validate() {
      return true
    },
  })

  const deps = await prompt.multiple(
    'Select base dependencies',
    [
      {
        name: 'core',
        message: '@adonisjs/core',
      },
      {
        name: 'redis',
        message: '@adonisjs/redis',
      },
    ] as const,
    {
      name: 'deps',
      format(values) {
        if (Array.isArray(values)) {
          return values.map((value) => value.toUpperCase())
        }
        return values
      },
      validate: (choices) => choices.length > 0,
    }
  )

  const deleteFiles = await prompt.toggle('Want to delete all files?', ['Yes', 'No'], {
    hint: 'Cannot be undone',
  })

  const state = await prompt.autocomplete(
    'Select state',
    [
      'Haryana',
      'Punjab',
      'Assam',
      'Arunachal Pradesh',
      'Bihar',
      'Manipur',
      'Meghalaya',
      'Tamil Nadu',
      'Uttarakhand',
      'Uttar Pradesh',
    ],
    {
      multiple: true,
      footer() {
        return colors.dim('Scroll up and down to reveal more choices')
      },
      limit: 3,
      format(values) {
        if (Array.isArray(values)) {
          return values.map((value) => value.toUpperCase())
        }
        return values
      },
    }
  )

  console.log({ name, password, client, deps, tags, deleteFiles, state })
}

run().catch((error) => {
  console.error(error)
  if (!error.code || error.code !== 'E_PROMPT_CANCELLED') {
    process.exitCode = 1
  }
})
