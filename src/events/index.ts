import GuessEvent from './guess'
import RightGuessEvent from './right-guess'
import WrongGuessEvent from './wrong-guess'
import StartGameEvent from './start-game'
import UnknownEventErrorEvent from './unknow-event'

export type Guesses = { guessed: string[]; notGuessed: string[]; attempts: number }

export { GuessEvent, RightGuessEvent, WrongGuessEvent, UnknownEventErrorEvent, StartGameEvent }
