import { vi } from 'vitest'

// Design: jsdom has no WebGL, so tests replace only `WebGLRenderer` with a fake
// and keep the real Three.js objects (scene, camera, mesh). Tests then exercise
// real code and only fake the part that cannot run here. This is a function
// that returns its own `renderers` list (not an exported module-level array),
// so each test file gets fresh state, and the fake is built by a function, not
// a class. Every fake renderer is recorded so tests can check what the hook did
// to it (loop started, disposed).
function createMockRenderer() {
  return {
    domElement: document.createElement('canvas'),
    setPixelRatio: vi.fn(),
    setSize: vi.fn(),
    setAnimationLoop: vi.fn(),
    render: vi.fn(),
    dispose: vi.fn(),
  }
}

export type MockRenderer = ReturnType<typeof createMockRenderer>

export function createMockThree() {
  const renderers: MockRenderer[] = []

  // `vi.fn` with a regular function can be called with `new`; returning an
  // object makes `new WebGLRenderer()` yield that object.
  const WebGLRenderer = vi.fn(function () {
    const renderer = createMockRenderer()
    renderers.push(renderer)
    return renderer
  })

  return {
    renderers,
    withMockRenderer: (actual: typeof import('three')) => ({
      ...actual,
      WebGLRenderer,
    }),
  }
}
