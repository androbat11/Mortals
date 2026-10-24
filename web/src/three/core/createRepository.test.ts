import { describe, expect, it, vi } from 'vitest'
import { createRepository } from './createRepository'

describe('createRepository', () => {
  it('lists its keys', () => {
    const repository = createRepository({ a: () => 1, b: () => 2 })
    expect(repository.keys()).toEqual(['a', 'b'])
  })

  it('creates an object by key using its factory', () => {
    const repository = createRepository({ greeting: () => 'hello' })
    expect(repository.create('greeting')).toBe('hello')
  })

  it('passes arguments through to the factory', () => {
    const repository = createRepository({
      sum: (a: number, b: number) => a + b,
    })
    expect(repository.create('sum', 2, 3)).toBe(5)
  })

  it('calls the factory on every create so objects are not shared', () => {
    const factory = vi.fn(() => ({}))
    const repository = createRepository({ thing: factory })
    expect(repository.create('thing')).not.toBe(repository.create('thing'))
    expect(factory).toHaveBeenCalledTimes(2)
  })
})
