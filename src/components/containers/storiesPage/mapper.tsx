import {MEDIA_TYPES, SPLIT_TYPES} from '@zwirner/design-system'
import Image from 'next/image'

import {
  DAVID_ZWIRNER_BOOKS,
  EXHIBITIONS_URL,
  EXPLORE_NOW,
  PRE_ORDER_NOW,
} from '@/common/constants/commonCopies'
import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'
import {DzPortableText} from '@/components/wrappers/DzPortableText'
import {builder} from '@/sanity/imageBuilder'

export const heroMapper = (data: any) => {
  const {heroReference, heroCta} = data ?? {}
  const {action, fileURL, text} = heroCta ?? {}
  const [hero] = heroReference ?? []
  const {title, slug} = hero ?? {}

  const exhibitionURL = `${EXHIBITIONS_URL}/${slug?.current ?? ''}`
  const {media} = dzMediaMapper({data: hero, url: exhibitionURL, ImgElement: Image})

  const isDownload = action === 'Download PDF'
  const CTA_URL = isDownload ? fileURL : exhibitionURL

  return {
    media,
    linkCTA: {
      text: text ?? EXPLORE_NOW,
      linkElement: 'a',
      url: CTA_URL,
      linkProps: {
        openNewTab: isDownload,
        href: CTA_URL,
        children: null,
      },
    },
    title: title,
  }
}

export const utopiaFeatureMap = (data: any) => {
  const {text, title, url} = data ?? {}
  const {media} = dzMediaMapper({data, url, ImgElement: Image})

  return {
    type: SPLIT_TYPES.SHORT,
    reverse: true,
    data: {
      media,
      title,
      description: text,
      linkCTA: {
        text: 'Watch Now',
        linkElement: 'a',
        url,
      },
    },
  }
}

export const featuredVideosMap = (data: any) => {
  const {featuredMedia, text, title, category, primaryCTA} = data ?? {}
  const {text: ctaText, link} = primaryCTA ?? {}
  const {href, blank} = link ?? {}

  const {media} = dzMediaMapper({
    data: featuredMedia,
    ImgElement: Image,
  })

  return {
    type: SPLIT_TYPES.SHORT,
    data: {
      media,
      category,
      title,
      portableTextDescription: (
        <DzPortableText portableProps={{value: text}} builder={builder} ImgElement={Image} />
      ),
      linkCTA: {
        text: ctaText,
        linkElement: 'a',
        url: href,
        linkProps: {
          openNewTab: blank,
        },
      },
    },
  }
}

export const featuredPodcastMap = (data: any) => {
  const {title, description, spotifyUrl} = data ?? {}
  return {
    type: SPLIT_TYPES.SHORT,
    data: {
      media: {
        type: MEDIA_TYPES.PODCAST,
        url: spotifyUrl,
      },
      title,
      portableTextDescription: (
        <DzPortableText
          portableProps={{value: description}}
          customStyles={{
            normal: '!mx-0',
          }}
          builder={builder}
          ImgElement={Image}
        />
      ),
    },
    mediaContainerClass: 'bg-[#000092]',
  }
}

export const mapFeaturedBooks = (data: any = {}) => {
  const {_type} = data ?? {}
  const isCarousel = _type === 'carouselBooks'
  return {...(data ?? {}), isCarousel}
}

export const mapBookForSplit = (data: any) => {
  const {title, description, booksUrl} = data ?? {}
  const {media} = dzMediaMapper({data, ImgElement: Image})

  return {
    type: SPLIT_TYPES.SHORT,
    data: {
      media,
      category: DAVID_ZWIRNER_BOOKS,
      title,
      portableTextDescription: (
        <DzPortableText portableProps={{value: description}} builder={builder} ImgElement={Image} />
      ),
      linkCTA: {
        text: PRE_ORDER_NOW,
        linkElement: 'a',
        url: booksUrl,
      },
    },
  }
}

export const mapBookForCarousel = (data: any) => {
  const {title, tagline, photos, _id, booksUrl} = data ?? {}
  const [mainPicture] = photos ?? []

  const {media} = dzMediaMapper({data: mainPicture, ImgElement: Image})
  return {
    id: _id,
    media,
    category: DAVID_ZWIRNER_BOOKS,
    title,
    portableTextDescription: (
      <DzPortableText portableProps={{value: tagline}} builder={builder} ImgElement={Image} />
    ),
    linkCTA: {
      text: PRE_ORDER_NOW,
      linkElement: 'a',
      url: booksUrl,
    },
  }
}
