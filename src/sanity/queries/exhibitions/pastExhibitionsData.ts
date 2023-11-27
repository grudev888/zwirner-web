import {groq} from 'next-sanity'
import {z} from 'zod'

import {
  exhibitionPageContent,
  ExhibitionPageContentSchema,
} from '@/sanity/queries/components/content/exhibitionPageContent'

import {
  dzInterstitialFields,
  DzInterstitialPropsDataSchema,
} from '../components/dzInterstitialProps'
import {pageSEOFields, PageSEOFieldsWithTitleSchema} from '../components/seo/pageSEOFields'
export const ALL_YEARS = 'ALL'
export type YearType = typeof ALL_YEARS | string | number

export const pastExhibitionsPageData = groq`
*[_type == "exhibitionsPast"][0]{
  title,
  "seo":  {
    title,
    ...seo {
      ${pageSEOFields}
    }
  },
  pastExhibitionsInterstitial {
    ${dzInterstitialFields}
  },
}`

export const pastExhibitions = groq`
*[_type == "exhibitionPage" && defined(endDate) &&
    (dateTime(now())>dateTime(string(endDate)+'T00:00:00.000Z'))
  ] | order(endDate desc)
`

export const allPastExhibitionYears = groq`
  ${pastExhibitions}{endDate}
`

export const AllPastExhibitionYearsSchema = z.array(
  z.object({
    endDate: z.nullable(z.string()),
  })
)

const pastExhibitionsFiltered = groq`
{
  "totalPastExhibitions": count(${pastExhibitions}),
  "pastExhibitions": ${pastExhibitions}[$initialPage...$endPage] {
    _type,
    ${exhibitionPageContent}
  },
}`

function getQueryWithYearFilter(strings: TemplateStringsArray, ...rest: any[]) {
  const str0 = strings[0]
  const str1 = strings[1]
  const str2 = strings[2]
  const str3 = strings[3]
  const [year, _, exhibitionPageContent] = rest ?? []

  // endDate must be between Jan 01 and Dec 31 of the selected year
  const filters = year
    ? ` && (
          dateTime(string('${year}-01-01T00:00:00.000Z')) <= dateTime(string(endDate)+'T00:00:00.000Z')
          && dateTime(string(endDate)+'T00:00:00.000Z') <= dateTime(string('${year}-12-31T00:00:00.000Z'))
        )`
    : ''

  const query = groq`
  *[_type == "exhibitionPage" && defined(endDate) &&
      (dateTime(now())>dateTime(string(endDate)+'T00:00:00.000Z'))
      ${filters}
    ] | order(endDate desc)
  `

  return `${str0}${query}${str1}${query}${str2}${exhibitionPageContent}${str3}`
}

export const getPastExhibitionsQueryByYear = (year?: YearType) => {
  if (!year || year === ALL_YEARS) return pastExhibitionsFiltered

  return getQueryWithYearFilter`{
    "totalPastExhibitions": count(${year}),
    "pastExhibitions": ${year}[$initialPage...$endPage] {
      _type,
      ${exhibitionPageContent}
    },
  }`
}

export const PastExhibitionsFilteredSchema = z.object({
  totalPastExhibitions: z.number(),
  pastExhibitions: z.nullable(z.array(ExhibitionPageContentSchema)),
})

export type PastExhibitionsFilteredType = z.infer<typeof PastExhibitionsFilteredSchema>

export const PastExhibitionsPageDataSchema = z.object({
  title: z.string(),
  seo: PageSEOFieldsWithTitleSchema,
  pastExhibitionsInterstitial: z.nullable(
    z.object({
      _type: z.literal('dzInterstitial'),
      props: DzInterstitialPropsDataSchema,
    })
  ),
})

export type PastExhibitionsDataType = z.infer<typeof PastExhibitionsPageDataSchema>
