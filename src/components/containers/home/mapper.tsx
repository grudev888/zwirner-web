import {MEDIA_ASPECT_RATIOS, MEDIA_TYPES, TITLE_TYPES} from '@zwirner/design-system'
import Image from 'next/image'

import {LEARN_MORE} from '@/common/constants/commonCopies'
import {builder} from '@/sanity/imageBuilder'

import {parseAvailability} from './utils'

export const mapHeaderCarousel = (data = []) => {
  return (
    data
      ?.filter((item) => {
        const {exhibition} = item ?? {}
        const {photos = []} = exhibition ?? {}
        const [mainImage] = photos ?? []
        const {asset} = mainImage ?? {}
        return !!asset
      })
      ?.map((item) => {
        const {exhibition} = item ?? {}
        const {title, subtitle, photos = []} = exhibition ?? {}
        const [mainImage] = photos ?? []
        const {asset, alt} = mainImage ?? {}
        const imgSrc = asset ? builder.image(asset).url() : ''

        return {
          category: subtitle,
          media: {
            ImgElement: Image,
            type: MEDIA_TYPES.IMAGE,
            imgProps: {fill: true, url: '/', src: imgSrc, alt: alt},
          },
          title,
          linkCTA: {
            text: LEARN_MORE,
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
      ImgElement: Image,
      imgProps: {src: imgSrc, alt, fill: true},
    },
    category: subtitle,
    title,
    description,
    linkCTA: {
      text: LEARN_MORE,
      linkElement: 'a',
      url: '/',
    },
  }
}

export const mapArticlesGrid = (data = []) =>
  data
    ?.filter((item: any) => !!item.image.image.asset)
    ?.map((item: any) => {
      const imgSrc = !!item.image?.image?.asset ? builder.image(item.image.image.asset).url() : ''

      return {
        media: {
          type: MEDIA_TYPES.IMAGE,
          ImgElement: Image,
          imgProps: {url: '/', src: imgSrc, alt: item.image?.image?.alt, fill: true},
          aspectRatio: MEDIA_ASPECT_RATIOS['16:9'],
        },
        category: item.category,
        title: item.title,
        description: item.description,
        linkCTA: {text: 'View More', linkElement: 'a', url: '/'},
      }
    })

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
      ImgElement: Image,
      imgProps: {
        src: imgSrc,
        alt,
        fill: true,
      },
    },
  }
}

export const mapTabsLocations = (data: any) => {
  const mappedLocationsByCity =
    data?.reduce((prev: any, loc: any) => {
      const {address, name, photos, hours} = loc ?? {}

      const {city, state, zipCode, addressLine} = address ?? {}
      const [mainPhoto] = photos ?? []
      const {asset, alt} = mainPhoto ?? {}
      const imgSrc = asset ? builder.image(asset).url() : ''

      const currentTime = new Date()

      const availability = parseAvailability(hours, currentTime)?.some(
        (time: {from: Date; to: Date}) =>
          currentTime.getTime() <= time.to.getTime() && currentTime.getTime() >= time.from.getTime()
      )

      const cardLocation = {
        media: {
          type: MEDIA_TYPES.IMAGE,
          ImgElement: Image,
          aspectRatio: MEDIA_ASPECT_RATIOS['16:9'],
          imgProps: {
            src: imgSrc,
            alt,
            url: '/',
            fill: true,
            itemProp: 'image',
            property: 'image',
          },
        },
        title: (
          <span property="name" itemProp="name">
            {name}
          </span>
        ),
        secondaryTitle: (
          <>
            <span itemProp="streetAddress" property="streetAddress">
              {addressLine}
            </span>
            {'\n'}
            <span itemProp="addressRegion" property="addressRegion">
              {state}
            </span>
            ,{' '}
            <span itemProp="addressLocality" property="addressLocality">
              {city}
            </span>
            ,{' '}
            <span itemProp="postalCode" property="postalCode">
              {zipCode}
            </span>
          </>
        ),
        secondarySubtitle: availability ? 'Open' : 'Closed',
        property: 'address',
        typeof: 'PostalAddress',
        itemprop: 'address',
        itemscope: '',
        itemtype: 'https://schema.org/PostalAddress',
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
  return data
    ?.filter((item: any) => {
      const {exhibition, image, _type} = item ?? {}
      const isArticle = _type === 'article'
      const {photos = []} = exhibition ?? {}
      const [mainImage] = photos ?? []
      const {asset} = mainImage ?? (isArticle ? image?.image : null) ?? {}
      return !!asset
    })
    ?.map((item: any) => {
      const {
        exhibition,
        title: titleArticle,
        category,
        image,
        _type,
        externalURL,
        description,
        slug,
      } = item ?? {}
      const isArticle = _type === 'article'
      const {title, subtitle, photos = [], summary} = exhibition ?? {}
      const [mainImage] = photos ?? []
      const {asset, alt} = mainImage ?? (isArticle ? image?.image : null) ?? {}
      const imgSrc = asset ? builder.image(asset).url() : ''

      const url = _type == 'article' ? externalURL ?? slug?.current : '/'
      return {
        id: item._id,
        media: {
          type: 'image',
          aspectRatio: MEDIA_ASPECT_RATIOS['16:9'],
          ImgElement: Image,
          imgProps: {
            src: imgSrc,
            alt,
            fill: true,
          },
        },
        category: isArticle ? category : subtitle,
        title: isArticle ? titleArticle : title,
        titleType: TITLE_TYPES.H3,
        description: isArticle ? description : summary,
        linkCTA: {
          text: LEARN_MORE,
          linkElement: 'a',
          url,
        },
      }
    })
}

export const mapCardsGrid = (data: any[]) => {
  return data
    ?.filter((artwork) => {
      const {photos} = artwork ?? {}
      const [mainPicture] = photos ?? []
      const {asset} = mainPicture ?? {}
      return !!asset
    })
    ?.map((artwork) => {
      const {photos, artists, dimensions, title, dateSelection, medium, edition, _id, price} =
        artwork ?? {}
      const {year} = dateSelection ?? {}
      const [mainArtist] = artists ?? []
      const {fullName} = mainArtist ?? {}
      const [mainPicture] = photos ?? []
      const {asset, alt} = mainPicture ?? {}
      const imgSrc = asset ? builder.image(asset).url() : ''
      const framed =
        typeof artwork.framed === 'boolean'
          ? artwork.framed === true
            ? 'Framed'
            : 'Unframed'
          : undefined

      return {
        id: _id,
        media: {
          url: '/',
          type: MEDIA_TYPES.IMAGE,
          ImgElement: Image,
          imgProps: {
            src: imgSrc,
            alt,
            fill: true,
          },
        },
        artistName: fullName,
        artworkTitle: title,
        artworkYear: year,
        medium: medium,
        dimensions: dimensions,
        edition: edition,
        price: price,
        framed,
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
