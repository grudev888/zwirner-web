import {ALL_YEARS_ID, DzColumn, DzYearSelector, TITLE_SIZES} from '@zwirner/design-system'
import {useRouter} from 'next/router'

import {ALL_EXHIBITIONS, EXHIBITIONS_URL} from '@/common/constants/commonCopies'
import {YearLink} from '@/components/containers/exhibitions/pastExhibitionsContainer/yearLink'
import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import BackNavPageLayout from '@/components/containers/layout/pages/backNavPageLayout'
import {PageBuilder} from '@/components/pageBuilder'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'
import {
  PastExhibitionsDataType,
  PastExhibitionsFilteredType,
} from '@/sanity/queries/exhibitions/pastExhibitionsData'
import {
  EXHIBITIONS_PER_PAGE,
  formatPastExhibitionYears,
} from '@/sanity/services/exhibitions/getPastExhibitionsData'
import {getBasePaginatedPath} from '@/utils/path/getBasePaginatedPath'

import {PaginationPage} from './paginatedPage'

type Props = {
  data: PastExhibitionsFilteredType &
    PastExhibitionsDataType & {
      currentPage: number
      yearsWithExhibitions: ReturnType<typeof formatPastExhibitionYears>
    }
}

export const PastExhibitionsContainer = ({data}: Props) => {
  const {
    currentPage,
    title,
    totalPastExhibitions,
    pastExhibitions,
    pastExhibitionsInterstitial,
    yearsWithExhibitions,
  } = data
  const {asPath, push, query} = useRouter()
  const basePagePath = getBasePaginatedPath(asPath)
  const {year} = query
  const selectedYear = year ? parseInt(year.toString()) : ALL_YEARS_ID
  const subtitle = year?.toString()
  const onPageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pastExhibitions && pageNumber <= pastExhibitions.length) {
      push(`${basePagePath}/${pageNumber}`)
    }
  }

  return (
    <BackNavPageLayout parentPageName={ALL_EXHIBITIONS} parentPath={EXHIBITIONS_URL}>
      <DzColumn span={12}>
        <ContainerTitle
          title={title}
          titleSize={TITLE_SIZES.XL}
          subtitle={subtitle}
          customCTAContainerProps={{
            span: 6,
            start: 7,
          }}
        />
        <DzYearSelector
          selectedYear={selectedYear}
          YearWrapperComponent={YearLink}
          enabledYears={yearsWithExhibitions}
        />
        <FullWidthFlexCol className="mt-[2.5rem]">
          <PaginationPage
            currentPage={currentPage || 1}
            totalProducts={totalPastExhibitions}
            perPage={EXHIBITIONS_PER_PAGE}
            exhibitions={pastExhibitions}
            basePath={basePagePath}
            onPageChange={onPageChange}
          />
          {pastExhibitionsInterstitial ? (
            <PageBuilder components={[pastExhibitionsInterstitial]} />
          ) : null}
        </FullWidthFlexCol>
      </DzColumn>
    </BackNavPageLayout>
  )
}
