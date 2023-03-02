import {definePlugin, DocumentOptions, DocumentPluginOptions} from 'sanity'
import {deskTool as baseDeskTool} from 'sanity/desk'
import {DefaultDocumentNodeResolver} from 'sanity/desk'
import Iframe from 'sanity-plugin-iframe-pane'
/**
 * A modified version of Sanity’s desk tool.
 *
 * - Adds a default document node resolver that uses the `views` option on schema types.
 * - Adds a default production URL resolver that uses the `url` option on schema types.
 */

export const deskTool = definePlugin(() => {
  const {name: _, ...base} = baseDeskTool({
    defaultDocumentNode,
  })

  return {
    name: 'lib/desk/deskTool',
    ...base,
    document: {
      ...base.document,
      productionUrl,
    },
  }
})

const defaultDocumentNode: DefaultDocumentNodeResolver = (S, ctx) => {
  const envHost = ['production', 'development', 'preview'].includes(
    process.env.NEXT_PUBLIC_VERCEL_ENV || ''
  )
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000'

  console.log('env.NEXT_PUBLIC_VERCEL_ENV', process.env.NEXT_PUBLIC_VERCEL_ENV)

  const schemaType = ctx.schema.get(ctx.schemaType)
  const {schemaType: schema} = ctx
  const schemaOptions: DocumentOptions | undefined = schemaType?.options
  const viewsResolver = schemaOptions?.views

  if (schema === 'exhibition') {
    return S.document().views([
      S.view.form(),
      S.view
        .component(Iframe)
        .options({
          url: `${envHost}/api/sanity/preview`,
        })
        .title('Preview'),
    ])
  }

  if (schema === 'page') {
    return S.document().views([
      S.view.form(),
      S.view
        .component(Iframe)
        .options({
          url: (doc: any) => {
            return doc?.slug?.current
              ? `${envHost}/api/sanity/preview?slug=${doc.slug.current}`
              : `${envHost}/api/sanity/preview`
          },
        })
        .title('Preview'),
    ])
  }

  if (viewsResolver) {
    return S.document().views(viewsResolver(S, ctx))
  }

  return S.document()
}

const productionUrl: DocumentPluginOptions['productionUrl'] = async (prev, ctx) => {
  const schemaType = ctx.schema.get(ctx.document._type)
  const schemaOptions: DocumentOptions | undefined = schemaType?.options
  const urlResolver = schemaOptions?.url

  if (urlResolver) {
    return (await urlResolver(ctx)) ?? prev
  }

  return prev
}
