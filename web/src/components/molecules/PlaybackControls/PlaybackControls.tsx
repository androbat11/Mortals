import Button from '../../atoms/Button/Button'
import styles from './PlaybackControls.module.css'

type PlaybackControlsProps = {
  playing: boolean
  onTogglePlay: () => void
  onReplay: () => void
}

// Design: a molecule, the two playback buttons together. The first button names
// the action it will do (Pause while playing, Play while paused), which is
// clearer than a toggle with a state, and it renders only what it is given: the
// state and the handlers come from the `usePlayback` hook.
function PlaybackControls({
  playing,
  onTogglePlay,
  onReplay,
}: PlaybackControlsProps) {
  return (
    <div className={styles.controls} role="group" aria-label="Animation playback">
      <Button onClick={onTogglePlay}>{playing ? 'Pause' : 'Play'}</Button>
      <Button onClick={onReplay}>Replay</Button>
    </div>
  )
}

export default PlaybackControls
