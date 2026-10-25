// Jumps to a section of the page. It does not use a `#id` link, because the app's
// routes live in the URL hash and such a link would change the route. Users who
// ask for reduced motion get an instant jump instead of a smooth scroll.
export function scrollToElement(id: string, smooth: boolean) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
}
