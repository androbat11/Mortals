// Design: an atom, the targeting reticle the design puts at the left of the search
// field. Inline SVG (no image request, nothing hot-linked) drawn with
// `currentColor`, so the parent sets its colour from the tokens. It is decoration,
// so it is hidden from assistive technology.
function ReticleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="6" />
      <path d="M12 2v5M12 17v5M2 12h5M17 12h5" />
    </svg>
  )
}

export default ReticleIcon
