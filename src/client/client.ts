/* eslint-disable no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
import Edc from 'edc-ws'
import prompt from 'prompt-sync'
import { GuessEvent, RightGuessEvent, WrongGuessEvent, StartGameEvent } from '../events'

const port = 8085

const input = prompt()

const client = new Edc.Client(`ws://localhost:${port}`)

client.onError = async (cause) => {
    console.log(cause.details.message)
}

client.onEvent(StartGameEvent.type, async (cause, reply) => {
    console.log('---------------------------------------')
    const start = <StartGameEvent>cause

    console.log(start.details.title)
    console.log(start.details.instructions)
    console.log(`\nHere is your word bank: \n`)
    console.log(start.shared.notGuessed.join('\n'))

    console.log('\n')
    const guessStr = input('What is your is your next guess:  ')
    console.log('\n')

    const guess = new GuessEvent(guessStr).inherit(cause)

    reply(guess)
})

client.onEvent(WrongGuessEvent.type, async (cause, reply) => {
    console.log('---------------------------------------')
    const wrong = <WrongGuessEvent>cause

    console.log(`Sorry Wrong. You have made ${wrong.shared.attempts} attempts.  You have guessed the following`)
    console.log(wrong.shared.guessed.join('\n'))
    console.log('\n')
    console.log('This is what you have left in your wordbank')
    console.log(wrong.shared.notGuessed.join('\n'))

    console.log('\n')
    const guessStr = input('What is your is your next guess:  ')
    console.log('\n')

    const guess = new GuessEvent(guessStr).inherit(cause)

    reply(guess)
})

client.onEvent(RightGuessEvent.type, async (cause, reply) => {
    console.log('---------------------------------------')
    const right = <RightGuessEvent>cause
    const { attempts } = right.shared

    console.log(`Congrats you got it right in ${attempts} attempts!!!`)
})
