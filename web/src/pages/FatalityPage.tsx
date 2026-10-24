import { Suspense } from 'react'
import LazySceneCanvas from '../components/organisms/SceneCanvas/LazySceneCanvas'
import LoadingIndicator from '../components/atoms/LoadingIndicator/LoadingIndicator'
import FatalityDetails from '../components/organisms/FatalityDetails/FatalityDetails'
import FatalityPageTemplate from '../components/templates/FatalityPageTemplate/FatalityPageTemplate'
import type { FatalityId } from '../data/fatality'
import PlaybackControls from '../components/molecules/PlaybackControls/PlaybackControls'
import BackLink from '../components/atoms/BackLink/BackLink'
import { listHref } from '../routing/hrefs'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useFatality } from '../hooks/useFatality'
import { usePlayback } from '../hooks/usePlayback'

type FatalityPageProps = {
  fatalityId: FatalityId
}

// Design: a page only composes. It gets a fatality id (the list will supply it
// from the route later), looks the entry up through a hook, and fills the
// template's slots (the scene, its playback buttons, and the details). The scene
// is loaded lazily, so a loading message shows until its code arrives. The entry drives the scene: its `animationId` selects
// the animation and its name builds the accessible label, so showing another
// fatality needs data and no page code.
function FatalityPage({ fatalityId }: FatalityPageProps) {
  const fatality = useFatality(fatalityId)
  const { playback, playing, togglePlaying, replay } = usePlayback()
  useDocumentTitle(`${fatality.name} - Mortals`)

  return (
    <FatalityPageTemplate
      scene={
        <Suspense fallback={<LoadingIndicator>Loading the 3D view…</LoadingIndicator>}>
          <LazySceneCanvas
            label={`Animation of ${fatality.name}: a low-poly fighter performing the move`}
            animationId={fatality.animationId}
            playback={playback}
          />
        </Suspense>
      }
      controls={
        <PlaybackControls
          playing={playing}
          onTogglePlay={togglePlaying}
          onReplay={replay}
        />
      }
      details={
        <>
          <BackLink href={listHref(fatality.game)}>Back to the list</BackLink>
          <FatalityDetails fatality={fatality} />
        </>
      }
    />
  )
}

export default FatalityPage
