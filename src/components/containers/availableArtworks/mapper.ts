import {MEDIA_TYPES} from '@zwirner/design-system'
import {builder} from '@/sanity/imageBuilder'

export const mapCardsGrid = (data: any[]) => {
  return data?.map((artwork) => {
    const {photos, artists, dimensions, title, dateSelection, medium, edition, _id, price} =
      artwork ?? {}
    const {year} = dateSelection
    const [mainArtist] = artists ?? []
    const {fullName} = mainArtist ?? {}
    const [mainPicture] = photos ?? []
    const {asset, alt} = mainPicture ?? {}
    const imgSrc = asset ? builder.image(asset).url() : ''
    return {
      id: _id,
      media: {
        url: '/',
        type: MEDIA_TYPES.IMAGE,
        imgProps: {
          src: imgSrc,
          alt,
        },
      },
      artistName: fullName,
      artworkTitle: title,
      artworkYear: year,
      medium: medium,
      dimensions: dimensions,
      edition: edition,
      price: price,
      primaryCTA: {
        text: 'Inquire',
        ctaProps: {
          // Todo inquire with _id
          onClick: () => null,
        },
      },
    }
  })
}
