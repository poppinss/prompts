/*
 * @poppinss/prompts
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Prompt, errors } from '../index.ts'

const prompt = new Prompt()

async function run() {
  // group: chain prompts with accumulated results
  const basics = await prompt.group({
    name: () =>
      prompt.ask(`What is your project name?`, {
        hint: 'my-awesome-app',
        default: 'my-app',
        validate: (value) =>
          !value || value.length < 2 ? 'Name must be at least 2 characters' : true,
      }),
    password: ({ results }) =>
      prompt.secure(`Database password for ${results.name}`, {
        mask: '*',
        validate: (value) =>
          !value || value.length < 4 ? 'Password must be at least 4 characters' : true,
      }),
  })

  // ask with result transform
  const port = await prompt.ask('Enter port number', {
    default: '3333',
    result: (value) => Number(value),
  })

  // confirm
  const useTypescript = await prompt.confirm('Use TypeScript?')

  // toggle with custom labels
  const deleteFiles = await prompt.toggle('Want to delete all files?', ['Absolutely', 'No way'])

  // list (comma-separated) with custom separator
  const tags = await prompt.list('Define tags', {
    hint: 'Comma separated values',
  })

  // choice (select) with default value, maxItems, and disabled option
  const client = await prompt.choice(
    'Select installation client',
    [
      { name: 'npm', message: 'npm' },
      { name: 'yarn', message: 'yarn' },
      { name: 'pnpm', message: 'pnpm (recommended)', hint: 'fast & efficient' },
      { name: 'bun', message: 'bun', disabled: true },
    ],
    { maxItems: 3, default: 'pnpm' }
  )

  // multiple (multiselect) with maxItems and default
  const deps = await prompt.multiple(
    'Select base dependencies',
    [
      { name: 'core', message: '@adonisjs/core' },
      { name: 'redis', message: '@adonisjs/redis' },
      { name: 'lucid', message: '@adonisjs/lucid' },
      { name: 'mail', message: '@adonisjs/mail' },
      { name: 'auth', message: '@adonisjs/auth' },
    ] as const,
    {
      maxItems: 3,
      default: ['core'],
      validate: (values) => (values.length === 0 ? 'Select at least one package' : true),
    }
  )

  // autocomplete (single)
  const timezone = await prompt.autocomplete('Select your timezone', [
    'UTC',
    'Europe/Paris',
    'Europe/London',
    'America/New_York',
    'America/Los_Angeles',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Australia/Sydney',
  ])

  // autocomplete (multiple)
  const multiStates = await prompt.autocomplete(
    'Select states to deploy to',
    ['Haryana', 'Punjab', 'Assam', 'Bihar', 'Manipur', 'Meghalaya'],
    { multiple: true, limit: 4 }
  )

  // selectKey
  const env = await prompt.selectKey('Select environment', [
    { name: 'p', message: 'Production', hint: 'deploy to prod' },
    { name: 's', message: 'Staging', hint: 'deploy to staging' },
    { name: 'd', message: 'Development', hint: 'local dev' },
  ])

  // groupMultiselect with selectableGroups
  const features = await prompt.groupMultiselect(
    'Select features to configure',
    {
      Database: [
        { name: 'postgres', message: 'PostgreSQL' },
        { name: 'redis', message: 'Redis' },
        { name: 'sqlite', message: 'SQLite' },
      ],
      Auth: [
        { name: 'session', message: 'Session-based auth' },
        { name: 'jwt', message: 'JWT tokens' },
        { name: 'social', message: 'Social auth (OAuth)' },
      ],
      Communication: [
        { name: 'mail', message: 'Email (SMTP)' },
        { name: 'ws', message: 'WebSockets' },
      ],
    },
    { selectableGroups: true }
  )

  // path with directory only
  const configDir = await prompt.path('Select config directory', {
    onlyDirectories: true,
  })

  // path for file
  const entrypoint = await prompt.path('Select entrypoint file')

  console.log({
    name: basics.name,
    password: basics.password,
    port,
    useTypescript,
    deleteFiles,
    tags,
    client,
    deps,
    timezone,
    multiStates,
    env,
    features,
    configDir,
    entrypoint,
  })
}

run().catch((error) => {
  if (error instanceof errors.E_PROMPT_CANCELLED === false) {
    process.exitCode = 1
    console.error(error)
  }
})
