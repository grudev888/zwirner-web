import Link from 'next/link'
import {FC} from 'react'

import {ExhibitionsContainer} from '@/components/exhibitions/exhibitionContainer'
import {usePreview} from '@/sanity/preview'
import {allExhibitions} from '@/sanity/queries/exhibition.queries'

interface ExhibitionsPreviewProps {}

export const ExhibitionsPreview: FC<ExhibitionsPreviewProps> = () => {
  const exhibitions = usePreview(null, allExhibitions)
  return (
    <>
      <ExhibitionsContainer exhibitions={exhibitions} />
      <Link
        className="text-white fixed bottom-0 right-0 bg-blue-500 p-6 font-bold"
        href="/api/sanity/exit-preview"
      >
        Exit Preview
      </Link>
    </>
  )
}

export default ExhibitionsPreview
