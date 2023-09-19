import {env} from '@/env.mjs'
import {fetchWithTimeout} from '@/utils/fetch/fetchWithTimeout'

export interface InquiryData {
  email: string
  firstName: string
  lastName: string
  comment: string
  currentUrl: string
  artwork: Record<string, string | number>
}

export const sendInquiry = async (data: Record<string, any>) => {
  const endpointUrl = env.NEXT_PUBLIC_INQUIRY_ENDPOINT

  try {
    const response = await fetchWithTimeout(endpointUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      return {error: 'Error sending inquiry'}
    }
    return await response.json()
  } catch (error) {
    console.error('Error sending inquiry: ', error)
    return {error}
  }
}
