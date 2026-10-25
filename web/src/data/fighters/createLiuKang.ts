import { createMove } from '../createMove'
import type { FighterEntry } from '../fighterEntry'

// Content taken from the design (the Stitch project), not checked against the
// games: every move is marked unverified.
export function createLiuKang(): FighterEntry {
  return {
    fighter: {
      id: 'liu-kang',
      name: 'Liu Kang',
      title: 'Architect of the New Era',
      alias: 'God of Fire',
      realm: 'Earthrealm',
      facts: [
        { label: 'Aura archetype', value: 'Twin Celestial Dragons' },
        { label: 'X-ray trauma', value: 'Internal Organ Rupture' },
      ],
      summary:
        '"Burn Out" & "One Inch Death Strike": unleashing the flaming dragon soul to annihilate adversaries.',
    },
    moves: [
      createMove({
        kind: 'fatality',
        fighter: 'liu-kang',
        name: 'Burn Out',
        gameTag: 'MK1 Ultimate',
        games: ['mk1'],
        category: 'Close',
        description:
          'Liu Kang summons twin Chinese fire dragons from the Netherrealm rift that bite the victim apart before carrying their flaming torso skyward.',
        input: ['↓', '→', '←', '3'],
        animationId: 'uppercut-finisher',
      }),
      createMove({
        kind: 'fatality',
        fighter: 'liu-kang',
        name: 'One Inch Death Strike',
        gameTag: 'MK1 Ultimate',
        games: ['mk1'],
        category: 'Mid',
        description:
          'Focused cosmic godburst strike penetrating the chest wall, shattering internal organs into dust in full slow-motion X-ray before releasing a sonic shockwave.',
        input: ['←', '↓', '←', '1'],
        animationId: 'sweep-kick-finisher',
      }),
    ],
  }
}
