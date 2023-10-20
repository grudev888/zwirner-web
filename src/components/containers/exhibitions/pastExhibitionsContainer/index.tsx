import {DzColumn, TITLE_SIZES} from '@zwirner/design-system'

import {ALL_EXHIBITIONS, EXHIBITIONS_URL} from '@/common/constants/commonCopies'
import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import BackNavPageLayout from '@/components/containers/layout/pages/backNavPageLayout'
import {PageBuilder} from '@/components/pageBuilder'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'
import {PastExhibitionsFullDataType} from '@/sanity/queries/exhibitions/pastExhibitionsData'
import {EXHIBITIONS_PER_PAGE} from '@/sanity/services/exhibitions/getPastExhibitionsData'

import PaginationPage from './paginatedPage'

type Props = {
  data: PastExhibitionsFullDataType
}
export const PastExhibitionsContainer = ({data}: Props) => {
  const {title, totalPastExhibitions, pastExhibitions, pastExhibitionsInterstitial} = data ?? {}

  return (
    <BackNavPageLayout parentPageName={ALL_EXHIBITIONS} parentPath={EXHIBITIONS_URL}>
      <DzColumn span={12}>
        <ContainerTitle
          title={title}
          titleSize={TITLE_SIZES.XL}
          customCTAContainerProps={{
            span: 6,
            start: 7,
          }}
        />
        <FullWidthFlexCol>
          <PaginationPage
            currentPage={1}
            totalProducts={totalPastExhibitions}
            perPage={EXHIBITIONS_PER_PAGE}
            exhibitions={pastExhibitions}
          />
          {pastExhibitionsInterstitial ? (
            <PageBuilder components={[pastExhibitionsInterstitial]} />
          ) : null}
        </FullWidthFlexCol>
      </DzColumn>
    </BackNavPageLayout>
  )
}
