import SceneCanvas from '../components/organisms/SceneCanvas/SceneCanvas'

// Design: pages only compose organisms and decide the layout. Using `main`
// gives the screen a semantic landmark. The page sets the size (the viewport),
// so `SceneCanvas` stays reusable at any size.
function ScenePage() {
  return (
    <main className="scene-page">
      <SceneCanvas />
    </main>
  )
}

export default ScenePage
