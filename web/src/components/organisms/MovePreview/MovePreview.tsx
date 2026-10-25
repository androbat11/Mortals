import type { Move } from '../../../data/move'
import CornerBrackets from '../../atoms/CornerBrackets/CornerBrackets'
import Tag from '../../atoms/Tag/Tag'
import PreviewPoster from '../../molecules/PreviewPoster/PreviewPoster'
import PreviewStage from '../../molecules/PreviewStage/PreviewStage'
import styles from './MovePreview.module.css'

type MovePreviewProps = {
  move: Move
  active: boolean
  onPlay: () => void
  onStop: () => void
}

// Design: an organism, the 16:9 slot the design reserves for a video, with the
// corner brackets and the game and range tags. We have no footage (and use no game
// footage), so the slot holds our own animation: a poster until the user presses
// Play, then the 3D scene. Which of the two shows is decided by the page, so only
// one slot runs a scene at a time. The ratio comes from CSS, so the slot resizes
// with its container and the scene with it.
function MovePreview({ move, active, onPlay, onStop }: MovePreviewProps) {
  return (
    <div className={styles.slot} data-kind={move.kind}>
      {active ? (
        <PreviewStage
          moveName={move.name}
          animationId={move.animationId}
          onClose={onStop}
        />
      ) : (
        <PreviewPoster moveName={move.name} kind={move.kind} onPlay={onPlay} />
      )}
      <CornerBrackets />
      <div className={styles.tags}>
        <Tag tone={move.kind}>{move.gameTag}</Tag>
      </div>
    </div>
  )
}

export default MovePreview
