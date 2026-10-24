import type { SceneRepository } from './createSceneRepository'

// Design: building the scene's contents (objects, lights, and the background
// and fog that frame them) is one job, separate from wiring the
// renderer, loop and cleanup. Keeping it here means a later phase adds the
// character in one place and `useThreeScene` stays thin. The repository is
// passed in (not created here) so a test can supply its own.
export function createSceneContents(
  repository: SceneRepository,
  aspect: number,
) {
  const scene = repository.create('scene')
  scene.background = repository.create('background')
  scene.fog = repository.create('fog')
  const camera = repository.create('camera', aspect)
  const cube = repository.create('cube')

  scene.add(
    cube,
    repository.create('ground'),
    repository.create('ambientLight'),
    repository.create('directionalLight'),
  )

  return { scene, camera, cube }
}
