import {NextApiRequest, NextApiResponse} from 'next'

export default function handler(request: NextApiRequest, response: NextApiResponse) {
  const {headers} = request

  const cityHeader = headers['x-vercel-ip-city']
  const city = Array.isArray(cityHeader) ? cityHeader[0] : cityHeader

  const decodedCity = city ? decodeURIComponent(city) : undefined

  response.status(200).json({
    ip: headers['x-real-ip'],
    timezone: headers['x-vercel-ip-timezone'],
    latitude: headers['x-vercel-ip-latitude'],
    longitude: headers['x-vercel-ip-longitude'],
    country: headers['x-vercel-ip-country'],
    region: headers['x-vercel-ip-country-region'],
    city: decodedCity,
  })
}
