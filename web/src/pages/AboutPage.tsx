import AboutHero from '../components/organisms/AboutHero/AboutHero'
import NotationLegend from '../components/organisms/NotationLegend/NotationLegend'
import RosterGrid from '../components/organisms/RosterGrid/RosterGrid'
import InfoPanel from '../components/molecules/InfoPanel/InfoPanel'
import StatBox from '../components/molecules/StatBox/StatBox'
import AboutTemplate from '../components/templates/AboutTemplate/AboutTemplate'
import { countAllMoves } from '../data/countMoves'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useFighterEntries } from '../hooks/useFighterEntries'

// Design: the home page only composes: hero, the counts (derived from the data),
// what fatalities and brutalities are, the notation reference, and the roster.
function AboutPage() {
  useDocumentTitle('Mortals - Mortal Kombat finishing move archive')
  const entries = useFighterEntries()

  return (
    <AboutTemplate
      hero={<AboutHero />}
      stats={
        <>
          <StatBox value={entries.length} label="Fighters" />
          <StatBox value={countAllMoves(entries, 'fatality')} label="Fatalities" />
          <StatBox value={countAllMoves(entries, 'brutality')} label="Brutalities" />
        </>
      }
      explainers={
        <>
          <InfoPanel title="Fatalities" tone="fatality">
            <p>
              The finishing move at the end of a match. Each has a range (close,
              mid, far, or sweep) you must stand at when you enter its input.
            </p>
          </InfoPanel>
          <InfoPanel title="Brutalities" tone="brutality">
            <p>
              A finisher earned during the fight: you must meet a trigger, such as
              landing a certain move or finishing a combo, before the last hit.
            </p>
          </InfoPanel>
        </>
      }
      notation={<NotationLegend />}
      roster={<RosterGrid entries={entries} />}
    />
  )
}

export default AboutPage
