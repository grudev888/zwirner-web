export const mapListItems = (data: any[]) => {
  return data?.map((artistPage) => ({
    text: artistPage?.artist?.fullName,
    lastName: artistPage?.artist?.lastName,
    firstName: artistPage?.artist?.firstName,
    url: artistPage?.slug?.current,
  }))
}
