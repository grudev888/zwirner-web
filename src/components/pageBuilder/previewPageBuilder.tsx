import {FC} from 'react'

import {PageBuilder} from '@/components/pageBuilder'
import {homeMapper} from '@/sanity/mappers/pageBuilder/homeMapper'
import {usePreview} from '@/sanity/preview'
import {homePage} from '@/sanity/queries/page.queries'
interface PreviewPageBuilderProps {}

export const PreviewPageBuilder: FC<PreviewPageBuilderProps> = () => {
  const data = usePreview(null, homePage)
  return <PageBuilder rows={homeMapper(data)} />
}

export default PreviewPageBuilder
