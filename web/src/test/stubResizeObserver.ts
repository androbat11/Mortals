import { vi } from 'vitest'

// Design: jsdom does not implement ResizeObserver, which the scene hook uses to
// follow its container. The stub records every callback and observer so tests
// can fire a resize by hand and check that observers are disconnected. It is a
// function called per test (no module-level state), and it undoes itself with
// `vi.unstubAllGlobals()`.
export function stubResizeObserver() {
  const callbacks: ResizeObserverCallback[] = []
  const observers: { disconnect: ReturnType<typeof vi.fn> }[] = []

  vi.stubGlobal(
    'ResizeObserver',
    vi.fn(function (callback: ResizeObserverCallback) {
      const observer = {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      }
      callbacks.push(callback)
      observers.push(observer)
      return observer
    }),
  )

  return { callbacks, observers }
}
