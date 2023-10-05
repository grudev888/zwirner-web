import React from 'react'

import {EXHIBITIONS_URL} from '@/common/constants/commonCopies'
import PageBuilder from '@/components/pageBuilder'
import {transformDataToGrid} from '@/components/pageBuilder/utils/transformers'

import Pagination from './pagination'

type PageProps = {
  exhibitions: any[] | null
  currentPage: number
  totalProducts: number
  perPage: number
}

const PaginationPage = ({
  currentPage,
  totalProducts,
  perPage,
  exhibitions,
}: PageProps): JSX.Element => {
  const dzGridPageBuilder = transformDataToGrid({
    data: exhibitions ?? [],
    innerComponentType: 'dzCard',
    gridProps: {
      itemsPerRow: 3,
      wrap: false,
      title: '',
    },
  })
  return (
    <div>
      {exhibitions && dzGridPageBuilder ? <PageBuilder components={[dzGridPageBuilder]} /> : null}
      <Pagination
        totalItems={totalProducts}
        currentPage={currentPage}
        itemsPerPage={perPage}
        renderPageLink={(page: number) => `${EXHIBITIONS_URL}/${page}`}
      />
    </div>
  )
}

export default PaginationPage
