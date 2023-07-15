import {ButtonModes, INTERSTITIAL_TEXT_COLORS} from '@zwirner/design-system'

export const mapListItems = (data: any[]) => {
  return data?.map((artistPage) => ({
    text: artistPage?.artist?.fullName,
    lastName: artistPage?.artist?.lastName,
    firstName: artistPage?.artist?.firstName,
    url: artistPage?.slug?.current,
  }))
}

export const interstitialMap = (data: any) => {
  const {title, cta} = data ?? {}
  const {text} = cta ?? {}
  return {
    data: {
      fullWidth: true,
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
