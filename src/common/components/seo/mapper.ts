import {DefaultSeoProps, NextSeoProps} from 'next-seo'

import {builder} from '@/sanity/imageBuilder'
import {GlobalSEOScheme} from '@/sanity/schema/documents/globalSEO'
import {PageSEOSchema} from '@/sanity/schema/objects/page/seo'

import {DEFAULT_SEO_PROPERTIES} from './constants'

export const defaultSeoMapper = (data: GlobalSEOScheme | undefined): DefaultSeoProps => {
  const {globalSEODescription, globalSEOImage, globalSEOTitle} = data ?? {}
  const {alt, asset} = globalSEOImage ?? {}
  const imgSrc = asset ? builder.image(asset).url() : ''
  const title = globalSEOTitle ?? DEFAULT_SEO_PROPERTIES.title
  const description = globalSEODescription ?? DEFAULT_SEO_PROPERTIES?.description
  const imageOG = imgSrc
    ? {
        images: [
          {
            url: imgSrc,
            width: 800,
            height: 600,
            alt: alt,
            type: 'image/jpeg',
          },
        ],
      }
    : {}
  return {
    title,
    description,
    titleTemplate: DEFAULT_SEO_PROPERTIES?.titleTemplate,
    defaultTitle: DEFAULT_SEO_PROPERTIES?.defaultTitle,
    openGraph: {
      ...DEFAULT_SEO_PROPERTIES.openGraph,
      title,
      description,
      ...imageOG,
    },
    twitter: DEFAULT_SEO_PROPERTIES.twitter,
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

  const title = pageTitle ? {title: pageTitle} : {}
  const description = metaDescription ? {description: metaDescription} : {}
  const canonical = canonicalURL?.current
    ? `${DEFAULT_SEO_PROPERTIES?.canonical}${canonicalURL?.current}`
    : DEFAULT_SEO_PROPERTIES?.canonical

  const titleOG = socialTitle? {title:socialTitle}: {}
  const descriptionOG = socialDescription? {description:socialDescription}: {}

  const noindex = robotsNoIndex ?? false
  const nofollow = robotsNoFollow ?? false

  const imageOG = imgSrc
    ? {
        images: [
          {
            url: imgSrc,
            width: 800,
            height: 600,
            alt: alt,
            type: 'image/jpeg',
          },
        ],
      }
    : {}
  return {
    ...title,
    ...description,
    canonical,
    noindex,
    nofollow,
    openGraph: {
      ...titleOG,
      ...descriptionOG,
      ...imageOG,
    },

  }
}
