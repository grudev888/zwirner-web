import {MEDIA_ASPECT_RATIOS} from '@zwirner/design-system'
import Image from 'next/image'

import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'
import {safeText} from '@/common/utilsMappers/safe'
import {MediaTypes} from '@/sanity/types'

const mapMultipleArtworkCardForArticle = (data: any) => {
  const {
    artists,
    photos,
    title,
    displayCustomTitle,
    displayTitle,
    displayDate,
    dateSelection,
    _id,
  } = data ?? {}
  const [mainArtist] = artists ?? []
  const {fullName} = mainArtist ?? {}
  const [mainPhoto] = photos ?? []

  const {media} = dzMediaMapper({
    data: mainPhoto,
    ImgElement: Image,
    options: {
      aspectRatio: MEDIA_ASPECT_RATIOS['4:3'],
    },
  })

  const customTitleChildren = displayCustomTitle ? displayTitle?.[0]?.children : []

  const yearText = displayDate
    ? displayDate
    : `${dateSelection?.year ? `,${dateSelection?.year}` : ''}`

  const defaultTitleText = displayCustomTitle ? '' : `${title} ${yearText}`
  const text = [
    {
      _type: 'block',
      style: 'normal',
      _key: '0856c1d7642a',
      markDefs: [],
      children: [
        {
          _type: 'span',
          marks: [],
          text: `${fullName}
          ${defaultTitleText}`,
          _key: 'e7a6289d424e0',
        },
        ...customTitleChildren,
      ],
    },
  ]

  const safeDescription = safeText({text: text, key: 'description'})

  return {
    id: _id,
    media,
    ...safeDescription,
  }
}

export const getHeaderVariant = (data: any) => {
  const {header = []} = data ?? {}

  const headerObjects = header?.reduce(
    (prev: any, act: any) => {
      const prevCopy = {...prev}
      const {type, _type} = act ?? {}
      if (MediaTypes.IMAGE === type) {
        prevCopy.numberOfImages = prevCopy.numberOfImages + 1
        const {media, extras} = dzMediaMapper({
          data: act,
          ImgElement: Image,
        })
        const safeDescription = safeText({text: extras?.caption, key: 'description'})
        prevCopy.items = [...prevCopy.items, {media, ...safeDescription}]
      }
      if (_type === 'artwork') {
        const props = mapMultipleArtworkCardForArticle(act)
        prevCopy.numberOfArtWorks = prevCopy.numberOfArtWorks + 1
        prevCopy.items = [...prevCopy.items, props]
      }
      return prevCopy
    },
    {items: [], numberOfImages: 0, numberOfArtWorks: 0}
  )

  const isSimpleImage = headerObjects?.numberOfImages === 1
  const is1UpArtwork = headerObjects?.numberOfArtWorks === 1

  return {
    isSimpleImage,
    is1UpArtwork,
    isImageCarousel: headerObjects?.numberOfImages > 1,
    isArtworkCarousel: headerObjects?.numberOfArtWorks > 1,
    isMixedCarousel: headerObjects?.numberOfArtWorks > 0 && headerObjects?.numberOfImages > 0,
    items: is1UpArtwork || isSimpleImage ? headerObjects?.items[0] : headerObjects?.items,
  }
}
