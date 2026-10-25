import { useCallback, useState } from 'react'

// Design: every card has a preview slot, but only one may run a 3D scene at a
// time. Each scene is a WebGL context, and phones allow only a few, so many
// running previews would make the browser drop the oldest. The page keeps the id
// of the one active move; starting another replaces it, which unmounts (and
// cleans up) the previous scene.
export function useActivePreview() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const play = useCallback((id: string) => setActiveId(id), [])
  const stop = useCallback(() => setActiveId(null), [])
  return { activeId, play, stop }
}
