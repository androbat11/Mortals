// Design: the games a move can come from are a closed union, so a typo is a
// compile error and the "timeline" filter lists exactly these.
export type GameId = 'mk1' | 'mk11' | 'mkx'

export type Game = {
  id: GameId
  name: string
}
