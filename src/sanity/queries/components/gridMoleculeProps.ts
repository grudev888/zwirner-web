import {groq} from 'next-sanity'
import {z} from 'zod'

import {componentTypesData, ComponentTypesDataSchema} from './componentTypesData'
import {dzCardProps, DzCardPropsDataSchema} from './dzCardProps'
import {dzMediaProps, DzMediaPropsDataSchema} from './dzMediaProps'

// Must follow GridMoleculeTypeProps
export const dzGridFields = groq`
  "_type": "grid",
  'props': {
    title,
    wrap,
    itemsPerRow,
    grid[]{
      ${componentTypesData}
      ${dzMediaProps}
      ${dzCardProps}
    }
  }
`
export const gridMoleculeProps = groq`
  _type == 'grid' => {
    ${dzGridFields}
  },
`

const GridMoleculeItemTypeSchema = z.enum(['dzCard', 'dzMedia'])
export type GridMoleculeItemType = z.infer<typeof GridMoleculeItemTypeSchema>

export const DzGridMoleculePropsDataSchema = z.object({
  title: z.nullable(z.string()),
  wrap: z.boolean(),
  itemsPerRow: z.number().int().min(1).max(4),
  grid: z.nullable(
    z.array(
      z.object({
        _type: GridMoleculeItemTypeSchema,
        content: z.nullable(ComponentTypesDataSchema),
        props: z.union([DzCardPropsDataSchema, DzMediaPropsDataSchema]),
      })
    )
  ),
})

export type DzGridMoleculePropsData = z.infer<typeof DzGridMoleculePropsDataSchema>
