import {DzPagination} from '@zwirner/design-system'
import Link from 'next/link'

type Props = {
  totalItems: number
  currentPage: number
  renderPagePathname: (page: number) => string
  itemsPerPage?: number
  onPageChange: (pageNumber: number) => void
}

type PageNumberLinkProps = {
  pageNumber: number
  renderPagePathname: (pageNumber: number) => string
}

const PageNumberLink = ({pageNumber, renderPagePathname}: PageNumberLinkProps) => {
  return <Link href={renderPagePathname(pageNumber)}>{pageNumber}</Link>
}

export const Pagination = ({
  totalItems,
  currentPage,
  itemsPerPage = 10,
  renderPagePathname,
  onPageChange,
}: Props) => {
  return (
    <DzPagination
      totalCount={totalItems}
      currentPage={currentPage}
      pageSize={itemsPerPage}
      onPageChange={onPageChange}
      renderPageNumber={(pageNumber) => (
        <PageNumberLink pageNumber={pageNumber} renderPagePathname={renderPagePathname} />
      )}
      prevText=""
      nextText=""
    />
  )
}
