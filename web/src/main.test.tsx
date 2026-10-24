import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('three', async (importOriginal) =>
  (await import('./test/mockThree')).withMockRenderer(await importOriginal()),
)

describe('main', () => {
  beforeEach(() => {
    vi.resetModules()
    document.body.innerHTML = '<div id="root"></div>'
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('mounts App into the root element', async () => {
    await import('./main.tsx')
    const root = document.getElementById('root')!
    await vi.waitFor(() =>
      expect(root.querySelector('canvas')).toBeInTheDocument(),
    )
  })
})
