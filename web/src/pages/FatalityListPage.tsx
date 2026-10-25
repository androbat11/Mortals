import FatalityList from '../components/organisms/FatalityList/FatalityList'
import GameFilter from '../components/molecules/GameFilter/GameFilter'
import ListPageTemplate from '../components/templates/ListPageTemplate/ListPageTemplate'
import type { GameId } from '../data/game'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useFatalityList } from '../hooks/useFatalityList'
import { fatalityHref, listHref } from '../routing/hrefs'

type FatalityListPageProps = {
  game: GameId | null
}

// Design: a page only composes. It gets the chosen game (from the route), asks
// the hook what to show, and fills the template: the title, the filter, a status
// line, and the list. The status line is `role="status"` so a screen reader
// announces how many fatalities are shown after the filter changes. The heading
// is the page's one `h1`, and it can take focus (`tabIndex={-1}`) so the page
// can move focus there after a route change; the cards use `h2`.
function FatalityListPage({ game }: FatalityListPageProps) {
  const { games, fatalities, status } = useFatalityList(game)
  useDocumentTitle('Mortals')

  return (
    <ListPageTemplate
      header={
        <>
          <h1 tabIndex={-1}>Mortals</h1>
          <p>Watch a fatality, then learn how to perform it.</p>
          <GameFilter games={games} selected={game} hrefFor={listHref} />
          <p role="status">{status}</p>
        </>
      }
    >
      <FatalityList
        fatalities={fatalities}
        hrefFor={(fatality) => fatalityHref(fatality.id)}
      />
    </ListPageTemplate>
  )
}

export default FatalityListPage
