import { Line, Material, Mesh, Points, Texture, type Object3D } from 'three'

function disposeMaterial(material: Material) {
  // Textures are held as properties of the material (map, normalMap, ...) and
  // are not disposed by `material.dispose()`, so they are freed here too.
  Object.values(material).forEach((value) => {
    if (value instanceof Texture) value.dispose()
  })
  material.dispose()
}

// Design: WebGL memory is not garbage collected, so everything a scene created
// must be disposed by hand. This lives in `three/` (not in the React hook)
// because it is Three.js logic, and it is a function of its input, so it can be
// tested without WebGL. A mesh may hold one material or an array of them (the
// planned character will), and lines and points hold geometry too, so all of
// those cases are handled instead of only a single-material `Mesh`.
export function disposeScene(scene: Object3D) {
  scene.traverse((object) => {
    if (
      !(object instanceof Mesh || object instanceof Line || object instanceof Points)
    ) {
      return
    }
    object.geometry.dispose()
    const materials: Material[] = Array.isArray(object.material)
      ? object.material
      : [object.material]
    materials.forEach(disposeMaterial)
  })
}
