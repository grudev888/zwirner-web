type RecordData = Record<string, any>

export const mapArtworkData = (data: RecordData) => {
  return {
    artistName: data?.artists?.[0].fullName,
    edition: data?.edition,
    title: data?.title,
    medium: data?.medium,
    dimensions: data?.dimensions,
    year: data?.dateSelection?.year,
    description: data?.description,
    price: data?.price,
    currency: data?.currency,
    primaryCta: data?.artworkCTA?.CTAText && {
      text: data?.artworkCTA.CTAText,
    },
    secondaryCta: data?.artworkCTA?.SecondaryCTAText && {
      text: data?.artworkCTA.SecondaryCTAText,
    },
  }
}
