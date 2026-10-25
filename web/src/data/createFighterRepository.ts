import { createRepository } from '../core/createRepository'
import type { FighterId } from './fighter'
import type { FighterEntry } from './fighterEntry'
import { createJohnnyCage } from './fighters/createJohnnyCage'
import { createKitana } from './fighters/createKitana'
import { createLiuKang } from './fighters/createLiuKang'
import { createRaiden } from './fighters/createRaiden'
import { createScorpion } from './fighters/createScorpion'
import { createSubZero } from './fighters/createSubZero'

// Design: the registry of fighters, keyed by id and made with the same
// `createRepository` as every other object. Typing it as
// `Record<FighterId, ...>` makes the compiler require an entry for every id and
// reject unknown ones. Adding a fighter is one factory file, one new id in
// `FighterId`, and one line here; the order of the lines is the order of the
// roster.
export function createFighterRepository() {
  return createRepository<Record<FighterId, () => FighterEntry>>({
    scorpion: createScorpion,
    'sub-zero': createSubZero,
    'liu-kang': createLiuKang,
    'johnny-cage': createJohnnyCage,
    kitana: createKitana,
    raiden: createRaiden,
  })
}
