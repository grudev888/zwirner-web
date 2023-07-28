import {MEDIA_ASPECT_RATIOS, TITLE_TYPES} from '@zwirner/design-system'
import Image from 'next/image'

import {LEARN_MORE} from '@/common/constants/commonCopies'
import {dzMediaMapper, validateImage} from '@/common/utilsMappers/image.mapper'
import {safeText} from '@/common/utilsMappers/safe'

import {parseAvailability} from './utils'

export const mapHeaderCarousel = (data = []) => {
  return (
    data
      ?.filter((item) => {
        const {exhibition} = item ?? {}
        return validateImage(exhibition)
      })
      ?.map((item) => {
        const {exhibition} = item ?? {}
        const {title, subtitle} = exhibition ?? {}

        const {media} = dzMediaMapper({data: exhibition, ImgElement: Image})

        return {
          category: subtitle,
          media,
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
  const {title, subtitle, description} = exhibition ?? {}

  const {media} = dzMediaMapper({data: exhibition, ImgElement: Image})

  return {
    media,
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
      const {media} = dzMediaMapper({
        data: item,
        ImgElement: Image,
        options: {aspectRatio: MEDIA_ASPECT_RATIOS['16:9']},
      })

      return {
        media,
        category: item.category,
        title: item.title,
        description: item.description,
        linkCTA: {text: 'View More', linkElement: 'a', url: '/'},
      }
    })
export const mapInterstitialComponents = (data: any) => {
  const {ctaOverride, imageOverride, titleOverride, subtitleOverride} = data ?? {}

  const {media} = dzMediaMapper({data: {image: imageOverride}, ImgElement: Image})
  return {
    fullWidth: true,
    split: false,
    title: titleOverride,
    description: subtitleOverride,
    primaryCta: {
      text: ctaOverride,
    },
    media,
  }
}

export const mapTabsLocations = (data: any) => {
  const mappedLocationsByCity =
    data?.reduce((prev: any, loc: any) => {
      const {address, name, hours} = loc ?? {}

      const {city, state, zipCode, addressLine} = address ?? {}

      const {media} = dzMediaMapper({
        data: loc,
        ImgElement: Image,
        options: {
          aspectRatio: MEDIA_ASPECT_RATIOS['16:9'],
        },
        extraImgProps: {
          itemProp: 'image',
          property: 'image',
        },
      })

      const currentTime = new Date()

      const availability = parseAvailability(hours, currentTime)?.some(
        (time: {from: Date; to: Date}) =>
          currentTime.getTime() <= time.to.getTime() && currentTime.getTime() >= time.from.getTime()
      )

      const cardLocation = {
        media,
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
        itemProp: 'address',
        itemScope: '',
        itemType: 'https://schema.org/PostalAddress',
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
        _type,
        externalURL,
        description,
        slug,
      } = item ?? {}
      const isArticle = _type === 'article'
      const {title, subtitle, summary} = exhibition ?? {}

      const sharedMediaOptions = {aspectRatio: MEDIA_ASPECT_RATIOS['16:9']}
      const {media: exhibitionMedia} = dzMediaMapper({
        data: exhibition,
        ImgElement: Image,
        options: sharedMediaOptions,
      })
      const {media: articleMedia} = dzMediaMapper({
        data: item,
        ImgElement: Image,
        options: sharedMediaOptions,
      })

      const url = _type == 'article' ? externalURL ?? slug?.current : '/'
      return {
        id: item._id,
        media: isArticle ? articleMedia : exhibitionMedia,
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
    ?.filter((artwork) => validateImage(artwork))
    ?.map((artwork) => {
      const {artists, dimensions, title, dateSelection, medium, edition, _id, price} = artwork ?? {}
      const {year} = dateSelection ?? {}
      const [mainArtist] = artists ?? []
      const {fullName} = mainArtist ?? {}

      const framed =
        typeof artwork.framed === 'boolean'
          ? artwork.framed === true
            ? 'Framed'
            : 'Unframed'
          : undefined

      const {media} = dzMediaMapper({data: artists, ImgElement: Image})
      const dimensionText = safeText({key: 'dimensions', text: dimensions})
      return {
        id: _id,
        media,
        artistName: fullName,
        artworkTitle: title,
        artworkYear: year,
        medium: medium,
        ...(dimensionText ?? {}),
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
