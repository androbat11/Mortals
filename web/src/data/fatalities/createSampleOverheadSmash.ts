import { createGame } from '../createGame'
import type { Fatality } from '../fatality'

// Clearly-labelled sample data, like the others: an original generic smash, not
// a real fatality, in a second placeholder game so there are two games to
// filter by.
export function createSampleOverheadSmash(): Fatality {
  return {
    id: 'sample-overhead-smash',
    name: 'Sample Overhead Smash',
    game: createGame('second-sample-game'),
    description:
      'Sample data: a short original smash finisher that shows a third kind of move, in a second sample game. It is replaced by real fatalities later.',
    tutorialSteps: [
      'Stand with your feet apart.',
      'Raise both arms high above your head.',
      'Bring both arms down hard while you squat.',
      'Hold the pose for a moment, then stand back up.',
    ],
    animationId: 'overhead-smash-finisher',
  }
}
