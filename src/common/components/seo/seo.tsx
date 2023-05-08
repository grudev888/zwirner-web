import Head from 'next/head'
import {useRouter} from 'next/router'
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
  DefaultSeo,
  NextSeo,
  SiteLinksSearchBoxJsonLd,
} from 'next-seo'
import {FC} from 'react'

import {GlobalSEOScheme, JSONLDSchema, PageSEOSchema, SCHEMA_TYPE_JSON_LD} from '@/sanity/types'

import {
  articleJSONLDMapper,
  breadcrumbsJSONLDMapper,
  defaultSeoMapper,
  perPageSeoMapper,
  searchBoxJSONLDMapper,
} from './mappers'
import {SEOComponentProps} from './types'

const JsonLDSchemaTypes = {
  [SCHEMA_TYPE_JSON_LD.ARTICLE]: (data: JSONLDSchema | undefined, url: string) => {
    const {article} = data ?? {}
    return <ArticleJsonLd {...articleJSONLDMapper(article, url)} useAppDir={false} />
  },
  [SCHEMA_TYPE_JSON_LD.BLOG]: (data: JSONLDSchema | undefined, url: string) => {
    const {article} = data ?? {}
    return <ArticleJsonLd {...articleJSONLDMapper(article, url)} useAppDir={false} />
  },
  [SCHEMA_TYPE_JSON_LD.BREADCRUMB]: (data: JSONLDSchema | undefined) => {
    const {breadcrumbs} = data ?? {}
    return <BreadcrumbJsonLd {...breadcrumbsJSONLDMapper(breadcrumbs)} />
  },
  [SCHEMA_TYPE_JSON_LD.SITELINKS]: (data: JSONLDSchema | undefined, url: string) => {
    const {searchPotentialActions} = data ?? {}
    return <SiteLinksSearchBoxJsonLd {...searchBoxJSONLDMapper(searchPotentialActions, url)} />
  },
  [SCHEMA_TYPE_JSON_LD.MANUAL]: (data: JSONLDSchema | undefined) => {
    const {manualSchema} = data ?? {}
    return (
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: manualSchema}} />
      </Head>
    )
  },
}

export const SEOComponent: FC<SEOComponentProps> = ({isDefault = false, data}) => {
  const router = useRouter()
  if (isDefault) {
    return <DefaultSeo {...defaultSeoMapper(data as GlobalSEOScheme)} />
  }

  function JsonLD() {
    const {jsonLD} = (data as PageSEOSchema) ?? {}
    const {schemaType} = jsonLD ?? {}
    if (!schemaType) return null
    return JsonLDSchemaTypes?.[schemaType]?.(jsonLD, router.asPath) ?? null
  }

  return (
    <>
      <NextSeo {...perPageSeoMapper(data as PageSEOSchema)} />
      {JsonLD()}
    </>
  )
}
