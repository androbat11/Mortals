import type { AnimationId } from '../three/animation/animationTypes'
import type { FrameUpdater } from '../three/animation/frameUpdater'
import type { PlaybackControl } from '../three/animation/playbackControl'
import type { SceneRepository } from './createSceneRepository'

// Design: building the scene's contents (the character, the ground, the lights,
// and the background and fog that frame them) is one job, separate from wiring
// the renderer, loop and cleanup. Keeping it here means everything in the scene
// is assembled in one place and `useThreeScene` stays thin. The repository is
// passed in (not created here) so a test can supply its own.
export function createSceneContents(
  repository: SceneRepository,
  aspect: number,
  animationId: AnimationId,
  playback: PlaybackControl,
) {
  const scene = repository.create('scene')
  scene.background = repository.create('background')
  scene.fog = repository.create('fog')
  const camera = repository.create('camera', aspect)
  const character = repository.create('character')

  scene.add(
    character.root,
    repository.create('ground'),
    repository.create('ambientLight'),
    repository.create('directionalLight'),
  )

  // Everything that changes over time is a frame updater, so the render loop
  // does not know what is in the scene. The animation is looked up by id and
  // played by a player that owns its time, and that player is one such updater.
  const animation = repository.create('animation', animationId)
  const updaters: FrameUpdater[] = [
    repository.create('animationPlayer', character, animation, playback),
  ]

  return { scene, camera, character, updaters }
}
