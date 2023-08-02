import {DzColumn, TITLE_SIZES} from '@zwirner/design-system'
import {FC} from 'react'

import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'

//import {photosGrid} from './mapper'

interface ArtworkContainerProps {
  data: any
}

export const ArtworkContainer: FC<ArtworkContainerProps> = ({data}) => {
  const {
    title,
    // displayCustomTitle,
    // displayTitle,
    // displayDate,
    // dateSelection,
    // edition,
    // editionInformation,
    // salesInformation,
    // productInformation,
    // copyrightInformation,
    // artworkCTA,
    // currency,
    // medium,
    // framed,
    // dimensions,
    // framedDimensions,
    // availability,
    // artists,
    // photos,
    // description,
    // artworkType,
  } = data ?? ''

  //const artworksPhotos = photosGrid(data)
  // Use artworksPhotos to map a grid of DzCards like src/common/components/portableText/index.tsx LINE:58

  return (
    <DzColumn span={12}>
      <ContainerTitle title={title} titleSize={TITLE_SIZES.XL} />
    </DzColumn>
  )
}
