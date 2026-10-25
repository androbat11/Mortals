import type { MoveFilters } from './moveFilters'

// No filter at all: everything shows.
export function createEmptyFilters(): MoveFilters {
  return { text: '', game: null, category: null }
}
