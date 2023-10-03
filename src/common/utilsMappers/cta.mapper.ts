import {BUTTON_VARIANTS, ButtonModes} from '@zwirner/design-system'
import Link from 'next/link'

import {BUY_NOW, LEARN_MORE} from '@/common/constants/commonCopies'
import {CTAClickEvent} from '@/events/CTAClickEvent'
import {CtaActions, CTASchemaType, DzCardSchemaProps} from '@/sanity/types'

enum ARTWORK_AVAILABILITY {
  UNABLE = 'unavailable',
  AVAILABLE = 'available',
}
interface CtaMapperProps {
  data: DzCardSchemaProps
  props?: any
}
interface CtaMapperInterstitial {
  data: CTASchemaType
  props?: any
}

const handleCTAClick = (action?: CtaActions) => {
  if (action) {
    window.document.dispatchEvent(CTAClickEvent(action))
  }
}

export const ctaMapper = ({data, props}: CtaMapperProps) => {
  const {primaryCTA, secondaryCTA} = data ?? {}
  const {action, link, text} = primaryCTA ?? {}
  // TODO unify CTA inside the studio
  const {blank, href} = (link as any) ?? {}
  const {action: secondaryAction, text: secondaryText} = secondaryCTA ?? {}
  const primaryActionIsLink = action === CtaActions.LINK_CONTENT || action === CtaActions.LINK

  const {url, hideSecondary = false, defaultLinkText} = props ?? {}

  const primaryCTAMap =
    primaryCTA && !primaryActionIsLink
      ? {
          primaryCTA: {
            text: text,
            ctaProps: {
              onClick: () => {
                handleCTAClick(action)
              },
              mode: ButtonModes.DARK,
            },
          },
        }
      : {}

  const linkCTAMap = primaryActionIsLink
    ? {
        linkCTA: {
          text: text ?? defaultLinkText ?? LEARN_MORE,
          linkElement: Link,
          url: action === CtaActions.LINK_CONTENT ? url : href,
          openNewTab: blank ?? false,
        },
      }
    : {}

  const secondaryCTAMap =
    secondaryCTA && !hideSecondary
      ? {
          secondaryCTA: {
            text: secondaryText,
            ctaProps: {
              variant: BUTTON_VARIANTS.TERTIARY,
              onClick: () => {
                handleCTAClick(secondaryAction)
              },
            },
          },
        }
      : {}
  return {
    ...primaryCTAMap,
    ...linkCTAMap,
    ...secondaryCTAMap,
  }
}

// TODO unify ctas everywhere
export const ctaMapperInterstitial = ({data, props}: CtaMapperInterstitial) => {
  const {action, link, text} = data ?? {}
  // TODO unify CTA inside the studio
  const {blank, href} = (link as any) ?? {}
  const primaryActionIsLink = action === CtaActions.LINK_CONTENT || action === CtaActions.LINK
  const {url = false, customAction} = props ?? {}

  const primaryCTAMap = text
    ? {
        primaryCta: {
          text: text,
          ctaProps: {
            onClick: (ctaProps: any) => {
              if (customAction && typeof customAction === 'function') {
                customAction(action, ctaProps)
              } else {
                handleCTAClick(action)
              }
            },
          },
        },
      }
    : {}

  const linkCTAMap =
    text && primaryActionIsLink
      ? {
          linkCTA: {
            text: text,
            linkElement: Link,
            url: href ?? url,
            openNewTab: blank,
          },
        }
      : {}

  return {
    ...primaryCTAMap,
    ...linkCTAMap,
  }
}

export const artworkCTAMapper = (ctaData: any, availability: ARTWORK_AVAILABILITY) => {
  // If Artwork is available to Purchase, the Primary CTA should be ‘Buy Now’ and ‘Inquire’ moves to the Tertiary CTA styling
  const {CTA, CTAText, SecondaryCTAText, secondaryCTA} = ctaData ?? {}
  const isAvailableToPurchase = availability === ARTWORK_AVAILABILITY.AVAILABLE
  const primaryCTAText = isAvailableToPurchase ? BUY_NOW : CTAText
  const primaryCTAMap =
    CTAText && CTA
      ? {
          primaryCTA: {
            text: primaryCTAText,
            ctaProps: {
              onClick: () => {
                handleCTAClick(CTA)
              },
            },
          },
        }
      : {}
  const secondaryCTAMap =
    SecondaryCTAText && secondaryCTA
      ? {
          secondaryCTA: {
            text: SecondaryCTAText,
            ctaProps: {
              variant: BUTTON_VARIANTS.TERTIARY,
              onClick: () => {
                handleCTAClick(secondaryCTA)
              },
            },
          },
        }
      : {}

  return {
    ...primaryCTAMap,
    ...secondaryCTAMap,
  }
}
