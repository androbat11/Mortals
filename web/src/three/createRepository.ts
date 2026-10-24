// Design: type-first. These types are defined before the implementation so the
// compiler can check every call to `create` against the factory it names.
// `never[]` for the arguments (instead of `any[]`) accepts a factory with any
// parameter list while keeping `any` out of the codebase.
type Factory = (...args: never[]) => unknown

type Factories = Record<string, Factory>

// Design: a repository is a plain function that closes over a map of factories,
// not a class. It gives the app one place to ask for objects by key, so hooks
// and components never call `new` directly. Swapping a factory (for example in a
// test) is a one-line change in the map, and callers stay untouched.
export function createRepository<F extends Factories>(factories: F) {
  return {
    // Generics tie the arguments and the return type to the chosen key:
    // `create('camera', 1.5)` is checked against `createCamera` and returns a
    // `PerspectiveCamera`, with no casts at the call site.
    create<K extends keyof F>(key: K, ...args: Parameters<F[K]>) {
      // The cast is the one place TypeScript can't follow the key lookup, so it
      // is kept here, once, instead of being spread across callers.
      return factories[key](...args) as ReturnType<F[K]>
    },
  }
}
