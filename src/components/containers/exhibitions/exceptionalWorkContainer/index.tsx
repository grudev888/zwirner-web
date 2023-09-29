import {ExceptionalWorksDataType} from '@/sanity/queries/exhibitions/exceptionalWorksData'

type Props = {
  data: ExceptionalWorksDataType
}

export const ExceptionalWorkContainer = ({data}: Props) => {
  return <div>{data.title}!</div>
}
