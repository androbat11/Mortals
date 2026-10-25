import { createMove } from '../createMove'
import type { FighterEntry } from '../fighterEntry'

// Content taken from the design (the Stitch project), not checked against the
// games: every move is marked unverified.
export function createSubZero(): FighterEntry {
  return {
    fighter: {
      id: 'sub-zero',
      name: 'Sub-Zero',
      title: 'Lin Kuei Grandmaster',
      alias: 'Kuai Liang',
      realm: 'Earthrealm',
      facts: [
        { label: 'Primary element', value: 'Cryomancy & Ice Kori' },
        { label: 'Execution type', value: 'Flash-Freeze Decapitation' },
      ],
      summary:
        '"Ice-Cutioner" & "Frozen in Time": cryomancy shattering bones into crystalline blood shards.',
    },
    moves: [
      createMove({
        kind: 'fatality',
        fighter: 'sub-zero',
        name: 'Ice-Cutioner',
        gameTag: 'MK11 Ultimate',
        games: ['mk11'],
        category: 'Mid',
        description:
          "Sub-Zero flash-freezes the opponent's torso into an ice block, manifests a giant double-headed frost battleaxe, and cleanly severs their upper body with a crushing downward swing.",
        input: ['←', '→', '←', '1'],
        animationId: 'sweep-kick-finisher',
      }),
      createMove({
        kind: 'fatality',
        fighter: 'sub-zero',
        name: 'Frozen in Time',
        gameTag: 'MK11 Ultimate',
        games: ['mk11'],
        category: 'Close',
        description:
          'Slides behind the opponent, grabs the spine to extract their frozen nervous system, and delivers an icy punch that detonates the head into thousands of crystalline shards.',
        input: ['→', '↓', '→', '4'],
        animationId: 'uppercut-finisher',
      }),
      createMove({
        kind: 'brutality',
        fighter: 'sub-zero',
        name: 'Off With Your Head',
        gameTag: 'MK11',
        games: ['mk11'],
        category: 'Slide Execute',
        description:
          'Sub-Zero slides beneath the foe with dual ice daggers outstretched, shearing both lower legs completely off at the knees in a crystalline spray.',
        trigger:
          'Slide (Amplified). Must have successfully connected at least 3 Slide special moves throughout the match prior to the final strike.',
        input: ['←', '→', '3', '+', 'AMPLIFY'],
        animationId: 'sweep-kick-finisher',
      }),
      createMove({
        kind: 'brutality',
        fighter: 'sub-zero',
        name: 'Big Bounce',
        gameTag: 'MK11 & MK1',
        games: ['mk11', 'mk1'],
        category: 'Freeze Finisher',
        description:
          'A ferocious glacial uppercut shatters the deeply frozen torso into crystalline blood shards that cascade across the fighting stage.',
        trigger:
          'Ice Ball. Target must already be in a frozen state before connecting the final fatal uppercut strike (Down + 2).',
        input: ['↓', '→', '1', 'THEN', '↓', '2'],
        animationId: 'uppercut-finisher',
      }),
      createMove({
        kind: 'brutality',
        fighter: 'sub-zero',
        name: 'Seeing Double',
        gameTag: 'MKX / MK11',
        games: ['mkx', 'mk11'],
        category: 'Clone Dash',
        description:
          'Shoulder tackle rams the foe violently into an ice clone, converting the solid statue into a lethal jagged spike that impales their spine.',
        trigger:
          'Ice Clone / Shoulder Dash. Ice Clone must be active on screen for minimum 1.5 seconds prior to executing forward dash.',
        input: ['↓', '←', '1', '+', '←', '→', '3'],
        animationId: 'overhead-smash-finisher',
      }),
    ],
  }
}
