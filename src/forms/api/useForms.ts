import useSWR from 'swr'

import {client} from '@/common/api'

import {IFormInput, ILocation} from '../types'
import {Params} from './types'

const BASE_URL = (path = '', queryParams: any = null) =>
  `${process.env.NEXT_PUBLIC_FORMS_API}${path}${
    queryParams ? '?' + new URLSearchParams(queryParams).toString() : ''
  }`

export const useForms = (params: Params) => {
  const {data, error, isLoading} = useSWR(
    BASE_URL(`forms/${params.digest ? `submissions/${encodeURIComponent(params.digest)}` : ''}`)
  )

  const addOrUpdate = async (
    form: IFormInput & {location: ILocation},
    token: string,
    digest = ''
  ) =>
    await client.post(BASE_URL(`forms/submissions/${encodeURIComponent(digest)}`), {
      ...form,
      timestamp: new Date().toISOString(),
      token,
    })

  const getEmailToken = async (email: string) =>
    (await client.get(BASE_URL('token', {email})))?.data

  return {data, error, isLoading, addOrUpdate, getEmailToken}
}
