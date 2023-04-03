import useSWR from 'swr'

import {client} from '@/common/api'

import {IFormInput} from '../types'
import {Params} from './types'

const BASE_URL = (digest = '') =>
  `https://zksx0lbaai.execute-api.us-east-1.amazonaws.com/default/FormsAPIPOC-Mailchimp/${digest}`

export const useForms = (params: Params) => {
  const {data, error, isLoading} = useSWR(BASE_URL(params.digest))

  const addOrUpdate = async (form: IFormInput, token: string, digest = '') =>
    await client.post(BASE_URL(digest), {
      ...form,
      Email: form.email,
      interests: form.interests,
      token,
    })

  return {data, error, isLoading, addOrUpdate}
}
