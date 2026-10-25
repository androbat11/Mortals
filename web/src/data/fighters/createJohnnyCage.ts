import { createMove } from '../createMove'
import type { FighterEntry } from '../fighterEntry'

// Content taken from the design (the Stitch project), not checked against the
// games: every move is marked unverified.
export function createJohnnyCage(): FighterEntry {
  return {
    fighter: {
      id: 'johnny-cage',
      name: 'Johnny Cage',
      title: 'Hollywood Champion',
      alias: 'Action Star',
      realm: 'Earthrealm',
      facts: [{ label: 'Heritage', value: 'Green Energy' }],
      summary:
        '"Who Did It?" & "Mr. Cage\'s Neighborhood": award-winning uppercut decapitations and movie-prop deaths.',
    },
    moves: [
      createMove({
        kind: 'fatality',
        fighter: 'johnny-cage',
        name: 'Who Did It?',
        gameTag: 'MK11 & MK1',
        games: ['mk11', 'mk1'],
        category: 'Close',
        description:
          'Vicious nut punch split dropping the opponent forward, followed by Johnny slamming a gold trophy cleanly through their skull and autographing the blood.',
        input: ['→', '↓', '→', '1'],
        animationId: 'uppercut-finisher',
      }),
      createMove({
        kind: 'fatality',
        fighter: 'johnny-cage',
        name: "Mr. Cage's Neighborhood",
        gameTag: 'MK11 & MK1',
        games: ['mk11', 'mk1'],
        category: 'Mid',
        description:
          'Upper torso punch decapitation turned into a ventriloquist puppet routine before throwing the severed head straight at the camera screen.',
        input: ['→', '←', '↓', '2'],
        animationId: 'sweep-kick-finisher',
      }),
      createMove({
        kind: 'brutality',
        fighter: 'johnny-cage',
        name: 'Not Today',
        gameTag: 'MK11 / MK1',
        games: ['mk11', 'mk1'],
        category: 'Low Special',
        description:
          "Classic signature split Nut Punch delivering devastating blunt force, causing the opponent's entire pelvic section to detonate into skeletal fragments.",
        trigger:
          'Nut Punch (Amplified). Must be performed as a Kombo End string with Johnny Cage at under 30% health.',
        input: ['←', '↓', '3', '+', 'AMPLIFY'],
        animationId: 'sweep-kick-finisher',
      }),
      createMove({
        kind: 'brutality',
        fighter: 'johnny-cage',
        name: 'The Golden Globe',
        gameTag: 'MK11',
        games: ['mk11'],
        category: 'Throw Item',
        description:
          "Johnny whips out a solid 14-karat best actor statuette and hurls it straight through the opponent's ribcage, exiting cleanly out the back.",
        trigger:
          'Forward Throw. Must hold [UP] on the D-Pad throughout the entire throw sequence.',
        input: ['→', '+', 'THROW (L1/LB)', '+', 'HOLD (↑)'],
        animationId: 'overhead-smash-finisher',
      }),
    ],
  }
}
