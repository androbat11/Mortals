import { createFatalityRepository } from './createFatalityRepository'
import type { FatalityId } from './fatality'

// The ids of every fatality, taken from the registry itself, so the list page
// and the registry cannot disagree.
export function listFatalityIds(): FatalityId[] {
  return createFatalityRepository().keys()
}
