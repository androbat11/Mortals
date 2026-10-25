import Button from '../../atoms/Button/Button'
import type { MoveKind } from '../../../data/move'
import styles from './PreviewPoster.module.css'

type PreviewPosterProps = {
  moveName: string
  kind: MoveKind
  onPlay: () => void
}

// Design: a molecule, what the preview slot shows before the scene is started: a
// dark poster with drifting embers and a slow scanline (the design's video
// placeholder, made with CSS), and the play button. Nothing is downloaded until
// Play is pressed, so a page of many cards stays light. The embers and the
// scanline are decoration (hidden from assistive technology) and stop for users
// who ask for reduced motion.
function PreviewPoster({ moveName, kind, onPlay }: PreviewPosterProps) {
  return (
    <div className={styles.poster} data-kind={kind}>
      <span className={styles.embers} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </span>
      <span className={styles.scanline} aria-hidden="true" />
      <div className={styles.action}>
        <Button variant={kind === 'fatality' ? 'primary' : 'secondary'} onClick={onPlay}>
          {`Play ${moveName}`}
        </Button>
      </div>
    </div>
  )
}

export default PreviewPoster
