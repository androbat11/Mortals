import { useEffect } from 'react'

// Sets the tab and history title for the page that is showing. It is a hook so
// pages stay free of side effects, and each page names itself.
export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title
  }, [title])
}
