import type { Move } from '../../../data/move'
import Tag from '../../atoms/Tag/Tag'
import InputSequence from '../../molecules/InputSequence/InputSequence'
import MovePreview from '../MovePreview/MovePreview'
import styles from './MoveCard.module.css'

type MoveCardProps = {
  move: Move
  active: boolean
  onPlay: (id: string) => void
  onStop: () => void
}

// Design: an organism, one fatality or brutality as the design's archive card:
// the preview slot, the name with its range or class, the brutality's trigger, the
// description, and the input bar. It renders the move it is given and reports Play
// and Close with the move's id, so it works for both kinds. The border and glow
// follow the kind (crimson, bronze) through `data-kind`.
function MoveCard({ move, active, onPlay, onStop }: MoveCardProps) {
  const headingId = `move-${move.id}`
  return (
    <article className={styles.card} data-kind={move.kind} aria-labelledby={headingId}>
      <MovePreview
        move={move}
        active={active}
        onPlay={() => onPlay(move.id)}
        onStop={onStop}
      />
      <div className={styles.body}>
        <header className={styles.header}>
          <h3 id={headingId} className={styles.name}>
            {move.name}
          </h3>
          <Tag tone={move.kind}>{move.category}</Tag>
          {move.unverified && <Tag>Unverified</Tag>}
        </header>
        {move.trigger && (
          <p className={styles.trigger}>
            <strong>Trigger:</strong> {move.trigger}
          </p>
        )}
        <p className={styles.description}>{move.description}</p>
        <InputSequence steps={move.input} />
      </div>
    </article>
  )
}

export default MoveCard
