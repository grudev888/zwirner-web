import {IncomingHttpHeaders} from 'node:http2'

import * as Sentry from '@sentry/nextjs'
import {NextApiRequest, NextApiResponse} from 'next'
import {ILocation} from 'src/forms/types'

/**
 * Determines the request source [location]{@link ILocation} if CloudFront or Vercel
 * location headers are present.
 *
 * Returns `200 OK` with location:
 * - if location is successfully determined.
 *
 * Returns `400 Bad Request`:
 * - if only some of the required location headers are detected.
 * - if any of the location headers contains an array value.
 * - if no location headers detected.
 *
 * Returns `500 Internal Server Error`:
 * - if an unexpected error occurs.
 *
 * @see [Extracting location from CloudFront headers]{@link CloudFrontLocationExtractor}.
 * @see [Extracting location from Vercel headers]{@link VercelLocationExtractor}.
 */
export default function handler({headers}: NextApiRequest, response: NextApiResponse) {
  try {
    const location =
      CloudFrontLocationExtractor.INSTANCE.from(headers) ||
      VercelLocationExtractor.INSTANCE.from(headers)
    if (location) {
      response.status(200).json(location)
    } else {
      response.status(400).json('No location headers detected.')
    }
  } catch (error) {
    if (error instanceof IncompleteLocationHeadersError) {
      response.status(400).json('Not all required location headers are provided.')
    } else if (error instanceof UnexpectedArrayError) {
      response.status(400).json('Location headers cannot contain arrays.')
    } else {
      response.status(500)
    }
    Sentry.captureException(error)
  }
}

/**
 * Extracts the [location]{@link ILocation} from the request headers.
 */
abstract class LocationExtractor {
  /**
   * The header that contains the country.
   */
  protected abstract readonly COUNTRY_HEADER: string

  /**
   * The header that contains the region.
   */
  protected abstract readonly REGION_HEADER: string

  /**
   * The header that contains the city name.
   */
  protected abstract readonly CITY_HEADER: string

  /**
   * Extracts the [location]{@link ILocation} from the provided request headers.
   *
   * @returns The location or `undefined` if no location headers detected.
   * @throws IncompleteLocationHeadersError if only some locations headers are detected.
   */
  from(headers: IncomingHttpHeaders): ILocation | undefined {
    const country = this.extract(headers, this.COUNTRY_HEADER)
    const region = this.extract(headers, this.REGION_HEADER)
    const city = this.extractCity(headers)
    if (country && region && city) {
      return {
        country: country,
        region: region,
        city: city,
      }
    } else if (country || region || city) {
      throw new IncompleteLocationHeadersError(
        this.COUNTRY_HEADER,
        this.REGION_HEADER,
        this.CITY_HEADER
      )
    } else {
      return undefined
    }
  }

  /**
   * Returns the value for the provided [header]{@link name}.
   *
   * @param headers The headers to extract the value from.
   * @param name The name of the header.
   * @returns The value or `undefined` if there is no header with the provided name.
   * @throws UnexpectedArrayError if the header value is an array.
   */
  private extract(headers: IncomingHttpHeaders, name: string): string | undefined {
    const value = headers[name]
    if (!value) return
    if (Array.isArray(value)) throw new UnexpectedArrayError(name, value)
    return value
  }

  /**
   * Extracts the city name from the given headers.
   *
   * @returns The [decoded]{@link decodeURIComponent} city name or `undefined`
   *          if the headers do not contain the city name.
   */
  private extractCity(headers: IncomingHttpHeaders): string | undefined {
    const rawCity = this.extract(headers, this.CITY_HEADER)
    return rawCity ? decodeURIComponent(rawCity) : undefined
  }
}

/**
 * If the header value is an array.
 */
class UnexpectedArrayError extends Error {
  constructor(header: string, provided: string[]) {
    super(`${provided} is not a valid ${header} value, because it is an array.`)
  }
}

/**
 * If only some of the required location headers are detected.
 */
class IncompleteLocationHeadersError extends Error {
  constructor(...requiredHeaders: string[]) {
    super(`All of the ${requiredHeaders} headers must be present if at least one is detected.`)
  }
}

/**
 * Extracts the [location]{@link ILocation} from the given headers.
 *
 * If all required to determine the location CloudFront headers are present, returns it.
 *
 * @see [CloudFront location headers]{@link https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/adding-cloudfront-headers.html#cloudfront-headers-viewer-location}
 */
class CloudFrontLocationExtractor extends LocationExtractor {
  /**
   * The extractor instance.
   */
  static readonly INSTANCE = new CloudFrontLocationExtractor()

  /**
   * The CloudFront header that contains the country name.
   */
  override COUNTRY_HEADER = 'cloudfront-viewer-country-name'

  /**
   * The CloudFront header that contains the region name.
   */
  override REGION_HEADER = 'cloudfront-viewer-country-region-name'

  override CITY_HEADER = 'cloudfront-viewer-city'
}

/**
 * Extracts the [location]{@link ILocation} from the given headers.
 *
 * If all required to determine the location Vercel headers are present, returns it.
 *
 * @see [Vercel location headers]{@link https://vercel.com/docs/edge-network/headers#request-headers}
 */
class VercelLocationExtractor extends LocationExtractor {
  /**
   * The extractor instance.
   */
  static readonly INSTANCE = new VercelLocationExtractor()

  /**
   * The Vercel header that contains the [ISO 3166-1]{@link https://en.wikipedia.org/wiki/ISO_3166-1}
   * country code.
   */
  override COUNTRY_HEADER = 'x-vercel-ip-country'

  /**
   * The Vercel header that contains the [ISO 3166-2]{@link https://en.wikipedia.org/wiki/ISO_3166-2}
   * region code.
   */
  override REGION_HEADER = 'x-vercel-ip-country-region'

  override CITY_HEADER = 'x-vercel-ip-city'
}
