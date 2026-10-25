import { Suspense } from 'react'
import { usePlayback } from '../../../hooks/usePlayback'
import type { AnimationId } from '../../../three/animation/animationTypes'
import Button from '../../atoms/Button/Button'
import LoadingIndicator from '../../atoms/LoadingIndicator/LoadingIndicator'
import LazySceneCanvas from '../../organisms/SceneCanvas/LazySceneCanvas'
import PlaybackControls from '../PlaybackControls/PlaybackControls'
import styles from './PreviewStage.module.css'

type PreviewStageProps = {
  moveName: string
  animationId: AnimationId
  onClose: () => void
}

// Design: a molecule, the running preview: the lazy 3D scene with pause, replay,
// and close. Its own playback control is created when it mounts, so each preview
// starts from the beginning, and unmounting it (closing, or starting another card)
// cleans the scene up. `touch-action: pan-y` on the canvas lets a finger scroll the
// page instead of being captured by the orbit controls.
function PreviewStage({ moveName, animationId, onClose }: PreviewStageProps) {
  const { playback, playing, togglePlaying, replay } = usePlayback()

  return (
    <div className={styles.stage}>
      <div className={styles.scene}>
        <Suspense fallback={<LoadingIndicator>Loading the 3D view…</LoadingIndicator>}>
          <LazySceneCanvas
            label={`Animation of ${moveName}: a low-poly fighter performing the move`}
            animationId={animationId}
            playback={playback}
          />
        </Suspense>
      </div>
      <div className={styles.controls}>
        <PlaybackControls playing={playing} onTogglePlay={togglePlaying} onReplay={replay} />
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  )
}

export default PreviewStage
