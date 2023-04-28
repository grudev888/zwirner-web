import useSWR from 'swr'

import {client} from '@/common/api'

import {IFormInput} from '../types'

const BASE_URL = (path = '', queryParams: any = null) =>
  `${process.env.NEXT_PUBLIC_FORMS_API}${path}${
    queryParams ? '?' + new URLSearchParams(queryParams).toString() : ''
  }`

export const useForms = () => {
  const {data, error, isLoading} = useSWR(
    BASE_URL('forms')
  )

  const addOrUpdate = async (form: IFormInput, token: string) =>
    await client.post(BASE_URL('forms/submissions'), {
      ...form,
      timestamp: new Date().toISOString(),
      token,
    })

  return {data, error, isLoading, addOrUpdate}
}
