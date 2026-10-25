// Design: type-first. A move's input sequence is a list of steps: a direction, a
// button, or a plain label (for "+", "THEN", "HOLD (→)", "AMPLIFY (R1/RB)" and
// similar), so the screen can draw each kind of step differently and the data
// stays text a person can read.
export type Direction = 'up' | 'down' | 'left' | 'right'

// The four attack buttons of the arcade notation: 1 front punch, 2 back punch,
// 3 front kick, 4 back kick.
export type ButtonNumber = '1' | '2' | '3' | '4'

export type InputStep =
  | { type: 'direction'; direction: Direction }
  | { type: 'button'; button: ButtonNumber }
  | { type: 'label'; text: string }
