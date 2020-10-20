import { Event } from 'edc-ws'
import { Guesses } from '.'

export default class RightGuessEvent extends Event<void, Guesses> {
    details: void

    shared: Guesses

    static type: string = `right-guess`

    constructor() {
        super(RightGuessEvent.type)

        this.shared = { guessed: [], notGuessed: [], attempts: 0 }
    }
}
