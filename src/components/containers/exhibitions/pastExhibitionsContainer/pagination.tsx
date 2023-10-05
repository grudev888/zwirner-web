import Link from 'next/link'

import usePagination from '@/components/hooks/usePagination'

export type PaginationProps = {
  totalItems: number
  currentPage: number
  renderPageLink: (page: number) => string
  itemsPerPage?: number
}

export const dotts = '...'

const Pagination = ({
  totalItems,
  currentPage,
  itemsPerPage = 10,
  renderPageLink,
}: PaginationProps) => {
  const pages = usePagination(totalItems, currentPage, itemsPerPage)

  return (
    <div className="my-8 flex items-center justify-center">
      {pages.map((pageNumber, i) =>
        pageNumber === dotts ? (
          <span key={i} className="text-black rounded-full px-4 py-2 text-sm font-semibold">
            {pageNumber}
          </span>
        ) : (
          <Link
            key={i}
            href={renderPageLink(pageNumber as number)}
            className={`${
              pageNumber === currentPage ? 'text-success-dark' : 'text-black'
            } mx-1 rounded-full px-4 py-2 text-sm font-semibold no-underline`}
          >
            {pageNumber}
          </Link>
        )
      )}
    </div>
  )
}

export default Pagination
