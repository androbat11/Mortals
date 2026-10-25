import { aboutHref, brutalitiesHref, fatalitiesHref } from './hrefs'
import type { Route } from './route'

export type NavItem = {
  name: Route['name']
  label: string
  href: string
}

// The links of the main navigation, in the order of the design: About,
// Fatalities, Brutalities. Components receive them as data, so they know nothing
// about the routes.
export function createNavItems(): NavItem[] {
  return [
    { name: 'about', label: 'About', href: aboutHref() },
    { name: 'fatalities', label: 'Fatalities', href: fatalitiesHref() },
    { name: 'brutalities', label: 'Brutalities', href: brutalitiesHref() },
  ]
}
