// Whether the user's system asks for less motion. `matchMedia` is missing in some
// environments (such as the test one), where the answer is "no preference".
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}
