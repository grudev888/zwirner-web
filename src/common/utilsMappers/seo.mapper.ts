import format from 'date-fns/format'
import isSameYear from 'date-fns/isSameYear'

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
  } | ${
    data?.displayDate ??
    `${format(
      new Date(data?.startDate),
      `MMMM dd${isSameYear(new Date(data?.startDate), new Date(data?.endDate)) ? '' : ', yyyy'}`
    )}—${format(new Date(data?.endDate), 'MMMM dd, yyyy')}`
  }`
