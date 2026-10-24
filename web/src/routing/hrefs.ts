import type { FatalityId } from '../data/fatality'

// The only places a link is written. The routes use the URL hash, which works on
// any static host with no server rewrite rules and needs no dependency.
export function listHref() {
  return '#/'
}

export function fatalityHref(id: FatalityId) {
  return `#/fatality/${id}`
}
