import {MEDIA_ASPECT_RATIOS} from '@zwirner/design-system'
import Image from 'next/image'

import {LEARN_MORE, READ_MORE, VIEW_MORE} from '@/common/constants/commonCopies'
import {mapSingleDateFormat} from '@/common/utilsMappers/date.mapper'
import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'
import {safeText} from '@/common/utilsMappers/safe'
import {ArticleCategories, ArticleTypes, MediaTypes} from '@/sanity/types'

export const cardContentArticle = ({data, props}: any) => {
  const {
    category,
    title,
    image,
    header,
    description,
    location,
    subtitle,
    slug,
    externalURL,
    type,
    publishDate,
    displayDate,
    primarySubtitle,
  } = data ?? {}

  const {current} = slug ?? {}
  const {
    primarySubtitle: primarySubtitleOverride,
    secondarySubtitle,
    secondaryTitle: secondaryTitleOverride,
    additionalInformation,
    mediaOverride,
    isSmall,
  } = props ?? {}

  const {type: headerImageType} = header?.[0] ?? {}
  const sourceImage = Object.values(MediaTypes).includes(headerImageType)
    ? header?.[0]
    : header?.[0]?.photos?.[0]

  const {media, hideImage, hideMedia} = dzMediaMapper({
    override: mediaOverride,
    data: sourceImage ?? image,
    ImgElement: Image,
    options: {
      aspectRatio: isSmall ? MEDIA_ASPECT_RATIOS['4:3'] : MEDIA_ASPECT_RATIOS['16:9'],
    },
  })
  const additionalInformationText = safeText({
    key: 'additionalInformation',
    text: additionalInformation,
  })
  const descriptionText = safeText({key: 'description', text: description})
  const articleUrl = type === ArticleTypes.EXTERNAL ? externalURL : current ?? '/'

  const date = mapSingleDateFormat(publishDate)
  const linkText = externalURL
    ? `${LEARN_MORE} at ${new URL(externalURL)?.host?.replace('www.', '')}`
    : VIEW_MORE

  let cardProps = {}

  // RULES FOR ARTICLES

  const isExternalNews = type === ArticleTypes.EXTERNAL
  const isSelectedPressVariant = type === ArticleTypes.PRESS
  const isPressArticle = category === ArticleCategories.PRESS
  const isEventNews = category === ArticleCategories.EVENT
  const isMuseumHighlight = category === ArticleCategories.MUSEUM_HIGHLIGHTS
  const isMuseumExhibition = category === ArticleCategories.MUSEUM_EXHIBITION

  const isNewsArticle = type === ArticleTypes.INTERNAL || type === ArticleTypes.EXTERNAL

  if (isSelectedPressVariant) {
    cardProps = {
      media,
      // show only for certain pages
      hideImage: true,
      hideMedia,
      title,
      secondaryTitle: subtitle,
      secondarySubtitle: date,
      cardLink: {href: articleUrl, openNewTab: false},
      linkCTA: {
        text: READ_MORE,
        url: articleUrl,
        openNewTab: false,
      },
    }
  } else if (isPressArticle) {
    cardProps = {
      media,
      hideImage: hideImage,
      hideMedia,
      category,
      title,
      secondaryTitle: subtitle ?? secondaryTitleOverride,
      subtitle: primarySubtitle ?? primarySubtitleOverride,
      linkCTA: {
        text: READ_MORE,
        url: articleUrl,
        openNewTab: isExternalNews,
      },
      cardLink: {href: articleUrl, openNewTab: isExternalNews},
      ...(descriptionText ?? {}),
    }
  } else if (isEventNews) {
    const {name} = location ?? {}
    cardProps = {
      media,
      hideImage,
      hideMedia,
      category,
      subtitle: primarySubtitle,
      secondarySubtitle: displayDate ?? date,
      secondaryTitle: name,
      title,
      cardLink: {href: articleUrl, openNewTab: isExternalNews},
      linkCTA: {
        text: READ_MORE,
        url: articleUrl,
        openNewTab: isExternalNews,
      },
      ...(descriptionText ?? {}),
    }
  } else if (isMuseumHighlight) {
    cardProps = {
      title,
      media,
      hideImage,
      hideMedia,
      category,
      subtitle: primarySubtitle ?? primarySubtitleOverride,
      secondaryTitle: subtitle ?? secondaryTitleOverride,
      secondarySubtitle: displayDate ?? date,
      cardLink: {href: articleUrl, openNewTab: isExternalNews},
      linkCTA: {
        text: linkText,
        url: articleUrl,
        linkProps: {openNewTab: isExternalNews},
      },
    }
  } else if (isMuseumExhibition) {
    cardProps = {
      title,
      media,
      hideImage,
      hideMedia,
      category,
      subtitle: primarySubtitle ?? primarySubtitleOverride,
      cardLink: {href: articleUrl, openNewTab: isExternalNews},
      ...(descriptionText ?? {}),
      linkCTA: {
        text: linkText,
        url: articleUrl,
        linkProps: {openNewTab: isExternalNews},
      },
    }
  } else if (isNewsArticle) {
    cardProps = {
      media,
      hideImage,
      hideMedia,
      category,
      title,
      subtitle: primarySubtitle,
      secondaryTitle: subtitle,
      secondarySubtitle,
      cardLink: {href: articleUrl, openNewTab: isExternalNews},
      linkCTA: {
        text: READ_MORE,
        url: articleUrl,
      },
      ...(descriptionText ?? {}),
      ...(additionalInformationText ?? {}),
    }
  }
  return cardProps
}
