/* eslint-disable no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
import Edc, { BasicAuth, Event } from 'edc-ws'
import {
    GuessEvent,
    UnknownEventErrorEvent,
    RightGuessEvent,
    WrongGuessEvent,
    Guesses,
    StartGameEvent
} from '../events'

const port = 8085

const correct = 'fox'

const wordBank = ['elephant', 'zebra', 'fish', correct, 'dog', 'cat', 'tiger', 'wombat', 'deer']

const server = new Edc.Server(port)

server.onError = async (cause) => {
    console.log(cause.details.message)
}
server.onConnect = async (connection, auth: BasicAuth, arg3, that) => {
    const instructions = `The goal of the game is to guess what word I am thinking of from the word bank.  Good luck!`

    const start = new StartGameEvent('The Guessing Game', instructions, wordBank)

    that.sendEvent(connection, start)
}

server.onEvent(GuessEvent.type, async (cause, ws, reply) => {
    const messageUser = <GuessEvent>cause
    const { guess } = messageUser.details

    let event: Event<void, Guesses>
    if (guess === correct) {
        event = new RightGuessEvent().inherit(cause) // inherit() is key! it builds the "chain"
    } else {
        const wrong = new WrongGuessEvent().inherit(cause) // inherit() is key! it builds the "chain"
        wrong.removeGuess(guess)
        wrong.addAttempt()
        event = wrong
    }

    reply(event)
})
