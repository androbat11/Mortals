import { useEffect, useState, type RefObject } from 'react'
import type { AnimationId } from '../three/animation/animationTypes'
import type { PlaybackControl } from '../three/animation/playbackControl'
import { tryCreate } from '../three/core/tryCreate'
import { createSceneRepository } from './createSceneRepository'
import { readContainerSize } from './readContainerSize'
import { setupScene } from './setupScene'

type ThreeSceneState = {
  failed: boolean
}

// Design: separation of UI and logic. This hook only decides what to do and
// reports the result; building the scene is `setupScene`. The hook takes a ref
// instead of creating the container, so any component can host the scene. It
// reports `failed` so the component can show a message instead of the whole app
// going blank.
export function useThreeScene(
  containerRef: RefObject<HTMLDivElement | null>,
  animationId: AnimationId,
  playback: PlaybackControl,
): ThreeSceneState {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // `failed` follows the latest attempt: StrictMode and any re-run start the
    // effect again, and an earlier failure must not outlive a later success.
    setFailed(false)

    // Every object comes from the repository, never from an inline `new`.
    const repository = createSceneRepository()
    const { width, height } = readContainerSize(container)

    // The renderer is created first, alone, because it is the step that throws
    // when WebGL is unavailable or blocked. Failing here means nothing else
    // exists yet, so there is nothing to clean up.
    const renderer = tryCreate(() =>
      repository.create('renderer', width, height, window.devicePixelRatio),
    )
    const cleanup =
      renderer && tryCreate(() =>
        setupScene(repository, container, renderer, animationId, playback),
      )

    if (!cleanup) {
      setFailed(true)
      return
    }
    return cleanup
  }, [containerRef, animationId, playback])

  return { failed }
}
