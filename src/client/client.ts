/* eslint-disable no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
import Edc, { TimeoutError, AckedErrorEvent, ClientHandlers } from 'edc-ws'
import readline from 'readline'
import prompt from 'prompt-sync'
import { GuessEvent, RightGuessEvent, WrongGuessEvent, StartGameEvent, UnknownEventErrorEvent } from '../events'

const port = 8085

const input = prompt()

const clientHandlers: ClientHandlers = {
    onEvent: async (cause, reply) => {
        console.log('---------------------------------------')
        if (cause.type === StartGameEvent.type) {
            const start = <StartGameEvent>cause

            console.log(start.details.title)
            console.log(start.details.instructions)
            console.log(`\nHere is your word bank: \n`)
            console.log(start.shared.notGuessed.join('\n'))
        } else if (cause.type === RightGuessEvent.type) {
            const right = <RightGuessEvent>cause
            const { attempts } = right.shared

            console.log(`Congrats you got it right in ${attempts} attempts!!!`)
            return
        } else if (cause.type === WrongGuessEvent.type) {
            const wrong = <WrongGuessEvent>cause

            console.log(`Sorry Wrong. You have made ${wrong.shared.attempts} attempts.  You have guessed the following`)
            console.log(wrong.shared.guessed.join('\n'))
            console.log('\n')
            console.log('This is what you have left in your wordbank')
            console.log(wrong.shared.notGuessed.join('\n'))
        } else {
            console.log(`Unknown event recieved: ${cause.type}`)
            reply(new UnknownEventErrorEvent(cause))
            return
        }

        console.log('\n')
        const guessStr = input('What is your is your next guess:  ')
        console.log('\n')

        const guess = new GuessEvent(guessStr).inherit(cause)

        reply(guess)
    },
    onError: async (cause) => {
        console.log(cause.details.message)
    },
    onAck: async () => {}
}

const client = new Edc.Client(`ws://localhost:${port}`, clientHandlers)
