import type { Fatality } from '../fatality'

// Design: this is clearly-labelled sample data, not a real Mortal Kombat
// fatality. The animation is a generic original uppercut, and real fatality
// names, games and button inputs cannot be verified or made up, so nothing here
// claims to come from a real game. It exists to prove the data pipeline; the
// real entries arrive with the MVP set. It is a function (not a constant) so no
// module-level data is shared and every lookup gets its own object.
export function createSampleUppercut(): Fatality {
  return {
    id: 'sample-uppercut',
    name: 'Sample Uppercut',
    game: 'Sample game (placeholder)',
    description:
      'Sample data: a short original uppercut finisher that shows how a fatality is described. It is replaced by real fatalities later.',
    tutorialSteps: [
      'Stand close to your opponent.',
      'Crouch slightly and pull your back hand behind you.',
      'Swing the back hand up in a fast uppercut.',
      'Hold the pose for a moment, then return to your stance.',
    ],
    animationId: 'uppercut-finisher',
  }
}
