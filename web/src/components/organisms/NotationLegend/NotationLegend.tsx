import { buttonLabel } from '../../../data/buttonLabel'
import type { ButtonNumber, InputStep } from '../../../data/input'
import InputChip from '../../atoms/InputChip/InputChip'
import styles from './NotationLegend.module.css'

const directions: InputStep[] = [
  { type: 'direction', direction: 'up' },
  { type: 'direction', direction: 'down' },
  { type: 'direction', direction: 'left' },
  { type: 'direction', direction: 'right' },
]
const buttons: ButtonNumber[] = ['1', '2', '3', '4']

// Design: an organism, the reference for the notation: what the arrows and the
// numbers 1 to 4 mean. It is built from the same chips the cards use, so the
// legend always looks like the moves it explains.
function NotationLegend() {
  return (
    <div className={styles.legend}>
      <div>
        <h3 className={styles.heading}>Directions</h3>
        <p className={styles.chips}>
          {directions.map((step, index) => (
            <InputChip key={index} step={step} />
          ))}
        </p>
        <p className={styles.note}>
          Up, down, back (left), and forward (right), facing your opponent from the
          left.
        </p>
      </div>
      <div>
        <h3 className={styles.heading}>Buttons</h3>
        <dl className={styles.buttons}>
          {buttons.map((button) => (
            <div key={button} className={styles.row}>
              <dt>
                <InputChip step={{ type: 'button', button }} />
              </dt>
              <dd>{buttonLabel(button)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

export default NotationLegend
