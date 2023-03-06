import Link from 'next/link'
import {FC} from 'react'

import {SingleExhibition} from '@/components/exhibitions/singleExhibition'
import {usePreview} from '@/sanity/preview'
import {pageBySlug} from '@/sanity/queries/page.queries'

interface SinglePreviewProps {
  queryParams: any
}

export const SinglePreview: FC<SinglePreviewProps> = ({queryParams}) => {
  const data = usePreview(null, pageBySlug, queryParams)

  return (
    <>
      <SingleExhibition exhibition={data?.exhibition} />
      <Link
        className="text-white fixed bottom-0 right-0 bg-blue-500 p-6 font-bold"
        href="/api/sanity/exit-preview"
      >
        Exit Preview
      </Link>
    </>
  )
}

export default SinglePreview
