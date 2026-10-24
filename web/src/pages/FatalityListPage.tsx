import FatalityList from '../components/organisms/FatalityList/FatalityList'
import ListPageTemplate from '../components/templates/ListPageTemplate/ListPageTemplate'
import { createFatalities } from '../data/createFatalities'
import { fatalityHref } from '../routing/hrefs'

// Design: a page only composes. It gets every fatality, gives the list the way
// to write each link, and fills the template's header. The heading is the page's
// one `h1`; the cards use `h2`.
function FatalityListPage() {
  return (
    <ListPageTemplate
      header={
        <>
          <h1>Mortals</h1>
          <p>Watch a fatality, then learn how to perform it.</p>
        </>
      }
    >
      <FatalityList
        fatalities={createFatalities()}
        hrefFor={(fatality) => fatalityHref(fatality.id)}
      />
    </ListPageTemplate>
  )
}

export default FatalityListPage
