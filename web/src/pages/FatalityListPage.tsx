import FatalityList from '../components/organisms/FatalityList/FatalityList'
import GameFilter from '../components/molecules/GameFilter/GameFilter'
import ListPageTemplate from '../components/templates/ListPageTemplate/ListPageTemplate'
import { useFatalityList } from '../hooks/useFatalityList'
import { fatalityHref, listHref } from '../routing/hrefs'

type FatalityListPageProps = {
  game: string | null
}

// Design: a page only composes. It gets the chosen game (from the route), asks
// the hook what to show, and fills the template: the title, the filter, a status
// line, and the list. The status line is `role="status"` so a screen reader
// announces how many fatalities are shown after the filter changes. The heading
// is the page's one `h1`; the cards use `h2`.
function FatalityListPage({ game }: FatalityListPageProps) {
  const { games, fatalities } = useFatalityList(game)
  const count = `${fatalities.length} ${fatalities.length === 1 ? 'fatality' : 'fatalities'}`

  return (
    <ListPageTemplate
      header={
        <>
          <h1>Mortals</h1>
          <p>Watch a fatality, then learn how to perform it.</p>
          <GameFilter games={games} selected={game} hrefFor={listHref} />
          <p role="status">{game === null ? count : `${count} in ${game}`}</p>
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
