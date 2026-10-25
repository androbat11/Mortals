import type { AnimationId } from '../three/animation/animationTypes'
import type { FighterId } from './fighter'
import type { GameId } from './game'
import type { Move, MoveKind } from './move'
import { toInputSteps } from './toInputSteps'

type MoveFields = {
  kind: MoveKind
  fighter: FighterId
  name: string
  gameTag: string
  games: GameId[]
  category: string
  description: string
  trigger?: string
  input: string[]
  animationId: AnimationId
}

// Builds a move from the short form the data is written in: the id comes from
// the fighter and the name, the input is written as text and turned into typed
// steps, and every move starts as unverified (the content has not been checked
// against the games).
export function createMove(fields: MoveFields): Move {
  const slug = fields.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return {
    ...fields,
    id: `${fields.fighter}-${fields.kind}-${slug}`,
    trigger: fields.trigger ?? null,
    input: toInputSteps(fields.input),
    unverified: true,
  }
}
