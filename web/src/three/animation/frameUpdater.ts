// Design: a per-frame update is just a function of the time that passed. The
// render loop runs a list of these, so anything that changes over time (the
// cube's spin now, the character's animation in Phase 5, a pause in Phase 8) is
// one more entry in the list and the loop itself never changes.
export type FrameUpdater = (deltaSeconds: number) => void
