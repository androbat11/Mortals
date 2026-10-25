// Design: type-first. A game has a stable id (a closed union, like `FatalityId`)
// and a separate display name. The id is what goes in the address
// (`#/?game=sample-game`) and what the filter compares, so renaming a game to
// its real title cannot break a shared link, and a typo in an entry is a compile
// error instead of a new filter choice.
export type GameId = 'sample-game' | 'second-sample-game'

export type Game = {
  id: GameId
  name: string
}
