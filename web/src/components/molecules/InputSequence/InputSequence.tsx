import type { InputStep } from '../../../data/input'
import InputChip from '../../atoms/InputChip/InputChip'
import styles from './InputSequence.module.css'

type InputSequenceProps = {
  steps: InputStep[]
}

// Design: a molecule, the dark inset bar of the design with a move's chips in
// order. It is a list, so a screen reader announces "list, 5 items" and reads each
// step in turn; the chips carry the spoken names. It wraps instead of scrolling,
// because a long sequence must stay readable on a phone.
function InputSequence({ steps }: InputSequenceProps) {
  return (
    <ol className={styles.bar} aria-label="Input sequence">
      {steps.map((step, index) => (
        <li key={index}>
          <InputChip step={step} />
        </li>
      ))}
    </ol>
  )
}

export default InputSequence
