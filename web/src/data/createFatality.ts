import { createFatalityRepository } from './createFatalityRepository'
import type { Fatality, FatalityId } from './fatality'

// A fatality by its id, for the pages. Each call returns a new
// object, so one caller cannot change what another sees.
export function createFatality(id: FatalityId): Fatality {
  return createFatalityRepository().create(id)
}
