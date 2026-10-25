import type { AnimationId } from '../three/animation/animationTypes'
import type { FighterId } from './fighter'
import type { GameId } from './game'
import type { InputStep } from './input'

export type MoveKind = 'fatality' | 'brutality'

// Design: type-first. A move (a fatality or a brutality) is plain data: what it is
// called, where it comes from, what it does, how to perform it, and which
// animation previews it. `category` is the range for a fatality ("Close", "Mid",
// "Far") and the class for a brutality ("Combo Finisher"); `trigger` is the
// condition a brutality needs. The content comes from the design and has not been
// checked against the games, so `unverified` is true until it is.
export type Move = {
  id: string
  kind: MoveKind
  fighter: FighterId
  name: string
  // The tag shown on the card ("MK11 Ultimate"), and the games it filters under.
  gameTag: string
  games: GameId[]
  category: string
  description: string
  trigger: string | null
  input: InputStep[]
  animationId: AnimationId
  unverified: boolean
}
