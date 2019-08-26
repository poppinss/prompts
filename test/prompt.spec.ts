/*
 * @poppinss/prompts
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import test from 'japa'
import { EmitterPrompt } from '../src/Emitter'

test.group('Prompts | input', () => {
  test('test input prompt', async (assert) => {
    const prompt = new EmitterPrompt()

    prompt.on('prompt', (prompt) => {
      prompt.answer('virk')
    })

    const username = await prompt.ask('What\'s your username?', {
      name: 'username',
    })

    assert.equal(username, 'virk')
  })

  test('test input prompt validation', async (assert) => {
    assert.plan(2)

    const prompt = new EmitterPrompt()
    prompt.on('prompt', (prompt) => {
      prompt.answer('')
    })

    prompt.on('prompt:error', (message) => {
      assert.equal(message, 'Enter the value')
    })

    const username = await prompt.ask('What\'s your username?', {
      name: 'username',
      validate (value) {
        return !!value
      },
    })

    assert.equal(username, '')
  })

  test('invoke result function before returning the result', async (assert) => {
    const prompt = new EmitterPrompt()

    prompt.on('prompt', (prompt) => {
      prompt.answer('virk')
    })

    const username = await prompt.ask('What\'s your username?', {
      name: 'username',
      result (answer) {
        return answer.toUpperCase()
      },
    })

    assert.equal(username, 'VIRK')
  })
})

test.group('Prompts | choice', () => {
  test('test choice prompt', async (assert) => {
    const prompt = new EmitterPrompt()

    prompt.on('prompt', (prompt) => {
      prompt.select(0)
    })

    const client = await prompt.choice('Select the installation client', ['npm', 'yarn'])
    assert.equal(client, 'npm')
  })

  test('test choice prompt validation', async (assert) => {
    assert.plan(2)

    const prompt = new EmitterPrompt()
    prompt.on('prompt', (prompt) => {
      prompt.answer('')
    })

    prompt.on('prompt:error', (message) => {
      assert.equal(message, 'Enter the value')
    })

    const client = await prompt.choice('Select the installation client', ['npm', 'yarn'], {
      validate (answer) {
        return !!answer
      },
    })

    assert.equal(client, '')
  })

  test('invoke result function before returning the value', async (assert) => {
    const prompt = new EmitterPrompt()

    prompt.on('prompt', (prompt) => {
      prompt.select(0)
    })

    const client = await prompt.choice('Select the installation client', ['npm', 'yarn'], {
      result (answer) {
        return answer.toUpperCase()
      },
    })

    assert.equal(client, 'NPM')
  })
})

test.group('Prompts | multiple', () => {
  test('test multiple prompt', async (assert) => {
    const prompt = new EmitterPrompt()

    prompt.on('prompt', (prompt) => {
      prompt.select(0)
    })

    const clients = await prompt.multiple('Select the installation client', ['npm', 'yarn'])
    assert.deepEqual(clients, ['npm'])
  })

  test('test multiple prompt validation', async (assert) => {
    assert.plan(2)

    const prompt = new EmitterPrompt()
    prompt.on('prompt', (prompt) => {
      prompt.answer([])
    })

    prompt.on('prompt:error', (message) => {
      assert.equal(message, 'Enter the value')
    })

    const client = await prompt.multiple('Select the installation client', ['npm', 'yarn'], {
      validate (answer) {
        return answer.length > 0
      },
    })

    assert.deepEqual(client, [])
  })

  test('invoke result function before returning the value', async (assert) => {
    const prompt = new EmitterPrompt()

    prompt.on('prompt', (prompt) => {
      prompt.select(0)
    })

    const clients = await prompt.multiple('Select the installation client', ['npm', 'yarn'], {
      result (choices) {
        return choices.map((one) => one.toUpperCase())
      },
    })

    assert.deepEqual(clients, ['NPM'])
  })
})

test.group('Prompts | toggle', () => {
  test('test toggle prompt', async (assert) => {
    const prompt = new EmitterPrompt()
    prompt.on('prompt', (prompt) => {
      prompt.accept()
    })

    const deleteFile = await prompt.toggle('Delete the file?', ['Yep', 'Nope'])
    assert.isTrue(deleteFile)
  })

  test('test toggle prompt validation', async (assert) => {
    assert.plan(2)
    const prompt = new EmitterPrompt()

    prompt.on('prompt', (prompt) => {
      prompt.decline()
    })

    prompt.on('prompt:error', (message) => {
      assert.equal(message, 'Enter the value')
    })

    const deleteFile = await prompt.toggle('Delete the file?', ['Yep', 'Nope'], {
      validate (answer) {
        return answer === true
      },
    })

    assert.isFalse(deleteFile)
  })

  test('invoke result function before returning the value', async (assert) => {
    const prompt = new EmitterPrompt()
    prompt.on('prompt', (prompt) => {
      prompt.accept()
    })

    const deleteFile = await prompt.toggle('Delete the file?', ['Yep', 'Nope'], {
      result (answer) {
        return answer ? 'Y' : 'n'
      },
    })
    assert.equal(deleteFile as unknown as string, 'Y')
  })
})

test.group('Prompts | confirm', () => {
  test('test confirm prompt', async (assert) => {
    const prompt = new EmitterPrompt()
    prompt.on('prompt', (prompt) => {
      prompt.accept()
    })

    const deleteFile = await prompt.confirm('Delete the file?')
    assert.isTrue(deleteFile)
  })

  test('test confirm prompt validation', async (assert) => {
    assert.plan(2)
    const prompt = new EmitterPrompt()

    prompt.on('prompt', (prompt) => {
      prompt.decline()
    })

    prompt.on('prompt:error', (message) => {
      assert.equal(message, 'Enter the value')
    })

    const deleteFile = await prompt.confirm('Delete the file?', {
      validate (answer) {
        return answer === true
      },
    })

    assert.isFalse(deleteFile)
  })

  test('invoke result function before returning the value', async (assert) => {
    const prompt = new EmitterPrompt()
    prompt.on('prompt', (prompt) => {
      prompt.accept()
    })

    const deleteFile = await prompt.confirm('Delete the file?', {
      result (answer) {
        return answer ? 'Yes' : 'No'
      },
    })
    assert.equal(deleteFile as unknown as string, 'Yes')
  })
})

test.group('Prompts | secure', () => {
  test('test secure prompt', async (assert) => {
    const prompt = new EmitterPrompt()
    prompt.on('prompt', (prompt) => {
      prompt.answer('foo')
    })

    const password = await prompt.secure('Enter password')
    assert.equal(password, 'foo')
  })

  test('test secure prompt validation', async (assert) => {
    assert.plan(2)
    const prompt = new EmitterPrompt()

    prompt.on('prompt', (prompt) => {
      prompt.answer('')
    })

    prompt.on('prompt:error', (message) => {
      assert.equal(message, 'Enter the value')
    })

    const password = await prompt.secure('Enter password', {
      validate (answer) {
        return !!answer
      },
    })

    assert.equal(password, '')
  })

  test('invoke result function before returning the value', async (assert) => {
    const prompt = new EmitterPrompt()
    prompt.on('prompt', (prompt) => {
      prompt.answer('foo')
    })

    const password = await prompt.secure('Enter password', {
      result (answer) {
        return answer.toUpperCase()
      },
    })
    assert.equal(password, 'FOO')
  })
})
