import styles from './SceneLoadError.module.css'

// Shown instead of the scene when its code could not be downloaded (offline, or
// a failed request). It is a plain function component because the project allows
// no class components, which an error boundary would need; the failed import is
// caught where the scene is loaded instead. The text on the page still reads.
function SceneLoadError() {
  return (
    <p className={styles.message} role="alert">
      The 3D view could not be loaded. Check your connection and reload the page.
    </p>
  )
}

export default SceneLoadError
