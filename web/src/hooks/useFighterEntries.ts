import { useState } from 'react'
import { createFighterEntries } from '../data/createFighterEntries'
import type { FighterEntry } from '../data/fighterEntry'

// The archive content is static, so it is built once for the page's life (the
// lazy initialiser runs once) and every screen reads the same entries.
export function useFighterEntries(): FighterEntry[] {
  const [entries] = useState(createFighterEntries)
  return entries
}
