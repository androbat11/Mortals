import styles from './SiteFooter.module.css'

// Design: an organism, the footer with the fan-tribute disclaimer. The project
// uses names and the button notation of the games, so it says plainly that it is
// unofficial, shows no game artwork, and that the move details are not yet checked.
function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.brand}>Mortals</p>
        <p>
          Mortals is an unofficial fan project. It is not affiliated with, endorsed
          by, or connected to Warner Bros., NetherRealm Studios, or the owners of
          Mortal Kombat. Names and button notation are referenced as a tribute;
          the figures are our own original animations, with no game artwork.
        </p>
        <p>
          Move names, descriptions, triggers, and inputs are taken from a design
          draft and have not been verified against the games yet.
        </p>
      </div>
    </footer>
  )
}

export default SiteFooter
