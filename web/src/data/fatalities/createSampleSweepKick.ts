import type { Fatality } from '../fatality'

// Clearly-labelled sample data, like the first entry: an original generic kick,
// not a real fatality, in the same placeholder game. See `createSampleUppercut`
// for why nothing here claims to come from a real game.
export function createSampleSweepKick(): Fatality {
  return {
    id: 'sample-sweep-kick',
    name: 'Sample Sweep Kick',
    game: 'Sample game (placeholder)',
    description:
      'Sample data: a short original kick finisher that shows a second kind of move. It is replaced by real fatalities later.',
    tutorialSteps: [
      'Raise both hands in a guard.',
      'Wind your back leg behind you.',
      'Kick it forward and up in one fast motion.',
      'Hold the kick for a moment, then return to your stance.',
    ],
    animationId: 'sweep-kick-finisher',
  }
}
