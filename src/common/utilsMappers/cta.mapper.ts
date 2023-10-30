import {BUTTON_VARIANTS, ButtonModes} from '@zwirner/design-system'

import {BUY_NOW, LEARN_MORE} from '@/common/constants/commonCopies'
import {CTAClickEvent} from '@/events/CTAClickEvent'
import {CtaActions} from '@/sanity/types'

enum ARTWORK_AVAILABILITY {
  UNABLE = 'unavailable',
  AVAILABLE = 'available',
}

// TODO UNIFY CTA'S & TYPES FOR THEM
interface CtaMapperProps {
  data: any
  props?: any
}

// TODO UNIFY CTA'S & TYPES FOR THEM
interface CtaMapperInterstitial {
  data: any
  props?: any
}

const handleCTAClick = (action?: CtaActions, extraProps?: any) => {
  if (action) {
    window.document.dispatchEvent(CTAClickEvent(action, extraProps))
  }
}

const isExternal = ['www.', 'https://', '.com']

const handleLink = ({router, linkedHref, primaryActionIsLink, blank}: any) => {
  if (router && linkedHref && primaryActionIsLink) {
    if (isExternal.some((e) => linkedHref.includes(e))) {
      if (blank) {
        window.open(linkedHref, '_blank')
      } else {
        router.replace(linkedHref)
      }
    } else {
      router.push(linkedHref)
    }
  }
}

export const ctaMapper = ({data, props}: CtaMapperProps) => {
  const {primaryCTA, secondaryCTA} = data ?? {}
  const {action, link, text, handleClick} = primaryCTA ?? {}
  // TODO unify CTA inside the studio
  const {blank, href} = (link as any) ?? {}
  const {action: secondaryAction, text: secondaryText} = secondaryCTA ?? {}
  const primaryActionIsLink = action === CtaActions.LINK_CONTENT || action === CtaActions.LINK

  const {
    url,
    hideSecondary = false,
    defaultLinkText,
    ctaActionProps: extraProps,
    linkAsButton,
    router,
  } = props ?? {}

  const linkedHref = action === CtaActions.LINK_CONTENT ? url : href

  const primaryCTAMap =
    primaryCTA && (linkAsButton || !primaryActionIsLink)
      ? {
          primaryCTA: {
            text: text,
            ctaProps: {
              onClick: () => {
                handleLink({router, primaryActionIsLink, blank, linkedHref})
                if (handleClick) handleClick(action)
                handleCTAClick(action, extraProps)
              },
              mode: ButtonModes.DARK,
            },
          },
        }
      : {}
  const linkCTAMap =
    primaryActionIsLink && !linkAsButton
      ? {
          linkCTA: {
            text: text ?? defaultLinkText ?? LEARN_MORE,
            url: linkedHref,
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
  const {action, text, handleClick, linkedContent, link} = data ?? {}
  // TODO unify CTA inside the studio
  const {router} = props ?? {}
  const primaryActionIsLink = action === CtaActions.LINK_CONTENT || action === CtaActions.LINK
  const {blank, href} = (link as any) ?? {}
  const linkedHref = action === CtaActions.LINK_CONTENT ? linkedContent : href

  const primaryCTAMap = text
    ? {
        primaryCta: {
          text: text,
          ctaProps: {
            onClick: () => {
              handleLink({router, primaryActionIsLink, blank, linkedHref})

              // TODO Unify handle click && custom Action
              if (handleClick) {
                handleClick(action)
              } else {
                handleCTAClick(action)
              }
            },
          },
        },
      }
    : {}

  return {
    ...primaryCTAMap,
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
