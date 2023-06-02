import {MEDIA_TYPES} from '@zwirner/design-system'

import {builder} from '@/sanity/imageBuilder'

export const mapHeaderCarousel = (data = []) => {
  return (
    data?.map((item) => {
      const {exhibition} = item
      const {title, subtitle, photos = []} = exhibition ?? {}
      const [mainImage] = photos ?? []
      const {asset, alt} = mainImage ?? {}
      const imgSrc = asset ? builder.image(asset).url() : ''
      return {
        category: subtitle,
        media: {
          type: MEDIA_TYPES.IMAGE,
          imgProps: {
            url: '/',
            src: imgSrc,
            alt: alt,
          },
        },
        title,
        linkCTA: {
          text: 'Learn More',
          linkElement: 'a',
          url: '/',
        },
      }
    }) ?? []
  )
}

export const mapFeaturedContentSplit = (data: any) => {
  const {exhibition} = data ?? {}
  const {title, subtitle, photos = [], description} = exhibition ?? {}
  const [mainImage] = photos ?? []
  const {asset, alt} = mainImage ?? {}
  const imgSrc = asset ? builder.image(asset).url() : ''

  return {
    media: {
      url: '/',
      type: MEDIA_TYPES.IMAGE,
      imgProps: {
        src: imgSrc,
        alt,
      },
    },
    category: subtitle,
    title,
    description,
    linkCTA: {
      text: 'Learn More',
      linkElement: 'a',
      url: '/',
    },
  }
}

export const mapArticlesGrid = (data = []) => {
  return data?.map((item) => {
    // TODO fix typo in the sanity studio
    const {title, subtitle, images = []} = item ?? {}
    const [mainImage] = images ?? []
    const {asset, alt} = mainImage ?? {}
    const imgSrc = asset ? builder.image(asset).url() : ''
    return {
      media: {
        type: MEDIA_TYPES.IMAGE,
        imgProps: {
          url: '/',
          src: imgSrc,
          alt,
        },
      },
      category: 'Museum Exhibitions',
      title,
      secondaryTitle: subtitle,
      linkCTA: {
        text: 'View More',
        linkElement: 'a',
        url: '/',
      },
    }
  })
}

export const mapInterstitialComponents = (data: any) => {
  const {ctaOverride, imageOverride, titleOverride, subtitleOverride} = data ?? {}

  const {asset, alt} = imageOverride ?? {}
  const imgSrc = asset ? builder.image(asset).url() : ''
  return {
    split: false,
    title: titleOverride,
    description: subtitleOverride,
    primaryCta: {
      text: ctaOverride,
    },
    media: {
      url: '/',
      type: MEDIA_TYPES.IMAGE,
      imgProps: {
        src: imgSrc,
        alt,
      },
    },
  }
}

export const mapTabsLocations = (data: any) => {
  const mappedLocationsByCity =
    data?.reduce((prev: any, loc: any) => {
      const {address, name, photos} = loc ?? {}
      const {city, state, zipCode, addressLine} = address ?? {}
      const [mainPhoto] = photos ?? []
      const {asset, alt} = mainPhoto ?? {}
      const imgSrc = asset ? builder.image(asset).url() : ''

      const cardLocation = {
        media: {
          type: MEDIA_TYPES.IMAGE,
          imgProps: {
            src: imgSrc,
            alt,
            url: '/',
          },
        },
        title: name,
        secondaryTitle: addressLine,
        description: `${state}, ${city}, ${zipCode}`,
      }

      if (prev[city] && prev[city].cards && Array.isArray(prev[city].cards)) {
        const cardsCopy = [...prev[city].cards]
        cardsCopy.push(cardLocation)
        prev[city].cards = cardsCopy
        return prev
      }
      prev[city] = {title: city, cards: [cardLocation]}
      return prev
    }, {}) ?? {}

  return Object.entries(mappedLocationsByCity).map((entry) => {
    const [_, locationGroup] = entry
    return locationGroup
  })
}

export const mapCarouselCards = (data: any) => {
  return data?.map((item: any) => {
    const {exhibition} = item
    const {title, subtitle, photos = [], summary} = exhibition ?? {}
    const [mainImage] = photos ?? []
    const {asset, alt} = mainImage ?? {}
    const imgSrc = asset ? builder.image(asset).url() : ''
    return {
      id: item._id,
      media: {
        type: 'image',
        imgProps: {
          src: imgSrc,
          alt,
        },
      },
      category: subtitle,
      title,
      description: summary,
      linkCTA: {
        text: 'Learn More',
        linkElement: 'a',
        url: '/',
      },
    }
  })
}
