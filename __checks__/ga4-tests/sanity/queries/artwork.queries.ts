export const artworkFields = /* groq */ `
_id,
"pageTitle": coalesce(seo.pageTitle, title),
_rev,
artists[]-> {fullName, artistPage->{slug}},
artworkType,
currency,
dateSelection,
dimensions,
inventoryId,
framed,
medium,
price,
_createdAt,
title,
slug,
photos,
availability,
artworkCTA,
"product": shopify->store{ id, variants[]->{ store { id, price, inventory { isAvailable } } } },
`

export const artworkDatasQuery: string = /* groq */ `
*[_type == "artwork"][0...3] {
  ${artworkFields}
}
`

export const artworkHavingInquireCTAQuery: string = /* groq */ `
*[_type=='artwork' && (artworkCTA.CTA == 'inquire' || artworkCTA.secondaryCTA == 'inquire')][0] {
  ${artworkFields}
}
`
