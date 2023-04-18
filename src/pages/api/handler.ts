import {NextApiRequest, NextApiResponse} from 'next'

export default function handler(request: NextApiRequest, response: NextApiResponse) {
  console.log(JSON.stringify(request.headers))
  response.status(200).json({
    body: request.body,
    query: request.query,
    cookies: request.cookies,
    headers: JSON.stringify(request.headers)
  })
}
