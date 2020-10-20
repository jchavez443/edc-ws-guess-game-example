import { Event } from 'edc-ws'
import { Guesses } from '.'

export default class StartGameEvent extends Event<{ title: string; instructions: string }, Guesses> {
    details: {
        title: string
        instructions: string
    }

    shared: Guesses

    static type: string = `start-game`

    constructor(title: string, instructions: string, wordBank: string[]) {
        super(StartGameEvent.type)

        this.details = {
            title,
            instructions
        }

        this.shared = { guessed: [], notGuessed: wordBank, attempts: 0 }
    }
}
