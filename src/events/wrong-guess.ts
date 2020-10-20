import { Event } from 'edc-ws'
import { Guesses } from '.'

export default class WrongGuessEvent extends Event<void, Guesses> {
    details: void

    shared: Guesses

    static type: string = `wrong-guess`

    constructor() {
        super(WrongGuessEvent.type)

        this.shared = { guessed: [], notGuessed: [], attempts: 0 }
    }

    addAttempt() {
        this.shared.attempts += 1
    }

    removeGuess(guess: string) {
        this.shared.guessed.push(guess)

        if (this.shared.notGuessed.includes(guess)) {
            const index = this.shared.notGuessed.indexOf(guess)
            this.shared.notGuessed.splice(index, 1)
        }
    }
}
