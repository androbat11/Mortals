import type { Fighter } from './fighter'
import type { Move } from './move'

// A fighter together with their moves: the unit the data is written in, one file
// per fighter, so adding a fighter is adding one entry.
export type FighterEntry = {
  fighter: Fighter
  moves: Move[]
}
