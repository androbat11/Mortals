import type { Direction, InputStep } from './input'

function toDirection(token: string): Direction | null {
  const directions: Record<string, Direction> = {
    '↑': 'up',
    '↓': 'down',
    '←': 'left',
    '→': 'right',
  }
  return directions[token] ?? null
}

// Turns the way a move is written ('↓', '←', '2', '+', 'AMPLIFY (R1/RB)') into
// typed steps, so the data stays short to write and read. An arrow is a
// direction, 1 to 4 is a button, and anything else is a label.
export function toInputSteps(tokens: string[]): InputStep[] {
  return tokens.map((token): InputStep => {
    const direction = toDirection(token)
    if (direction) return { type: 'direction', direction }
    if (token === '1' || token === '2' || token === '3' || token === '4') {
      return { type: 'button', button: token }
    }
    return { type: 'label', text: token }
  })
}
