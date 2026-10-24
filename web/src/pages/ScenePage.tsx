import SceneCanvas from '../components/organisms/SceneCanvas/SceneCanvas'

function ScenePage() {
  return (
    <main className="scene-page">
      <SceneCanvas
        label="A low-poly fighter repeating an uppercut on a dark ground plane"
        animationId="uppercut-finisher"
      />
    </main>
  )
}

export default ScenePage
