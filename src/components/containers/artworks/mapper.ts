export const artworkMapper = (data: any) => {
  const {title} = data ?? {}

  return {
    title: title,
  }
}
