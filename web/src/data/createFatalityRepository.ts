import { createRepository } from '../three/core/createRepository'
import type { Fatality, FatalityId } from './fatality'
import { createSampleUppercut } from './fatalities/createSampleUppercut'

// Design: the registry of fatalities, keyed by id and made with the same
// `createRepository` as every other object. Typing it as
// `Record<FatalityId, ...>` makes the compiler require an entry for every id and
// reject unknown ones. Adding a fatality is one factory, one new id in
// `FatalityId`, and one line here; the compiler reports whichever step is
// missing.
export function createFatalityRepository() {
  return createRepository<Record<FatalityId, () => Fatality>>({
    'sample-uppercut': createSampleUppercut,
  })
}
