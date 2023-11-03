import {CARD_TYPES} from '@zwirner/design-system'
import Image from 'next/image'

import {EXHIBITION, EXHIBITIONS_URL} from '@/common/constants/commonCopies'
import {ctaMapper} from '@/common/utilsMappers/cta.mapper'
import {mapExhibitionStatus} from '@/common/utilsMappers/date.mapper'
import {dzMediaMapper} from '@/common/utilsMappers/image.mapper'
import {safeText} from '@/common/utilsMappers/safe'

export const exhibitionCommonMapper = ({data, props}: any) => {
  const {cardSize, isOnGrid, mediaOverride} = props ?? {}
  const {
    subtitle,
    title,
    heroMedia,
    cardViewMedia,
    locations,
    summary,
    slug,
    eyebrow,
    isDisabled = false,
  } = data ?? {}
  const [primaryLocation] = locations ?? []
  const {name} = primaryLocation ?? {}
  const {current} = slug ?? {}
  const heroMediaSource = Object.keys(heroMedia ?? {}).length > 0 ? heroMedia : null
  const cardViewMediaSource = Object.keys(cardViewMedia ?? {}).length > 0 ? cardViewMedia : null
  const {media, hideImage} = dzMediaMapper({
    override: cardViewMediaSource ?? mediaOverride,
    data: heroMediaSource ?? data,
    ImgElement: Image,
  })
  const {status} = mapExhibitionStatus(data)
  const summaryText = safeText({key: 'description', text: summary})
  const ctasOverrides = ctaMapper({
    data: props,
    props: {url: current ?? EXHIBITIONS_URL, hideSecondary: true},
  })
  const cardLinkOnGrid = isOnGrid
    ? {
        cardLink: {
          href: current ?? EXHIBITIONS_URL,
        },
      }
    : {}
  return {
    type: CARD_TYPES.CONTENT,
    data: {
      media,
      isDisabled,
      size: cardSize,
      category: eyebrow ?? EXHIBITION,
      title: title,
      subtitle: subtitle,
      secondaryTitle: name,
      secondarySubtitle: status,
      enableZoom: true,
      hideImage,
      ...cardLinkOnGrid,
      ...(summaryText ?? {}),
      ...(ctasOverrides ?? {}),
    },
  }
}
