import {artworkFields} from './artwork.queries'

export const exhibitionQuery = /* groq */ `
*[_type == "exhibitionPage"][0] {
  "pageTitle": coalesce(seo.pageTitle, title),
  _rev,
  slug,
  checklist {
    grid[0...3]{
      content[]-> {
        ${artworkFields}
      }
    }
  },
}`
