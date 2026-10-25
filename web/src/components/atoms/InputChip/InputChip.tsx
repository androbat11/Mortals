import type { InputStep } from '../../../data/input'
import { buttonLabel } from '../../../data/buttonLabel'
import styles from './InputChip.module.css'

const arrows = { up: '↑', down: '↓', left: '←', right: '→' }
const names = { up: 'Up', down: 'Down', left: 'Left', right: 'Right' }

type InputChipProps = {
  step: InputStep
}

// Design: an atom, one step of an input sequence. Directions and buttons are
// square chips, like the design's d-pad and face-button glyphs; a label ("+",
// "THEN", "AMPLIFY (R1/RB)") is plain text between them. The glyph is hidden from
// screen readers and replaced by a word, because they read "↓" poorly.
function InputChip({ step }: InputChipProps) {
  if (step.type === 'label') {
    return <span className={styles.label}>{step.text}</span>
  }
  if (step.type === 'direction') {
    return (
      <span className={styles.chip} role="img" aria-label={names[step.direction]}>
        {arrows[step.direction]}
      </span>
    )
  }
  return (
    <span
      className={styles.chip}
      data-button={step.button}
      role="img"
      aria-label={`Button ${step.button}, ${buttonLabel(step.button)}`}
    >
      {step.button}
    </span>
  )
}

export default InputChip
