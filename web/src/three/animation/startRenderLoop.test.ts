import { Scene } from 'three'
import { describe, expect, it, vi } from 'vitest'
import { createCamera } from '../objects/createCamera'
import { startRenderLoop } from './startRenderLoop'

function createTargets(delta = 0.5) {
  const renderer = { setAnimationLoop: vi.fn(), render: vi.fn() }
  const controls = { update: vi.fn() }
  const timer = { update: vi.fn(), getDelta: vi.fn(() => delta) }
  const scene = new Scene()
  const camera = createCamera(1)
  const updaters = [vi.fn(), vi.fn()]
  return { renderer, controls, timer, scene, camera, updaters }
}

function getFrame(renderer: { setAnimationLoop: ReturnType<typeof vi.fn> }) {
  return renderer.setAnimationLoop.mock.calls[0][0] as () => void
}

describe('startRenderLoop', () => {
  it('starts the animation loop without running a frame', () => {
    const targets = createTargets()
    startRenderLoop(targets)
    expect(targets.renderer.setAnimationLoop).toHaveBeenCalledWith(
      expect.any(Function),
    )
    expect(targets.renderer.render).not.toHaveBeenCalled()
  })

  it('each frame updates timer and controls, runs the updaters, and renders', () => {
    const targets = createTargets(0.05)
    startRenderLoop(targets)

    getFrame(targets.renderer)()

    expect(targets.timer.update).toHaveBeenCalledTimes(1)
    expect(targets.controls.update).toHaveBeenCalledTimes(1)
    targets.updaters.forEach((update) =>
      expect(update).toHaveBeenCalledWith(0.05),
    )
    expect(targets.renderer.render).toHaveBeenCalledWith(
      targets.scene,
      targets.camera,
    )
  })

  it('runs each frame in order: timer, controls, updaters, then render', () => {
    const calls: string[] = []
    const targets = createTargets()
    targets.timer.update.mockImplementation(() => void calls.push('timer.update'))
    targets.timer.getDelta.mockImplementation(() => {
      calls.push('timer.getDelta')
      return 0.01
    })
    targets.controls.update.mockImplementation(
      () => void calls.push('controls.update'),
    )
    targets.updaters[0].mockImplementation(() => void calls.push('updater 1'))
    targets.updaters[1].mockImplementation(() => void calls.push('updater 2'))
    targets.renderer.render.mockImplementation(() => void calls.push('render'))
    startRenderLoop(targets)

    getFrame(targets.renderer)()

    expect(calls).toEqual([
      'timer.update',
      'controls.update',
      'timer.getDelta',
      'updater 1',
      'updater 2',
      'render',
    ])
  })

  it('clamps a long frame delta before passing it to the updaters', () => {
    const targets = createTargets(5)
    startRenderLoop(targets)

    getFrame(targets.renderer)()

    targets.updaters.forEach((update) =>
      expect(update).toHaveBeenCalledWith(0.1),
    )
  })

  it('works with no updaters', () => {
    const targets = { ...createTargets(), updaters: [] }
    startRenderLoop(targets)

    getFrame(targets.renderer)()

    expect(targets.renderer.render).toHaveBeenCalledTimes(1)
  })

  it('returns a function that stops the loop', () => {
    const targets = createTargets()
    const stop = startRenderLoop(targets)

    stop()

    expect(targets.renderer.setAnimationLoop).toHaveBeenLastCalledWith(null)
  })
})
