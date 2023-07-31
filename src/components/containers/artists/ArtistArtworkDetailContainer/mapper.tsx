export const mapArtistName = (data: Record<string, any>) => {
  return data?.artists?.[0].fullName
}

export const mapArtworkTitle = (data: Record<string, any>) => {
  return data?.title
}

export const mapArtworkMedium = (data: Record<string, any>) => {
  return data?.medium
}

export const mapArtworkDimensions = (data: Record<string, any>) => {
  return data?.dimensions
}
