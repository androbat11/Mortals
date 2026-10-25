import { createMove } from '../createMove'
import type { FighterEntry } from '../fighterEntry'

// Content taken from the design (the Stitch project), not checked against the
// games: every move is marked unverified.
export function createScorpion(): FighterEntry {
  return {
    fighter: {
      id: 'scorpion',
      name: 'Scorpion',
      title: 'Shirai Ryu Grandmaster',
      alias: 'Hanzo Hasashi',
      realm: 'Netherrealm',
      facts: [
        { label: 'Primary element', value: 'Hellfire & Kunai' },
        { label: 'Difficulty', value: 'Tournament Standard' },
      ],
      summary:
        '"You\'re Next" & "To Hell and Back": relentless hellfire teleportation and chained spear mutilation.',
    },
    moves: [
      createMove({
        kind: 'fatality',
        fighter: 'scorpion',
        name: "You're Next",
        gameTag: 'MK11 Ultimate',
        games: ['mk11'],
        category: 'Far',
        description:
          'Scorpion spears violently through the opponent\'s torso, front-kicks their head into the air, and cleaves it with his flaming katana while the decapitated body burns.',
        input: ['↓', '↓', '↓', '1'],
        animationId: 'overhead-smash-finisher',
      }),
      createMove({
        kind: 'fatality',
        fighter: 'scorpion',
        name: 'To Hell and Back',
        gameTag: 'MK11 Ultimate',
        games: ['mk11'],
        category: 'Mid',
        description:
          'Drags the victim through molten chains into an open Netherrealm portal, dropping their burning skeleton onto razor stone pillars before cleaving the remains.',
        input: ['↓', '↓', '←', '4'],
        animationId: 'sweep-kick-finisher',
      }),
      createMove({
        kind: 'fatality',
        fighter: 'scorpion',
        name: 'Eye Candy',
        gameTag: 'Mortal Kombat 1',
        games: ['mk1'],
        category: 'Close',
        description:
          'Classic brutal spear grapple through the eye socket into skeletal incineration, culminating in an explosive skull fracture as hellfire consumes the battlefield.',
        input: ['←', '→', '←', '2'],
        animationId: 'uppercut-finisher',
      }),
      createMove({
        kind: 'brutality',
        fighter: 'scorpion',
        name: 'Soul Burn',
        gameTag: 'MK11 Ultimate',
        games: ['mk11'],
        category: 'Combo Finisher',
        description:
          "Opponent's flesh instantly incinerates into smoldering ash upon impact, leaving their charred skeleton kneeling in agony.",
        trigger:
          'Special Move: Hell Flame (Amplified). Final blow must connect directly from Hell Flame with meter burn.',
        input: ['↓', '←', '2', '+', 'AMPLIFY (R1/RB)'],
        animationId: 'uppercut-finisher',
      }),
      createMove({
        kind: 'brutality',
        fighter: 'scorpion',
        name: 'Beheaded',
        gameTag: 'MK11 & MK1',
        games: ['mk11', 'mk1'],
        category: 'Projectile',
        description:
          "Scorpion's rope spear pierces the neck with extreme tension, clean-shearing the head from the shoulders as the chain jerks backward.",
        trigger:
          'Spear Throw. Must hold [FORWARD] continuously during the spear impact frame until head detachment occurs.',
        input: ['←', '→', '1', '+', 'HOLD (→)'],
        animationId: 'sweep-kick-finisher',
      }),
      createMove({
        kind: 'brutality',
        fighter: 'scorpion',
        name: 'Spine Crack',
        gameTag: 'MK11',
        games: ['mk11'],
        category: 'Throw Execution',
        description:
          "Vicious high-velocity reverse suplex planting the opponent's cranium first into bedrock, audible spinal fracture echoing through the arena.",
        trigger:
          'Back Throw. Rapidly mash both punch inputs [1] and [2] a minimum of 4 times during the throw startup frames.',
        input: ['THROW (L1/LB)', '+', '1', '2', '(RAPID MASH)'],
        animationId: 'overhead-smash-finisher',
      }),
    ],
  }
}
