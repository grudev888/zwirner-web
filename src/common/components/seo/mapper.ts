import {DefaultSeoProps, NextSeoProps} from 'next-seo'

import {builder} from '@/sanity/imageBuilder'
import {GlobalSEOScheme} from '@/sanity/schema/documents/globalSEO'
import {PageSEOSchema} from '@/sanity/schema/objects/page/seo'

import {DEFAULT_SEO_PROPERTIES} from './constants'

export const defaultSeoMapper = (data: GlobalSEOScheme | undefined): DefaultSeoProps => {
  const {globalSEODescription, globalSEOImage, globalSEOTitle} = data ?? {}
  const {alt, asset} = globalSEOImage
  const imgSrc = asset ? builder.image(asset).url() : ''
  const title = globalSEOTitle ?? DEFAULT_SEO_PROPERTIES.title
  const description = globalSEODescription ?? DEFAULT_SEO_PROPERTIES?.description
  return {
    title,
    description,
    titleTemplate: DEFAULT_SEO_PROPERTIES?.titleTemplate,
    defaultTitle: DEFAULT_SEO_PROPERTIES?.defaultTitle,
    openGraph: {
      ...DEFAULT_SEO_PROPERTIES.openGraph,
      title,
      description,
      images: [
        {
          url: imgSrc,
          width: 800,
          height: 600,
          alt: alt,
          type: 'image/jpeg',
        },
      ],
    },
  }
}

export const perPageSeoMapper = (data: PageSEOSchema): NextSeoProps => {
  const {
    pageTitle,
    metaDescription,
    canonicalURL,
    robotsNoIndex,
    robotsNoFollow,
    imageMeta,
    socialTitle,
    socialDescription,
  } = data ?? {}

  const {alt, asset} = imageMeta ?? {}
  const imgSrc = asset ? builder.image(asset).url() : ''

  const title = pageTitle ?? DEFAULT_SEO_PROPERTIES.title
  const description = metaDescription ?? DEFAULT_SEO_PROPERTIES?.description
  const canonical = canonicalURL?.current
    ? `${DEFAULT_SEO_PROPERTIES?.canonical}${canonicalURL?.current}`
    : DEFAULT_SEO_PROPERTIES?.canonical
  const noindex = robotsNoIndex ?? false
  const nofollow = robotsNoFollow ?? false
  return {
    title,
    description,
    canonical,
    noindex,
    nofollow,
    openGraph: {
      ...DEFAULT_SEO_PROPERTIES.openGraph,
      title: socialTitle ?? title,
      description: socialDescription ?? description,
      images: [
        {
          url: imgSrc,
          width: 800,
          height: 600,
          alt: alt,
          type: 'image/jpeg',
        },
      ],
    },
  }
}
