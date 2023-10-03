//import {env} from '@/env.mjs'
//import {postJSONRequest} from '@/services/postJSONRequest'

/*
interface SubscriptionData {
  email: string
}
*/

// TODO connect to endpoint when ready; currently mocking a success response
export const sendSubscribeRequest = async (/*data: SubscriptionData*/) => {
  /*
  env.NEXT_PUBLIC_SUBSCRIBE_ENDPOINT
  const endpointUrl = 'todo endpoint'
  return postJSONRequest(endpointUrl, data)
  */
  return Promise.resolve({isSuccess: true})
}
