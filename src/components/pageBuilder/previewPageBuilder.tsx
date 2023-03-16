import Link from 'next/link'
import {FC} from 'react'

import {PageBuilder} from '@/components/pageBuilder'
import {homeMapper} from '@/sanity/mappers/pageBuilder/homeMapper'
import {usePreview} from '@/sanity/preview'
import {homePage} from '@/sanity/queries/page.queries'
interface PreviewPageBuilderProps {}

export const PreviewPageBuilder: FC<PreviewPageBuilderProps> = () => {
  const data = usePreview(null, homePage)
  return (
    <>
      <PageBuilder sections={homeMapper(data)} />
      <Link
        className="text-white fixed bottom-0 right-0 bg-blue-500 p-6 font-bold"
        href="/api/sanity/exit-preview"
      >
        Exit Preview
      </Link>
    </>
  )
}

export default PreviewPageBuilder
