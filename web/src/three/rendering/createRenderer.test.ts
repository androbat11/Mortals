import { describe, expect, it, vi } from 'vitest'
import { createRenderer } from './createRenderer'

const mockThree = await vi.hoisted(async () =>
  (await import('../../test/mockThree')).createMockThree(),
)

vi.mock('three', async (importOriginal) =>
  mockThree.withMockRenderer(await importOriginal()),
)

describe('createRenderer', () => {
  it('sizes the renderer and caps the pixel ratio at 2', () => {
    const renderer = createRenderer(800, 400, 3)
    expect(renderer.setSize).toHaveBeenCalledWith(800, 400)
    expect(renderer.setPixelRatio).toHaveBeenCalledWith(2)
  })
})
