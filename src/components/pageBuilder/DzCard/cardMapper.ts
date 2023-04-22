import {BUTTON_VARIANTS, CARD_TYPES, MEDIA_TYPES} from '@zwirner/design-system'

import {builder} from '@/sanity/imageBuilder'

export const cardMapper = (data: any) => {
  return data
}

export const contentTypesMapper: any = {
  artist: (data: any, props: any) => {
    const {birthdate, picture, fullName, description} = data
    const {asset, alt} = picture ?? {}
    const imgSrc = asset ? builder.image(asset).url() : ''
    return {
      type: CARD_TYPES.CONTENT,
      data: {
        media: {
          url: '/',
          type: MEDIA_TYPES.IMAGE,
          imgProps: {
            src: imgSrc,
            alt,
          },
        },
        title: fullName,
        subtitle: birthdate,
        description,
      },
    }
  },
  artwork: (data: any, props: any) => {
    const {photos, artists, dimensions, title, dateSelection, medium, edition} = data
    const [mainArtist] = artists ?? []
    const [mainPicture] = photos ?? []
    const {asset, alt} = mainPicture ?? {}
    const imgSrc = asset ? builder.image(asset).url() : ''
    return {
      type: CARD_TYPES.ARTWORK,
      data: {
        media: {
          url: '/',
          type: MEDIA_TYPES.IMAGE,
          imgProps: {
            src: imgSrc,
            alt,
          },
        },
        artistName: mainArtist?.fullName,
        artworkTitle: title,
        artworkYear: dateSelection?.year,
        medium,
        dimensions,
        edition,
        price: 2000,
        framed: 'Unframed',
        primaryCTA: {
          text: 'Button',
        },
        secondaryCTA: {
          text: 'Button',
          ctaProps: {
            variant: BUTTON_VARIANTS.TERTIARY,
          },
        },
      },
    }
  },
  exhibition: (data: any, props: any) => {
    const {events, subtitle, title, description} = data
    const [event] = events ?? []
    const {photos} = event ?? {}
    const [mainPicture] = photos ?? []
    const {asset, alt} = mainPicture ?? {}
    const imgSrc = asset ? builder.image(asset).url() : ''
    return {
      type: CARD_TYPES.CONTENT,
      data: {
        media: {
          url: '/',
          type: MEDIA_TYPES.IMAGE,
          imgProps: {
            src: imgSrc,
            alt,
          },
        },
        category: 'Category Slug',
        title: title,
        subtitle: subtitle,
        secondaryTitle: 'Lorem ipsum dolor sit amet, consectetuer adipiscin',
        secondarySubtitle: 'Lorem ipsum dolor sit amet, consectetuer adipiscin',
        description,
      },
    }
  },
}
