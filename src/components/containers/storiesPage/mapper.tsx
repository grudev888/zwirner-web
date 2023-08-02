import {
  ButtonModes,
  INTERSTITIAL_TEXT_COLORS,
  MEDIA_ASPECT_RATIOS,
  MEDIA_OBJECT_FIT,
  MEDIA_TYPES,
  MEDIA_VIDEO_SOURCE_TYPES,
  SPLIT_TYPES,
} from '@zwirner/design-system'
import Image from 'next/image'

import {DzPortableText} from '@/common/components/portableText'
import {
  DAVID_ZWIRNER_BOOKS,
  EXPLORE_NOW,
  ONLINE_EXHIBITIONS_URL,
  PRE_ORDER_NOW,
} from '@/common/constants/commonCopies'
import {builder} from '@/sanity/imageBuilder'

export const heroMapper = (data: any) => {
  const {heroReference, heroCta} = data ?? {}
  const {action, fileURL, text} = heroCta ?? {}
  const [hero] = heroReference ?? []
  const {photos, title, slug} = hero ?? {}
  const [image] = photos ?? []

  const {asset, alt} = image ?? {}
  const imgSrc = asset ? builder.image(asset).url() : ''
  const exhibitionURL = `${ONLINE_EXHIBITIONS_URL}/${slug?.current ?? ''}`

  const isDownload = action === 'Download PDF'
  const CTA_URL = isDownload ? fileURL : exhibitionURL

  return {
    media: {
      url: exhibitionURL,
      type: MEDIA_TYPES.IMAGE,
      ImgElement: Image,
      imgProps: {
        src: imgSrc,
        alt,
        fill: true,
      },
    },
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
  const {image, text, title, url} = data ?? {}
  const {asset, alt} = image ?? {}
  const imgSrc = asset ? builder.image(asset).url() : ''

  return {
    type: SPLIT_TYPES.SHORT,
    reverse: true,
    data: {
      media: {
        url,
        ImgElement: Image,
        type: MEDIA_TYPES.IMAGE,
        imgProps: {
          src: imgSrc,
          alt,
          fill: true,
        },
      },
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

export const interstitialMap = (data: any) => {
  const {title, cta} = data ?? {}
  const {text} = cta ?? {}
  return {
    data: {
      split: false,
      title,
      primaryCta: {
        text,
        ctaProps: {
          mode: ButtonModes.DARK,
        },
      },
      textColor: INTERSTITIAL_TEXT_COLORS.BLACK,
    },
  }
}

const linksFromSource: any = {
  youtube: (externalVideo: string) => {
    const urlObject = externalVideo ? new URL(externalVideo).searchParams : null
    return {
      videoSourceType: MEDIA_VIDEO_SOURCE_TYPES.YOUTUBE,
      videoProps: {
        source: {
          type: 'video',
          sources: [
            {
              src: urlObject ? urlObject.get('v') : '',
              provider: 'youtube',
            },
          ],
        },
        options: {
          enabled: true,
          autoplay: true,
          muted: true,
          resetOnEnd: true,
          clickToPlay: false,
          toggleInvert: false,
          loop: {active: true},
          vimeo: {
            loop: true,
            autoplay: true,
            muted: false,
          },
        },
      },
    }
  },
  vimeo: (externalVideo: string) => {
    const urlObject = externalVideo ? new URL(externalVideo) : null
    const isEmbedded = urlObject ? ['player.vimeo.com'].includes(urlObject?.host) : false
    const isPublic = urlObject ? ['vimeo.com'].includes(urlObject?.host) : false
    const publicId = isPublic ? urlObject?.pathname?.replace(/\//, '') : ''

    return {
      videoSourceType: MEDIA_VIDEO_SOURCE_TYPES.VIMEO,
      videoProps: {
        source: {
          type: 'video',
          sources: [
            {
              src: isEmbedded ? externalVideo : publicId,
              provider: 'vimeo',
            },
          ],
        },
        options: {
          enabled: true,
          autoplay: true,
          muted: true,
          resetOnEnd: true,
          clickToPlay: false,
          toggleInvert: false,
          loop: {active: true},
          vimeo: {
            loop: true,
            autoplay: true,
            muted: false,
            gesture: 'media',
            playsinline: true,
            byline: false,
            portrait: false,
            title: false,
            speed: true,
            transparent: false,
            controls: false,
            background: true,
          },
        },
      },
    }
  },
  custom: (externalVideo: string) => {
    return {
      videoSourceType: MEDIA_VIDEO_SOURCE_TYPES.URL,
      videoProps: {
        width: '100%',
        height: '100%',
        autoPlay: 'autoplay',
        muted: true,
        loop: true,
        controls: false,
      },
      sourceSet: <source src={externalVideo} type="video/mp4" />,
    }
  },
}

export const featuredVideosMap = (data: any) => {
  const {featuredMedia, text, title, category, primaryCTA} = data ?? {}
  const {text: ctaText, link} = primaryCTA ?? {}
  const {href, blank} = link ?? {}
  const {externalVideo, provider, type, image} = featuredMedia ?? {}

  let media
  if (type === 'image') {
    const {asset, alt, url} = image ?? {}
    const imgSrc = asset ? builder.image(asset).url() : ''
    media = {
      url,
      ImgElement: Image,
      type: MEDIA_TYPES.IMAGE,
      imgProps: {
        src: imgSrc,
        alt,
        fill: true,
      },
    }
  }

  if (type === 'video') {
    const videoProps = linksFromSource[provider]?.(externalVideo)
    media = {
      type: MEDIA_TYPES.VIDEO,
      ...videoProps,
    }
  }

  return {
    type: SPLIT_TYPES.SHORT,
    data: {
      media,
      category,
      title,
      portableTextDescription: <DzPortableText portableProps={{value: text}} />,
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
  const {photos, title, description, booksUrl} = data ?? {}
  const [mainPhoto] = photos ?? []
  const {asset, alt} = mainPhoto ?? {}
  const imgSrc = asset ? builder.image(asset).url() : ''

  return {
    type: SPLIT_TYPES.SHORT,
    data: {
      media: {
        ImgElement: Image,
        type: MEDIA_TYPES.IMAGE,
        imgProps: {
          src: imgSrc,
          alt,
          fill: true,
        },
      },
      category: DAVID_ZWIRNER_BOOKS,
      title,
      portableTextDescription: <DzPortableText portableProps={{value: description}} />,
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
  const {asset, alt} = mainPicture ?? {}
  const imgSrc = asset ? builder.image(asset).url() : ''

  return {
    id: _id,
    media: {
      type: MEDIA_TYPES.IMAGE,
      imgProps: {
        src: imgSrc,
        alt: alt,
        fill: true,
      },
      ImgElement: Image,
      objectFit: MEDIA_OBJECT_FIT.COVER,
      aspectRatio: MEDIA_ASPECT_RATIOS['16:9'],
    },
    category: DAVID_ZWIRNER_BOOKS,
    title,
    portableTextDescription: <DzPortableText portableProps={{value: tagline}} />,
    linkCTA: {
      text: PRE_ORDER_NOW,
      linkElement: 'a',
      url: booksUrl,
    },
  }
}
