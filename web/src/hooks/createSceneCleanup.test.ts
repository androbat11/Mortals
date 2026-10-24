import { BoxGeometry, Mesh, MeshBasicMaterial, Scene } from 'three'
import { describe, expect, it, vi } from 'vitest'
import { createSceneCleanup } from './createSceneCleanup'

function createTargets() {
  const calls: string[] = []
  const record = (name: string) => vi.fn(() => void calls.push(name))

  const scene = new Scene()
  const mesh = new Mesh(new BoxGeometry(), new MeshBasicMaterial())
  vi.spyOn(mesh.geometry, 'dispose').mockImplementation(record('disposeScene'))
  scene.add(mesh)

  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)
  vi.spyOn(canvas, 'remove').mockImplementation(record('removeCanvas'))

  return {
    calls,
    stopLoop: record('stopLoop'),
    observer: { disconnect: record('observer') },
    controls: { dispose: record('controls') },
    scene,
    renderer: {
      forceContextLoss: record('forceContextLoss'),
      dispose: record('renderer'),
      domElement: canvas,
    },
  }
}

describe('createSceneCleanup', () => {
  it('does nothing until the returned function is called', () => {
    const { calls, ...targets } = createTargets()
    createSceneCleanup(targets)
    expect(calls).toEqual([])
  })

  it('undoes everything in order: loop, listeners, GPU objects, context, renderer, canvas', () => {
    const { calls, ...targets } = createTargets()

    createSceneCleanup(targets)()

    expect(calls).toEqual([
      'stopLoop',
      'observer',
      'controls',
      'disposeScene',
      'forceContextLoss',
      'renderer',
      'removeCanvas',
    ])
  })

  it('undoes only the parts that exist after a setup that failed half way', () => {
    const { calls, renderer } = createTargets()

    expect(() => createSceneCleanup({ renderer })()).not.toThrow()

    expect(calls).toEqual(['forceContextLoss', 'renderer', 'removeCanvas'])
  })
})
