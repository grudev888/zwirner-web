import {groq} from 'next-sanity'
import {z} from 'zod'

import {mediaBuilder, MediaBuilderSchema} from '@/sanity/queries/components/builders/mediaBuilder'

const PageSectionsTypeSchema = z.enum([
  'article',
  'artistPage',
  'exhibitionPage',
  'exceptionalWork',
  'fairPage',
  'onlineExhibitionPage',
  'availableArtworks',
  'artistListing',
  'exhibitionsLanding',
  'exhibitionsPast',
  'home',
  'page',
  'singlePageRecord',
])

const ExhibitionsDateFilterSchema = z.enum(['previous', 'current', 'upcoming'])

const triggerFields = groq`
    timeBased,
    timeBased == true => {
      triggerTime
    },
  `
// scrollBased,
// scrollBased == true => {
//   scrollValue
// }

const TriggerFieldsSchema = z.object({
  timeBased: z.boolean(),
  // scrollBased: z.boolean(),
  triggerTime: z.number().nullish(),
  // scrollValue: z.number().nullish(),
})

const popupsFilterFields = groq`
  type,
  openStatusFilter,
  type == "singlePageRecord" || type == "page" => {
    page -> {
      _type,
      'url': slug.current,
    },
  },
`

const PopupsFilterSectionsSchema = z.array(
  z.object({
    type: PageSectionsTypeSchema,
    openStatusFilter: z.nullable(ExhibitionsDateFilterSchema),
    page: z
      .object({
        _type: z.string(),
        url: z.string().nullish(),
      })
      .nullish(),
  })
)

const popupFields = groq`
  type,
  name,
  displayAlways,
  _key,
  filterSections[]{
    ${popupsFilterFields}
  },
  triggers{
    ${triggerFields}
  },
  type == "newsletter" || type == "customPromo" => {
    title,
    description,
    primaryCTA,
    media {
      ${mediaBuilder}
    },
  },
  type == "customPromo" => {
    submissionCTA,
  }
`

const commonPopupFields = z.object({
  _key: z.string(),
  name: z.string().nullish(),
  displayAlways: z.nullable(z.boolean()),
  filterSections: PopupsFilterSectionsSchema,
  triggers: TriggerFieldsSchema,
})
const newsletterCustomPromoFields = z.object({
  title: z.string().nullish(),
  description: z.string().nullish(),
  primaryCTA: z.nullable(z.any()),
  media: MediaBuilderSchema.nullish(),
})
export type CustomNewsletterPopupFieldsType = z.infer<typeof newsletterCustomPromoFields>

const customPromoFields = z.object({
  submissionCTA: z.any().nullish(),
})

const PopupItemSchema = z.discriminatedUnion('type', [
  commonPopupFields.merge(newsletterCustomPromoFields).extend({type: z.literal('newsletter')}),
  commonPopupFields.extend({type: z.literal('inquire')}),
  commonPopupFields
    .merge(newsletterCustomPromoFields)
    .merge(customPromoFields)
    .extend({type: z.literal('customPromo')}),
])

export type PopupItemType = z.infer<typeof PopupItemSchema>

export const allCampaigns = groq`
*[_type == "campaign"]{
    title,
    orderRank,
    cookieDaysToExpire,
    popupsList[]{
        ${popupFields}
    },
}|order(orderRank)`

export const AllCampaignsSchema = z.array(
  z.object({
    title: z.string(),
    cookieDaysToExpire: z.number(),
    popupsList: z.nullable(z.array(PopupItemSchema)),
  })
)

export type AllCampaignsType = z.infer<typeof AllCampaignsSchema>
