import {env} from '@/env.mjs'
import {postJSONRequest} from '@/services/postJSONRequest'

interface SubscriptionData {
  email: string
  access?: boolean
  events?: boolean
  news?: boolean
}

// TODO connect to endpoint when ready; currently mocking a success response
export const sendSubscribeRequest = async (data: SubscriptionData, sourceUrl?: string) => {
  const endpointUrl = env.NEXT_PUBLIC_SUBSCRIBE_ENDPOINT
  const {email, access, events, news} = data
  const interests = []

  if (access) {
    interests.push(env.NEXT_PUBLIC_SUBSCRIBE_TOPIC_SALES_ID)
  }
  if (events) {
    interests.push(env.NEXT_PUBLIC_SUBSCRIBE_TOPIC_BOOKS_ID)
  }
  if (news) {
    interests.push(env.NEXT_PUBLIC_SUBSCRIBE_TOPIC_NEWS_ID)
  }
  const payload = {
    email,
    interests,
    sourceUrl,
  }

  return postJSONRequest(endpointUrl, payload)
    .then((result) => {
      return {isSuccess: !result?.error, error: result?.error}
    })
    .catch((error) => {
      console.error('Newsletter subscription error: ', error)
      return {isSuccess: false, error}
    })
}
