import {fromToDatesText} from '@/common/utilsMappers/date.mapper'
import {ExceptionalWorksDataType} from '@/sanity/queries/exhibitions/exceptionalWorksData'
import {ExhibitionPageBySlugType} from '@/sanity/queries/exhibitions/exhibitionPageBySlug'
import {OnlineExhibitionsType} from '@/sanity/queries/exhibitions/onlineExhibitionsData'

export const getExhibitionsTitle = (
  data: ExceptionalWorksDataType | ExhibitionPageBySlugType | OnlineExhibitionsType
) =>
  `${data?.title}${data?.subtitle ? `: ${data?.subtitle}` : ''}${
    data?.locations && data?.locations?.length !== 0
      ? ` | ${data?.locations.map((location) => location.name).join()}`
      : ''
  } | ${fromToDatesText(data?.startDate, data?.endDate)}`
