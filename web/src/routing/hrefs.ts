// The only places a link is written. The routes use the URL hash, which works on
// any static host with no server rewrite rules and needs no dependency.
export function aboutHref() {
  return '#/'
}

export function fatalitiesHref() {
  return '#/fatalities'
}

export function brutalitiesHref() {
  return '#/brutalities'
}
