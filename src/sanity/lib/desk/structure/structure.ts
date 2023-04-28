import {
  BlockElementIcon,
  BookIcon,
  CogIcon,
  DashboardIcon,
  DocumentsIcon,
  LinkRemovedIcon,
  PinIcon,
  TagIcon,
  ThLargeIcon,
  TiersIcon,
  UsersIcon,
} from '@sanity/icons'
import {StructureBuilder} from 'sanity/desk'

import {envHost} from '@/sanity/env'
import {PreviewIframe} from '@/sanity/lib/preview/customIframe/previewIframe'
import {getSectionsByYear} from '@/sanity/services/structure.service'

export const generalStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Settings')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Settings Documents')
            .items([
              S.listItem()
                .title('Redirects')
                .icon(LinkRemovedIcon)
                .child(S.documentList().title('Page Redirects').filter('_type == "redirect"')),
              S.listItem()
                .title('Strings')
                .icon(TiersIcon)
                .child(S.documentList().title('Strings').filter('_type == "strings"')),
              S.listItem()
                .title('Navigation')
                .icon(BlockElementIcon)
                .child(S.document().schemaType('navigation').documentId('navigation')),
              S.listItem()
                .title('Footer')
                .icon(BlockElementIcon)
                .child(S.document().schemaType('footer').documentId('footer')),
              S.divider(),
              S.listItem()
                .title('Locations')
                .icon(PinIcon)
                .child(
                  S.documentList()
                    .title('Locations')
                    .filter('_type == "location"')
                    .schemaType('location')
                    .defaultOrdering([{field: 'name', direction: 'asc'}])
                ),
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Pages')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Home')
                .icon(BlockElementIcon)
                .child(
                  S.document()
                    .schemaType('home')
                    .documentId('home')
                    .views([
                      S.view.form(),
                      S.view
                        .component(PreviewIframe)
                        .options({
                          url: `${envHost}/api/sanity/preview`,
                        })
                        .title('Preview'),
                    ])
                ),
              S.listItem()
                .title('Collect')
                .icon(BlockElementIcon)
                .child(S.document().schemaType('collect').documentId('collect')),
              S.listItem()
                .title('Stories')
                .icon(BlockElementIcon)
                .child(S.document().schemaType('stories').documentId('stories')),
              S.listItem()
                .title('Available Artworks')
                .icon(ThLargeIcon)
                .child(
                  S.document().schemaType('availableArtworks').documentId('availableArtworks')
                ),
              S.listItem()
                .title('Utopia Editions')
                .icon(BlockElementIcon)
                .child(S.document().schemaType('utopiaEditions').documentId('utopiaEditions')),
              S.divider(),
              S.listItem()
                .title('Artist Pages')
                .icon(UsersIcon)
                .child(
                  S.documentList()
                    .title('Artist Pages')
                    .filter('_type == "artistPage"')
                    .defaultOrdering([{field: 'title', direction: 'asc'}])
                    .child(
                      S.document()
                        .schemaType('artistPage')
                        .views([
                          S.view.form(),
                          S.view
                            .component(PreviewIframe)
                            .options({
                              url: (doc: any) => {
                                return `${envHost}/api/sanity/preview?slug=${doc?.slug?.current}&section=artists`
                              },
                            })
                            .title('Preview'),
                        ])
                    )
                ),
              S.listItem()
                .title('Exhibition Pages')
                .icon(DashboardIcon)
                .child(() => {
                  return getSectionsByYear({
                    S,
                    sectionTitle: 'Exhibition',
                    type: 'exhibitionPage',
                    preview: {
                      section: 'exhibitions',
                    },
                  })
                }),
              S.listItem()
                .title('Fair Pages')
                .icon(DashboardIcon)
                .child(() => {
                  return getSectionsByYear({
                    S,
                    sectionTitle: 'Fair',
                    type: 'fairPage',
                    preview: {
                      section: 'fairs',
                    },
                  })
                }),
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Artists')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Artists')
            .items([
              S.listItem()
                .title('Dz Gallery Artists')
                .icon(UsersIcon)
                .child(
                  S.documentList()
                    .title('Artists')
                    .filter('_type == "artist" && affiliation == true')
                    .defaultOrdering([{field: 'lastName', direction: 'asc'}])
                ),
              S.listItem()
                .title('Non Dz Gallery Artists')
                .icon(UsersIcon)
                .child(
                  S.documentList()
                    .title('Artists')
                    .filter('_type == "artist" && affiliation == false')
                    .defaultOrdering([{field: 'lastName', direction: 'asc'}])
                ),
            ])
        ),
      S.listItem()
        .title('Artworks')
        .icon(ThLargeIcon)
        .child(
          S.documentList()
            .title('Artworks')
            .filter('_type == "artwork"')
            .defaultOrdering([{field: 'title', direction: 'asc'}])
        ),
      S.listItem()
        .title('Authors')
        .icon(UsersIcon)
        .child(
          S.documentList()
            .title('Authors')
            .filter('_type == "author"')
            .defaultOrdering([{field: 'name', direction: 'asc'}])
        ),
      S.listItem()
        .title('Books')
        .icon(BookIcon)
        .child(
          S.documentList()
            .title('Books')
            .filter('_type == "book"')
            .defaultOrdering([{field: 'title', direction: 'asc'}])
        ),
      S.listItem()
        .title('Collections')
        .icon(UsersIcon)
        .child(
          S.documentList()
            .title('Collections')
            .filter('_type == "collection"')
            .defaultOrdering([{field: 'title', direction: 'asc'}])
        ),
      S.listItem()
        .title('Events')
        .icon(TagIcon)
        .child(
          S.documentList()
            .title('Events')
            .filter('_type == "event"')
            .defaultOrdering([{field: 'title', direction: 'asc'}])
        ),
      S.listItem()
        .title('Exhibitions and Fairs')
        .icon(DashboardIcon)
        .child(() => {
          return getSectionsByYear({
            S,
            sectionTitle: 'Exhibitions & Fairs',
            type: 'exhibition',
          })
        }),
      S.listItem()
        .title('Posts')
        .icon(BookIcon)
        .child(
          S.documentList()
            .title('Posts')
            .filter('_type == "post"')
            .defaultOrdering([{field: 'title', direction: 'asc'}])
        ),
      S.listItem()
        .title('Press')
        .icon(DocumentsIcon)
        .child(() => {
          return getSectionsByYear({
            S,
            sectionTitle: 'Press',
            type: 'press',
          })
        }),
      ...S.documentTypeListItems()
        .filter(
          (listItem) =>
            ![
              'redirect',
              'settings',
              'navigation',
              'footer',
              'collect',
              'stories',
              'availableArtworks',
              'utopiaEditions',
              'artistPage',
              'exhibitionPage',
              'fairPage',
              'artist',
              'article',
              'home',
              'press',
              'location',
              'author',
              'book',
              'collection',
              'exhibition',
              'event',
              'post',
              'artwork',
              'page',
              'strings',
            ].includes(listItem?.getId() ?? '')
        )
        .sort((a, b) => {
          const nameA = a.getTitle()?.toUpperCase() ?? ''
          const nameB = b.getTitle()?.toUpperCase() ?? ''
          if (nameA < nameB) {
            return -1
          }
          if (nameA > nameB) {
            return 1
          }
          return 0
        }),
    ])
