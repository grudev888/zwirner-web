import {capitalizeFirstLetter} from '@/utils/string/capitalizeFirstLetter'

type RecordData = Record<string, any>

// TODO: discuss why we need it
export const mapArtworkData = (data: RecordData) => {
  return {
    artistName: data?.artists?.[0].fullName,
    artistSlug: data?.artists?.[0].artistPage?.slug?.current,
    artworkType: data?.artworkType,
    edition: data?.edition,
    title: data?.title,
    medium: data?.medium,
    dimensions: data?.dimensions,
    displayDate: data?.displayDate,
    year: data?.dateSelection?.year,
    description: data?.description,
    price: data?.price,
    currency: data?.currency,
    productInformation: data?.productInformation,
    salesInformation: data?.salesInformation,
    copyrightInformation: data?.copyrightInformation,
    displayCustomTitle: data?.displayCustomTitle,
    additionalCaption: data?.additionalCaption,
    framedDimensions: data?.framedDimensions,
    framed: data?.framed,
    primaryCta: data?.artworkCTA?.CTA &&
      data?.artworkCTA?.CTA !== 'none' && {
        text: data?.artworkCTA.CTAText || capitalizeFirstLetter(data?.artworkCTA?.CTA),
      },
    secondaryCta: data?.artworkCTA?.secondaryCTA &&
      data?.artworkCTA?.secondaryCTA !== 'none' && {
        text:
          data?.artworkCTA.SecondaryCTAText ||
          capitalizeFirstLetter(data?.artworkCTA?.secondaryCTA),
      },
  }
}
