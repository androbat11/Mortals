import type { ReactNode } from 'react'
import styles from './SiteTemplate.module.css'

type SiteTemplateProps = {
  header: ReactNode
  footer: ReactNode
  children: ReactNode
}

// Design: a template, the frame around every page: header on top, the page in
// `main`, footer at the bottom. It places slots and knows nothing about what is in
// them. A skip link comes first so keyboard users can jump past the navigation.
function SiteTemplate({ header, footer, children }: SiteTemplateProps) {
  return (
    <div className={styles.site}>
      <a href="#main" className={styles.skip}>
        Skip to the content
      </a>
      {header}
      <main id="main" className={styles.main}>
        {children}
      </main>
      {footer}
    </div>
  )
}

export default SiteTemplate
