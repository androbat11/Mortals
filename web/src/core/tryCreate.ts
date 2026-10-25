// Design: creating some objects can throw (a WebGL renderer when WebGL is
// blocked). This function turns that into a plain `null` result, so callers
// decide what to show instead of the error unmounting the whole React tree.
// It does one thing, and keeps try/catch out of the code that uses it. The error
// is logged, so a real bug is not hidden behind a friendly message.
export function tryCreate<T>(create: () => T): T | null {
  try {
    return create()
  } catch (error) {
    console.error(error)
    return null
  }
}
