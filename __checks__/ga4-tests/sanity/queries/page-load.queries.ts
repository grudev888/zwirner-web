export const gtmPageLoadData = /* groq */ `
*[defined(slug.current) && _type == $type][0]{
  _rev,
  _updatedAt,
  slug
}
`
export const gtmPageLoadDataArtistPage = /* groq */ `
*[defined(slug.current) && _type == $type][0]{
  _rev,
  _updatedAt,
  slug,
  "artists":*[_type == "artistPage" && defined(slug.current) && artist->.affiliation == true] {
    artist-> {
      fullName,
    }
  }
}
`
