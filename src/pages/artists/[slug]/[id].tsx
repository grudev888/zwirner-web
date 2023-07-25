import {DzColumn} from '@zwirner/design-system'
import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'

/*
import {DzImageZoomModal} from '@zwirner/design-system'

import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
*/
import {DzArtworkDetail} from '@zwirner/design-system'

const AvailableArtworkPage = () => {
  /*
  return (
    <DzColumn span={12}>
      <FullWidthFlexCol>
        <DzImageZoomModal
          imgUrl="http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fjuzvn5an%2Fartists%2F19209716a83e9ce1adfe63caa13b2e7b64d96c6d-2160x1228.webp&w=2048&q=75"
          onClose={() => {}}
          isOpen={true}
        />
      </FullWidthFlexCol>
    </DzColumn>
  )
   */
  return (
    <DzColumn span={12}>
      <FullWidthFlexCol>
        <DzArtworkDetail
          artistName="John Smith"
          artworkTitle="Painting Number One"
          description="This is a description with a really long piece of text"
          mediaItems={[]}
        />
      </FullWidthFlexCol>
    </DzColumn>
  )
}

export default AvailableArtworkPage
