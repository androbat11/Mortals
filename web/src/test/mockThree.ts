import { vi } from 'vitest'

// Design: jsdom has no WebGL, so tests replace only `WebGLRenderer` with a fake
// and keep the real Three.js objects (scene, camera, mesh). Tests then exercise
// real code and only fake the part that cannot run here. This is a function
// that returns its own `renderers` list (not an exported module-level array),
// so each call gets fresh state, and the fake is built by a function, not a
// class. A test file still has to hold the returned handle in a variable,
// because `vi.mock` needs it before the imports run. Every fake renderer is recorded so tests can check what the hook did
// to it (loop started, disposed).
function createMockRenderer() {
  return {
    domElement: document.createElement('canvas'),
    setPixelRatio: vi.fn(),
    setSize: vi.fn(),
    setAnimationLoop: vi.fn(),
    render: vi.fn(),
    dispose: vi.fn(),
    forceContextLoss: vi.fn(),
  }
}

export type MockRenderer = ReturnType<typeof createMockRenderer>

export function createMockThree() {
  const renderers: MockRenderer[] = []
  const state = { failNext: false }

  // `vi.fn` with a regular function can be called with `new`; returning an
  // object makes `new WebGLRenderer()` yield that object.
  const WebGLRenderer = vi.fn(function () {
    if (state.failNext) {
      state.failNext = false
      throw new Error('WebGL is not available')
    }
    const renderer = createMockRenderer()
    renderers.push(renderer)
    return renderer
  })

  return {
    renderers,
    // Makes the next fake `WebGLRenderer` throw, like a browser without WebGL.
    failNextRenderer: () => {
      state.failNext = true
    },
    withMockRenderer: (actual: typeof import('three')) => ({
      ...actual,
      WebGLRenderer,
    }),
  }
}
