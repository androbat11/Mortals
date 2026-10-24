import '@testing-library/jest-dom/vitest'

// jsdom does not implement ResizeObserver, which the scene hook uses to follow
// its container. A do-nothing stub is enough: tests do not check resizing.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver = ResizeObserverStub
