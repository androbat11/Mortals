import type { createSceneRepository } from './createSceneRepository'

type SceneRepository = ReturnType<typeof createSceneRepository>

// Design: building the scene's contents is one job, separate from wiring the
// renderer, loop and cleanup. Keeping it here means a later phase adds the
// character in one place and `useThreeScene` stays thin. The repository is
// passed in (not created here) so a test can supply its own.
export function createSceneContents(
  repository: SceneRepository,
  aspect: number,
) {
  const scene = repository.create('scene')
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
