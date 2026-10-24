type Factory = (...args: never[]) => unknown

type Factories = Record<string, Factory>

export function createRepository<F extends Factories>(factories: F) {
  return {
    create<K extends keyof F>(key: K, ...args: Parameters<F[K]>) {
      return factories[key](...args) as ReturnType<F[K]>
    },
  }
}

export type Repository<F extends Factories> = ReturnType<
  typeof createRepository<F>
>
