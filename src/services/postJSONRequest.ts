import {fetchWithTimeout} from '@/utils/fetch/fetchWithTimeout'

export const postJSONRequest = async (endpointUrl: string, data: Record<string, any>) => {
  try {
    const response = await fetchWithTimeout(endpointUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      return {error: 'Error sending request'}
    }
    return await response.json()
  } catch (error) {
    console.error('Error sending request: ', error)
    return {error}
  }
}
