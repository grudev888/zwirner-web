import React from 'react'

import PageBuilder from '@/components/pageBuilder'
import {transformDataToGrid} from '@/components/pageBuilder/utils/transformers'

import {Pagination} from './pagination'

type Props = {
  basePath: string
  exhibitions: any[] | null
  currentPage: number
  totalProducts: number
  perPage: number
  onPageChange: (pageNumber: number) => void
}

export const PaginationPage = ({
  basePath,
  currentPage,
  totalProducts,
  perPage,
  exhibitions,
  onPageChange,
}: Props) => {
  const renderPathPageName = (page: number) => `${basePath}/${page}`
  const dzGridPageBuilder = transformDataToGrid({
    data: exhibitions ?? [],
    innerComponentType: 'dzCard',
    gridProps: {
      itemsPerRow: 3,
      wrap: false,
      title: '',
      displayGridSlider: false,
      displayNumberOfItems: false,
    },
  })

  return (
    <div>
      {exhibitions && dzGridPageBuilder ? <PageBuilder components={[dzGridPageBuilder]} /> : null}
      <Pagination
        totalItems={totalProducts}
        currentPage={currentPage}
        itemsPerPage={perPage}
        renderPagePathname={renderPathPageName}
        onPageChange={onPageChange}
      />
    </div>
  )
}
