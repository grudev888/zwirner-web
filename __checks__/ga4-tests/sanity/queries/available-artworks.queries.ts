import {artworkFields} from './artwork.queries'

export const availableArtworkDatasQuery: string = /* groq */ `
*[_type == "availableArtworks" && defined(slug.current)][0] {
  "pageTitle": coalesce(seo.pageTitle, title),
  _rev,
  artworksGrid {
    grid[0...3]{
      content[]-> {
        ${artworkFields}
      }
    }
  }
}
`

export const availableArtworksQuery = /* groq */ `
*[_type == "availableArtworks"][0] {
  artworksGrid {
    grid[]{
      content[0]-> {
        ${artworkFields}
      },
    }
  },
}
`
