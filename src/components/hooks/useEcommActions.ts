import {useCart} from '@shopify/hydrogen-react'
import {AttributeInput} from '@shopify/hydrogen-react/storefront-api-types'

import useDzToasts from '@/components/hooks/useDzToasts'
import {ArtworkDataType} from '@/sanity/queries/artworks/artworkData'
import {getMaxQty} from '@/storefront/services/cart.service'

import {mapArtworkData, photosGrid} from '../containers/artworks/artwork/mapper'

const useEcommActions = () => {
  const {linesAdd, lines} = useCart()
  const {addToast} = useDzToasts()
  const handleLineAdd = async (artwork: ArtworkDataType) => {
    const {
      product,
      dateSelection: {year},
      title,
      slug,
    } = artwork

    const {artistName, artistSlug, displayTitle} = mapArtworkData(artwork)
    const allPhotoGridItems = photosGrid(artwork) || []
    const firstItemMediaProps = allPhotoGridItems[0]
    const gid = product?.gid
    if (!gid) return addToast({title: "Can't connect to Shopify Product", toastVariant: 'tError'})
    const maxQty: number = await getMaxQty(gid)
    const line = lines?.find((_line: any) => _line?.merchandise?.product?.id == product?.gid)

    const artworkTitle = !!displayTitle ? displayTitle : title

    if (maxQty !== null && Number(line?.quantity) >= maxQty)
      return addToast({
        title: `Can't buy it anymore (available max qty: ${maxQty})`,
        toastVariant: 'tError',
      })

    const attributes: AttributeInput[] = []
    if (maxQty) attributes.push({key: 'maxQty', value: maxQty.toString()})
    if (year) attributes.push({key: 'year', value: year.toString()})
    if (artistName) attributes.push({key: 'artistName', value: artistName})
    if (artistSlug) attributes.push({key: 'artistSlug', value: artistSlug})
    if (artworkTitle) attributes.push({key: 'artworkTitle', value: artworkTitle.toString()})
    if (slug.current) attributes.push({key: 'artworkSlug', value: slug.current})
    if (firstItemMediaProps?.media.imgProps.src)
      attributes.push({key: 'artworkImage', value: firstItemMediaProps?.media.imgProps.src})

    linesAdd([
      {
        merchandiseId: product?.variants[0]?.store?.gid,
        quantity: 1,
        attributes,
      },
    ])
  }
  return {handleLineAdd}
}
export default useEcommActions
