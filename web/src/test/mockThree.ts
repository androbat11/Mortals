import { vi } from 'vitest'

// Design: jsdom has no WebGL, so tests replace only `WebGLRenderer` with a fake
// and keep the real Three.js objects (scene, camera, mesh). Tests then exercise
// real code and only fake the part that cannot run here. Every fake renderer is
// recorded so tests can check what the hook did to it (loop started, disposed).
export const renderers: MockRenderer[] = []

export class MockRenderer {
  domElement = document.createElement('canvas')
  setPixelRatio = vi.fn()
  setSize = vi.fn()
  setAnimationLoop = vi.fn()
  render = vi.fn()
  dispose = vi.fn()

  constructor() {
    renderers.push(this)
  }
}

export function withMockRenderer(actual: typeof import('three')) {
  return { ...actual, WebGLRenderer: MockRenderer }
}
