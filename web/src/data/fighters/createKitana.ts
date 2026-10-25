import { createMove } from '../createMove'
import type { FighterEntry } from '../fighterEntry'

// Content taken from the design (the Stitch project), not checked against the
// games: every move is marked unverified.
export function createKitana(): FighterEntry {
  return {
    fighter: {
      id: 'kitana',
      name: 'Kitana',
      title: 'Princess of Edenia',
      alias: 'Edenian Royalty',
      realm: 'Outworld',
      facts: [{ label: 'Realm', value: 'Outworld' }],
      summary:
        '"Gore-Nado" & "Royal Execution": whirlwind lacerations and razor fan throat cuts performed with regal grace.',
    },
    moves: [
      createMove({
        kind: 'fatality',
        fighter: 'kitana',
        name: 'Gore-Nado',
        gameTag: 'MK11',
        games: ['mk11'],
        category: 'Mid',
        description:
          'Spins her razor-sharp steel folding fans to generate a high-speed vortex that lifts the opponent into the air, slicing limbs into symmetrical portions.',
        input: ['↓', '↓', '↓', '3'],
        animationId: 'sweep-kick-finisher',
      }),
      createMove({
        kind: 'fatality',
        fighter: 'kitana',
        name: 'Royal Execution',
        gameTag: 'MK11',
        games: ['mk11'],
        category: 'Close',
        description:
          "Flips over the opponent's guard, embedding both steel war fans into their jugular and kicking them away to decapitate in royal fashion.",
        input: ['←', '↓', '→', '1'],
        animationId: 'uppercut-finisher',
      }),
    ],
  }
}
