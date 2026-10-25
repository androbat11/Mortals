import { createMove } from '../createMove'
import type { FighterEntry } from '../fighterEntry'

// Content taken from the design (the Stitch project), not checked against the
// games: every move is marked unverified.
export function createRaiden(): FighterEntry {
  return {
    fighter: {
      id: 'raiden',
      name: 'Raiden',
      title: 'Protector of Earthrealm',
      alias: 'God of Thunder',
      realm: 'Earthrealm',
      facts: [{ label: 'Affinity', value: 'Divine Lightning' }],
      summary:
        '"Zapping Through" & "Overload": lightning-speed flight and a grab that overloads the opponent.',
    },
    moves: [
      createMove({
        kind: 'brutality',
        fighter: 'raiden',
        name: 'Zapping Through',
        gameTag: 'MK11 & MK1',
        games: ['mk11', 'mk1'],
        category: 'Torpedo Slam',
        description:
          'Raiden conducts lightning-speed horizontal flight, pushing the opponent directly through the stone arena wall until they disperse into ionized embers.',
        trigger:
          'Electric Fly (Amplified). Must travel from beyond full-screen distance and hold [FORWARD] during wall impact.',
        input: ['←', '→', '3', '+', 'AMPLIFY'],
        animationId: 'overhead-smash-finisher',
      }),
      createMove({
        kind: 'brutality',
        fighter: 'raiden',
        name: 'Overload',
        gameTag: 'MK11',
        games: ['mk11'],
        category: 'Command Grab',
        description:
          "Raiden firmly locks his hands around the opponent's temples and pumps 50,000 gigawatts through their brain until the head erupts in molten electricity.",
        trigger:
          'Lightning Strike. Must perform a "Mercy" round reset earlier in the match.',
        input: ['↓', '←', '2', '+', 'MERCY ACTIVE'],
        animationId: 'uppercut-finisher',
      }),
    ],
  }
}
