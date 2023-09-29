import {client} from '@/sanity/client'
import {
  recordType,
  RecordTypePropsSchema,
  RecordTypePropsType,
  RecordTypeSchema,
} from '@/sanity/queries/exhibitions/recordType'

export async function getRecordType(params: RecordTypePropsType) {
  const validatedParams = RecordTypePropsSchema.parse(params)
  const data = await client.fetch(recordType, validatedParams)
  if (!data) return null
  const validatedData = RecordTypeSchema.parse(data)
  return validatedData
}
