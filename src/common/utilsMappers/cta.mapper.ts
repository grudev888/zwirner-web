import {BUTTON_VARIANTS, ButtonModes} from '@zwirner/design-system'
import Router from 'next/router'

import {CTA, CTA_TEXT} from '@/common/constants/cart'
import {LEARN_MORE} from '@/common/constants/commonCopies'
import {CTAClickEvent} from '@/events/CTAClickEvent'
import {CtaActions, CTASchemaType} from '@/sanity/types'

import {SUBSCRIBE_METHOD} from '../constants/subscribe'
import {GTMExitLinkEvent} from '../utils/gtm/gtmExitLinkEvent'

// TODO UNIFY CTA'S & TYPES FOR THEM
interface CtaMapperProps {
  data: any
  props?: any
}

// TODO UNIFY CTA'S & TYPES FOR THEM
interface CtaMapperInterstitial {
  data: any
  props?: any
  secondaryProps?: any
}

const handleCTAClick = (action?: CtaActions, extraProps?: any) => {
  if (action) {
    window.document.dispatchEvent(CTAClickEvent(action, extraProps))
  }
}

const externalFlags = ['www.', 'https://', '.com']
const internalFlags = ['.davidzwirner.com', '.zwirner.dev', '.zwirner.tech']

const handleLink = ({linkedHref, action, blank, downloadDoc, identifier}: any) => {
  const linkInternalContent = action === CtaActions.LINK_CONTENT
  const linkCustomUrl = action === CtaActions.LINK || action === CtaActions.CUSTOM
  const downloadPdf = action === CtaActions.DOWNLOAD_PDF

  if (
    ![
      CtaActions.LINK_CONTENT,
      CtaActions.LINK,
      CtaActions.DOWNLOAD_PDF,
      CtaActions.CUSTOM,
    ].includes(action)
  )
    return

  if ((linkCustomUrl && blank) || downloadPdf) {
    GTMExitLinkEvent(identifier, linkedHref)
    return window.open(downloadPdf ? downloadDoc : linkedHref, '_blank')
  }

  if (!Router || !linkedHref) return

  if (linkInternalContent) {
    return Router.push(linkedHref)
  }

  if (
    externalFlags.some((e) => linkedHref.includes(e)) &&
    !internalFlags.some((e) => linkedHref.includes(e))
  ) {
    GTMExitLinkEvent(identifier, linkedHref)
    return Router.replace(linkedHref)
  }
  return Router.push(linkedHref)
}

export const ctaMapper = ({data, props}: CtaMapperProps) => {
  const {primaryCTA, secondaryCTA} = data ?? {}
  const {action, link, text, handleClick, downloadDoc} = primaryCTA ?? {}
  // TODO unify CTA inside the studio
  const {blank, href} = (link as any) ?? {}
  const {action: secondaryAction, text: secondaryText, link: secondaryLink} = secondaryCTA ?? {}
  const {blank: secondaryBlank, href: secondaryHref} = (secondaryLink as any) ?? {}
  const primaryActionIsLink = action === CtaActions.LINK_CONTENT || action === CtaActions.LINK

  const {
    url,
    hideSecondary = false,
    defaultLinkText,
    ctaActionProps,
    secondaryCtaActionProps,
    linkAsButton,
  } = props ?? {}

  const linkedHref = action === CtaActions.LINK_CONTENT ? url : href

  const primaryCTAMap =
    primaryCTA && (linkAsButton || !primaryActionIsLink)
      ? {
          primaryCTA: {
            text: text,
            ctaProps: {
              onClick: () => {
                handleLink({action, blank, linkedHref, downloadDoc, identifier: text})
                if (handleClick) {
                  handleClick(action)
                }
                handleCTAClick(action, ctaActionProps)
              },
              disabled: action === CtaActions.SOLD_OUT,
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
                handleLink({
                  action: secondaryAction,
                  blank: secondaryBlank,
                  linkedHref: secondaryHref,
                  identifier: secondaryText,
                })
                handleCTAClick(secondaryAction, secondaryCtaActionProps)
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
export const ctaMapperInterstitial = ({data}: CtaMapperInterstitial) => {
  const {action, text, handleClick, linkedContent, link, downloadDoc} = data ?? {}
  // TODO unify CTA inside the studio
  const {blank, href} = (link as any) ?? {}
  const linkedHref = action === CtaActions.LINK_CONTENT ? linkedContent : href

  const primaryCTAMap = text
    ? {
        primaryCta: {
          text: text,
          ctaProps: {
            onClick: () => {
              handleLink({
                action,
                downloadDoc,
                blank,
                linkedHref,
                identifier: text,
              })

              // TODO Unify handle click && custom Action
              if (handleClick) {
                handleClick(action)
              } else {
                handleCTAClick(action, {ctaText: text, method: SUBSCRIBE_METHOD.POPUP})
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

export const artworkCTAMapper = (data: any, product: any) => {
  const {artworkCTA} = data ?? {}
  let primaryCTA!: Omit<CTASchemaType, 'type'> & {disabled?: boolean}
  let secondaryCTA!: Omit<CTASchemaType, 'type'> & {disabled?: boolean}

  switch (artworkCTA?.CTA) {
    case CTA.ECOMM:
      if (product)
        primaryCTA = {
          action: product.variants[0].store.inventory.isAvailable
            ? CtaActions.ECOMM
            : CtaActions.SOLD_OUT,
          text: !product.variants[0].store.inventory.isAvailable
            ? CTA_TEXT.SOLD_OUT
            : artworkCTA?.CTAText || CTA_TEXT.PURCHASE,
          disabled: !product.variants[0].store.inventory.isAvailable,
        }
      break
    case CTA.SOLDOUT:
      primaryCTA = {
        action: CtaActions.SOLD_OUT,
        text: artworkCTA?.CTAText || CTA_TEXT.SOLD_OUT,
        disabled: true,
      }
      break
    case CTA.INQUIRE:
      primaryCTA = {
        action: CtaActions.INQUIRE,
        text: artworkCTA?.CTAText || CTA_TEXT.INQUIRE,
      }
      break
    case CTA.CUSTOM:
      primaryCTA = {
        action: CtaActions.CUSTOM,
        text: artworkCTA?.CTAText,
        link: {href: artworkCTA?.CTALink, blank: true},
      }
      break
    default:
      break
  }

  if (artworkCTA?.secondaryCTA == CTA.INQUIRE) {
    secondaryCTA = {
      action: CtaActions.INQUIRE,
      text: artworkCTA?.SecondaryCTAText || CTA_TEXT.INQUIRE,
    }
  } else if (artworkCTA?.secondaryCTA == CTA.CUSTOM) {
    secondaryCTA = {
      action: CtaActions.CUSTOM,
      text: artworkCTA?.SecondaryCTAText,
      link: {href: artworkCTA?.SecondaryCTALink, blank: true},
    }
  }

  return {
    primaryCTA,
    secondaryCTA,
  }
}
