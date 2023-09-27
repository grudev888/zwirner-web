import {FairPageBySlugSchemaType} from '@/sanity/queries/fairs/fairPageBySlug'

type Props = {
  data: FairPageBySlugSchemaType
}
export const FairDetailesContainer = ({data}: Props) => {
  return <div>{data.title}</div>
}
