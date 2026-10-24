import { createFatality } from './createFatality'
import type { Fatality } from './fatality'
import { listFatalityIds } from './listFatalityIds'

// Every fatality, for the list page.
export function createFatalities(): Fatality[] {
  return listFatalityIds().map(createFatality)
}
