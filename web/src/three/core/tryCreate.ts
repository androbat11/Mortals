// Design: creating some objects can throw (a WebGL renderer when WebGL is
// blocked). This function turns that into a plain `null` result, so callers
// decide what to show instead of the error unmounting the whole React tree.
// It does one thing, and keeps try/catch out of the code that uses it.
export function tryCreate<T>(create: () => T): T | null {
  try {
    return create()
  } catch {
    return null
  }
}
