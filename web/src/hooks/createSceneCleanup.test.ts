import { Scene } from 'three'
import { describe, expect, it, vi } from 'vitest'
import { createSceneCleanup } from './createSceneCleanup'

function createTargets() {
  const calls: string[] = []
  const record = (name: string) => vi.fn(() => void calls.push(name))
  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)
  return {
    calls,
    canvas,
    stopLoop: record('stopLoop'),
    observer: { disconnect: record('observer') },
    controls: { dispose: record('controls') },
    scene: new Scene(),
    renderer: {
      forceContextLoss: record('forceContextLoss'),
      dispose: record('renderer'),
      domElement: canvas,
    },
  }
}

describe('createSceneCleanup', () => {
  it('does nothing until the returned function is called', () => {
    const { calls, canvas, ...targets } = createTargets()
    createSceneCleanup({ ...targets })
    expect(calls).toEqual([])
    expect(canvas.isConnected).toBe(true)
  })

  it('stops the loop, removes listeners, then frees the renderer, in that order', () => {
    const { calls, canvas, ...targets } = createTargets()

    createSceneCleanup({ ...targets })()

    expect(calls).toEqual([
      'stopLoop',
      'observer',
      'controls',
      'forceContextLoss',
      'renderer',
    ])
    expect(canvas.isConnected).toBe(false)
  })
})
