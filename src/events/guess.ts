import { Event } from 'edc-ws'
import { Guesses } from '.'

export default class GuessEvent extends Event<{ guess: string }, Guesses> {
    details: {
        guess: string
    }

    shared: Guesses

    static type: string = `guess`

    constructor(guess: string) {
        super(GuessEvent.type)

        this.details = {
            guess
        }

        this.shared = { guessed: [], notGuessed: [], attempts: 0 }
    }
}
