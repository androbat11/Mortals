// Design: a per-frame update is just a function of the time that passed. The
// render loop runs a list of these, so anything that changes over time (the
// character's animation, a pause) is one more entry in the list and the loop
// itself never changes.
export type FrameUpdater = (deltaSeconds: number) => void
