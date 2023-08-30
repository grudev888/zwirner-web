import {capitalizeFirstLetter} from '@/utils/string/capitalizeFirstLetter'

type RecordData = Record<string, any>

export const mapArtworkData = (data: RecordData) => {
  return {
    artistName: data?.artists?.[0].fullName,
    artistSlug: data?.artists?.[0].artistPage?.slug?.current,
    year: data?.dateSelection?.year,
    copyrightInformation: data?.copyrightInformation,
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
