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

async function run() {
	const name = await prompt.ask('What is your name?', {
		name: 'name',
		hint: 'No special characters',
		async result(value) {
			return Number(value)
		},
		validate: (value) => !!value,
	})

	const tags = await prompt.enum('Define tags', {
		hint: 'Accepts comma separated values',
	})

	const password = await prompt.secure('Choose account password', {
		name: 'password',
	})

	const client = await prompt.choice('Select installation client', ['npm', 'yarn'], {
		name: 'client',
		hint: 'Will be used for installation',
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
			hint: 'Will be used for installation',
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
			hint: 'For KYC',
		}
	)

	console.log({ name, password, client, deps, tags, deleteFiles, state })
}

run()
	.then(() => {})
	.catch(console.error)
