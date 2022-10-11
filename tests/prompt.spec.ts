/*
 * @poppinss/prompts
 *
 * (c) Poppinss
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { EmitterPrompt } from '../src/emitter.js'

test.group('Prompts | input', () => {
  test('test input prompt', async ({ assert }) => {
    const prompt = new EmitterPrompt()

    prompt.on('prompt', (question) => {
      assert.equal(question.name, 'prompt')
      question.answer('virk')
    })

    const username = await prompt.ask("What's your username?")
    assert.equal(username, 'virk')
  })

  test('test input prompt validation', async ({ assert }) => {
    assert.plan(2)

    const prompt = new EmitterPrompt()
    prompt.on('prompt', (question) => {
      question.answer('')
    })

    prompt.on('prompt:error', (message) => {
      assert.equal(message, 'Enter the value')
    })

    const username = await prompt.ask("What's your username?", {
      name: 'username',
      validate(value) {
        return !!value
      },
    })

    assert.equal(username, '')
  })

  test('invoke result function before returning the result', async ({ assert }) => {
    const prompt = new EmitterPrompt()

    prompt.on('prompt', (question) => {
      question.answer('virk')
    })

    const username = await prompt.ask("What's your username?", {
      name: 'username',
      result(answer) {
        return answer.toUpperCase()
      },
    })

    assert.equal(username, 'VIRK')
  })
})

test.group('Prompts | choice', () => {
  test('test choice prompt', async ({ assert }) => {
    const prompt = new EmitterPrompt()

    prompt.on('prompt', (question) => {
      question.select(0)
    })

    const client = await prompt.choice('Select the installation client', ['npm', 'yarn'])
    assert.equal(client, 'npm')
  })

  test('test choice prompt validation', async ({ assert }) => {
    assert.plan(2)

    const prompt = new EmitterPrompt()
    prompt.on('prompt', (question) => {
      question.answer('')
    })

    prompt.on('prompt:error', (message) => {
      assert.equal(message, 'Enter the value')
    })

    const client = await prompt.choice('Select the installation client', ['npm', 'yarn'], {
      validate(answer) {
        return !!answer
      },
    })

    assert.equal(client, '')
  })

  test('invoke result function before returning the value', async ({ assert }) => {
    const prompt = new EmitterPrompt()

    prompt.on('prompt', (question) => {
      question.select(0)
    })

    const client = await prompt.choice('Select the installation client', ['npm', 'yarn'], {
      result(answer) {
        return answer.toUpperCase()
      },
    })

    assert.equal(client, 'NPM')
  })
})

test.group('Prompts | multiple', () => {
  test('test multiple prompt', async ({ assert }) => {
    const prompt = new EmitterPrompt()

    prompt.on('prompt', (question) => {
      question.select(0)
    })

    const clients = await prompt.multiple('Select the installation client', ['npm', 'yarn'])
    assert.deepEqual(clients, ['npm'])
  })

  test('test multiple prompt validation', async ({ assert }) => {
    assert.plan(2)

    const prompt = new EmitterPrompt()
    prompt.on('prompt', (question) => {
      question.answer([])
    })

    prompt.on('prompt:error', (message) => {
      assert.equal(message, 'Enter the value')
    })

    const client = await prompt.multiple('Select the installation client', ['npm', 'yarn'], {
      validate(answer) {
        return answer.length > 0
      },
    })

    assert.deepEqual(client, [])
  })

  test('invoke result function before returning the value', async ({ assert }) => {
    const prompt = new EmitterPrompt()

    prompt.on('prompt', (question) => {
      question.select(0)
    })

    const clients = await prompt.multiple('Select the installation client', ['npm', 'yarn'], {
      result(choices) {
        return choices.map((one) => one.toUpperCase())
      },
    })

    assert.deepEqual(clients, ['NPM'])
  })
})

test.group('Prompts | toggle', () => {
  test('test toggle prompt', async ({ assert }) => {
    const prompt = new EmitterPrompt()
    prompt.on('prompt', (question) => {
      question.accept()
    })

    const deleteFile = await prompt.toggle('Delete the file?', ['Yep', 'Nope'])
    assert.isTrue(deleteFile)
  })

  test('test toggle prompt validation', async ({ assert }) => {
    assert.plan(2)
    const prompt = new EmitterPrompt()

    prompt.on('prompt', (question) => {
      question.decline()
    })

    prompt.on('prompt:error', (message) => {
      assert.equal(message, 'Enter the value')
    })

    const deleteFile = await prompt.toggle('Delete the file?', ['Yep', 'Nope'], {
      validate(answer) {
        return answer === true
      },
    })

    assert.isFalse(deleteFile)
  })

  test('invoke result function before returning the value', async ({ assert }) => {
    const prompt = new EmitterPrompt()
    prompt.on('prompt', (question) => {
      question.accept()
    })

    const deleteFile = await prompt.toggle('Delete the file?', ['Yep', 'Nope'], {
      result(answer) {
        return answer ? 'Y' : 'n'
      },
    })
    assert.equal(deleteFile as unknown as string, 'Y')
  })
})

test.group('Prompts | confirm', () => {
  test('test confirm prompt', async ({ assert }) => {
    const prompt = new EmitterPrompt()
    prompt.on('prompt', (question) => {
      question.accept()
    })

    const deleteFile = await prompt.confirm('Delete the file?')
    assert.isTrue(deleteFile)
  })

  test('test confirm prompt validation', async ({ assert }) => {
    assert.plan(2)
    const prompt = new EmitterPrompt()

    prompt.on('prompt', (question) => {
      question.decline()
    })

    prompt.on('prompt:error', (message) => {
      assert.equal(message, 'Enter the value')
    })

    const deleteFile = await prompt.confirm('Delete the file?', {
      validate(answer) {
        return answer === true
      },
    })

    assert.isFalse(deleteFile)
  })

  test('invoke result function before returning the value', async ({ assert }) => {
    const prompt = new EmitterPrompt()
    prompt.on('prompt', (question) => {
      question.accept()
    })

    const deleteFile = await prompt.confirm('Delete the file?', {
      result(answer) {
        return answer ? 'Yes' : 'No'
      },
    })
    assert.equal(deleteFile as unknown as string, 'Yes')
  })
})

test.group('Prompts | secure', () => {
  test('test secure prompt', async ({ assert }) => {
    const prompt = new EmitterPrompt()
    prompt.on('prompt', (question) => {
      question.answer('foo')
    })

    const password = await prompt.secure('Enter password')
    assert.equal(password, 'foo')
  })

  test('test secure prompt validation', async ({ assert }) => {
    assert.plan(2)
    const prompt = new EmitterPrompt()

    prompt.on('prompt', (question) => {
      question.answer('')
    })

    prompt.on('prompt:error', (message) => {
      assert.equal(message, 'Enter the value')
    })

    const password = await prompt.secure('Enter password', {
      validate(answer) {
        return !!answer
      },
    })

    assert.equal(password, '')
  })

  test('invoke result function before returning the value', async ({ assert }) => {
    const prompt = new EmitterPrompt()
    prompt.on('prompt', (question) => {
      question.answer('foo')
    })

    const password = await prompt.secure('Enter password', {
      result(answer) {
        return answer.toUpperCase()
      },
    })
    assert.equal(password, 'FOO')
  })
})

test.group('Prompts | autocomplete', () => {
  test('select value', async ({ assert }) => {
    const prompt = new EmitterPrompt()

    prompt.on('prompt', (question) => {
      question.select(0)
    })

    const clients = await prompt.autocomplete('Select the installation client', ['npm', 'yarn'])
    assert.deepEqual(clients, 'npm')
  })

  test('allow multiple select', async ({ assert }) => {
    const prompt = new EmitterPrompt()

    prompt.on('prompt', (question) => {
      question.multiSelect([0, 1])
    })

    const clients = await prompt.autocomplete('Select the installation client', ['npm', 'yarn'], {
      multiple: true,
    })
    assert.deepEqual(clients, ['npm', 'yarn'])
  })

  test('validate input', async ({ assert }) => {
    assert.plan(2)

    const prompt = new EmitterPrompt()
    prompt.on('prompt', (question) => {
      question.answer('')
    })

    prompt.on('prompt:error', (message) => {
      assert.equal(message, 'Enter the value')
    })

    const client = await prompt.autocomplete('Select the installation client', ['npm', 'yarn'], {
      multiple: false,
      validate(answer) {
        return !!answer
      },
    })

    assert.deepEqual(client, '')
  })

  test('validate input for multiple selections', async ({ assert }) => {
    assert.plan(2)

    const prompt = new EmitterPrompt()
    prompt.on('prompt', (question) => {
      question.answer([])
    })

    prompt.on('prompt:error', (message) => {
      assert.equal(message, 'Enter the value')
    })

    const client = await prompt.autocomplete('Select the installation client', ['npm', 'yarn'], {
      multiple: true,
      validate(answer) {
        return answer.length > 0
      },
    })

    assert.deepEqual(client, [])
  })

  test('invoke result function before returning the value', async ({ assert }) => {
    const prompt = new EmitterPrompt()

    prompt.on('prompt', (question) => {
      question.select(0)
    })

    const clients = await prompt.autocomplete('Select the installation client', ['npm', 'yarn'], {
      result(choice) {
        return choice.toUpperCase()
      },
    })

    assert.deepEqual(clients, 'NPM')
  })

  test('invoke result function for multiple selection', async ({ assert }) => {
    const prompt = new EmitterPrompt()

    prompt.on('prompt', (question) => {
      question.select(0)
    })

    const clients = await prompt.autocomplete('Select the installation client', ['npm', 'yarn'], {
      multiple: true,
      result(choices) {
        return choices.map((choice) => choice.toUpperCase())
      },
    })

    assert.deepEqual(clients, ['NPM'])
  })
})

test.group('Prompts | enum', () => {
  test('test enum prompt', async ({ assert }) => {
    const prompt = new EmitterPrompt()

    prompt.on('prompt', (question) => {
      assert.equal(question.name, 'prompt')
      question.answer('virk,nikk')
    })

    const username = await prompt.enum("What's your username?")
    assert.deepEqual(username, ['virk', 'nikk'])
  })

  test('run validation', async ({ assert }) => {
    assert.plan(2)

    const prompt = new EmitterPrompt()
    prompt.on('prompt', (question) => {
      question.answer('')
    })

    prompt.on('prompt:error', (message) => {
      assert.equal(message, 'Enter the value')
    })

    const username = await prompt.enum("What's your username?", {
      name: 'username',
      validate(value) {
        return value.length > 0
      },
    })

    assert.deepEqual(username, [])
  })

  test('invoke result function before returning the result', async ({ assert }) => {
    const prompt = new EmitterPrompt()

    prompt.on('prompt', (question) => {
      question.answer('virk')
    })

    const username = await prompt.enum("What's your username?", {
      name: 'username',
      result(answer) {
        return answer.map((val) => val.toUpperCase())
      },
    })

    assert.deepEqual(username, ['VIRK'])
  })
})
