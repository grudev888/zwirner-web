import {type DocumentListBuilder, type ListBuilder, StructureBuilder} from 'sanity/desk'

import {client} from '@/sanity/client'
import {getExhibitionByDate} from '@/sanity/queries/exhibition.queries'
import {getEndDateExhibitionsDate} from '@/sanity/queries/exhibitionPage.queries'
import {getEndDateFairPagesDate} from '@/sanity/queries/fairPage.queries'
import {getPressByDate} from '@/sanity/queries/press.queries'
import exhibition from '@/sanity/schema/documents/exhibition'
import exhibitionPage from '@/sanity/schema/documents/pages/exhibitionPage'
import fairPage from '@/sanity/schema/documents/pages/fairPage'
import press from '@/sanity/schema/documents/press'

interface StructureBuilderProps {
  S: StructureBuilder
  sectionTitle: string
  type: string
  dateKey: string
}
const queryByType: any = {
  [exhibitionPage.name]: getEndDateExhibitionsDate,
  [fairPage.name]: getEndDateFairPagesDate,
  [press.name]: getPressByDate,
  [exhibition.name]: getExhibitionByDate,
}
export async function getSectionsByYear({
  S,
  sectionTitle,
  type,
}: StructureBuilderProps): Promise<ListBuilder | DocumentListBuilder> {
  const defaultView = S.documentList()
    .title(`${sectionTitle} Pages Posted`)
    .filter(`_type == "${type}"`)
    .defaultOrdering([{field: 'publishedAt', direction: 'asc'}])
  if (client) {
    const docs = (await client.fetch(queryByType[type])) || []
    const years: any = {}

    docs.forEach(({date, _id}: any) => {
      const dateFormatted = date ? new Date(date) : new Date()
      const year = dateFormatted.getFullYear()
      if (!years[year]) {
        years[year] = []
      }
      years[year].push(_id)
    })

    if (!docs.length) {
      return defaultView
    }

    return S.list()
      .title(`${sectionTitle} by year`)
      .id('year')
      .items(
        Object.keys(years).map((year) => {
          return S.listItem()
            .id(year)
            .title(year)
            .child(
              S.documentList()
                .id(type)
                .schemaType(type)
                .title(`${sectionTitle} from ${year}`)
                .filter(`_id in $ids`)
                .params({ids: years[year]})
            )
        })
      )
  }
  return defaultView
}
