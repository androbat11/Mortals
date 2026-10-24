import SceneCanvas from '../components/organisms/SceneCanvas/SceneCanvas'

function ScenePage() {
  return (
    <main className="scene-page">
      <SceneCanvas label="Interactive 3D scene: a spinning cube on a ground plane. Drag to look around." />
    </main>
  )
}

export default ScenePage
