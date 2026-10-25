// Design: type-first. A fighter is the unit the archive is organised by: the
// roster, the About cards, and the sections of the move pages are all fighters.
export type FighterId =
  | 'scorpion'
  | 'sub-zero'
  | 'liu-kang'
  | 'johnny-cage'
  | 'kitana'
  | 'raiden'

export type Fighter = {
  id: FighterId
  name: string
  // The line above the name ("Shirai Ryu Grandmaster").
  title: string
  // Who the fighter is out of the mask or the realm ("Hanzo Hasashi").
  alias: string
  realm: string
  // Short labelled facts shown beside the name ("Primary element: ...").
  facts: { label: string; value: string }[]
  // One sentence for the About card.
  summary: string
}
