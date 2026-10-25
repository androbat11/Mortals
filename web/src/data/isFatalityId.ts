import type { FatalityId } from './fatality'
import { listFatalityIds } from './listFatalityIds'

// A type guard: after it, TypeScript knows the string is a real id. Routing uses
// it so a route can only ever carry an id that exists, however the address was
// typed.
export function isFatalityId(value: string): value is FatalityId {
  return (listFatalityIds() as string[]).includes(value)
}
