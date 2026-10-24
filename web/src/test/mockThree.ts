import { vi } from 'vitest'

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
