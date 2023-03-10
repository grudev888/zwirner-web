import {CogIcon} from '@sanity/icons'
import {BlockElementIcon} from '@sanity/icons'
import {LinkRemovedIcon} from '@sanity/icons'
import {DocumentsIcon} from '@sanity/icons'
import {ThLargeIcon} from '@sanity/icons'
import {UsersIcon} from '@sanity/icons'
import {DashboardIcon} from '@sanity/icons'
import {StructureBuilder} from 'sanity/desk'

export const settingsStructure = (S: StructureBuilder) =>
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
                .child(S.document().schemaType('redirect').documentId('redirect')),
              S.listItem()
                .title('Navigation')
                .icon(BlockElementIcon)
                .child(S.document().schemaType('navigation').documentId('navigation')),
              S.listItem()
                .title('Footer')
                .icon(BlockElementIcon)
                .child(S.document().schemaType('footer').documentId('footer')),
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Pages')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Settings Documents')
            .items([
              S.listItem()
                .title('Home')
                .icon(BlockElementIcon)
                .child(S.document().schemaType('home').documentId('home')),
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
                .child((pageId) =>
                  S.documentList()
                    .title('Artist Pages Posted')
                    .filter('_type == "artistPage"')
                    .params({pageId})
                    .defaultOrdering([{field: 'title', direction: 'asc'}])
                ),
              S.listItem()
                .title('Exhibition Pages')
                .icon(DashboardIcon)
                .child(
                  S.documentList()
                    .title('Exhibition Pages Posted')
                    .filter('_type == "exhibitionPage"')
                    .defaultOrdering([{field: 'publishedAt', direction: 'asc'}])
                ),
              S.listItem()
                .title('Fair Pages')
                .icon(DashboardIcon)
                .child(
                  S.documentList()
                    .title('Fair Pages Posted')
                    .filter('_type == "fairPage"')
                    .defaultOrdering([{field: 'publishedAt', direction: 'asc'}])
                ),
            ])
        ),
      S.divider(),

      S.listItem()
        .title('Artists')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Affiliated to DZ')
            .items([
              S.listItem()
                .title('Dz Gallery Artists')
                .icon(UsersIcon)
                .child((pageId) =>
                  S.documentList()
                    .title('Artists')
                    .filter('_type == "artist" && affiliation == true')
                    .params({pageId})
                    .defaultOrdering([{field: 'lastName', direction: 'asc'}])
                ),
              S.listItem()
                .title('Non Dz Gallery Artists')
                .icon(UsersIcon)
                .child((pageId) =>
                  S.documentList()
                    .title('Artists')
                    .filter('_type == "artist" && affiliation == false')
                    .params({pageId})
                    .defaultOrdering([{field: 'lastName', direction: 'asc'}])
                ),
            ])
        ),
      ...S.documentTypeListItems()
        .filter(
          (listItem) =>
            ![
              'redirect',
              'settings',
              'navigation',
              'footer',
              'home',
              'collect',
              'stories',
              'availableArtworks',
              'utopiaEditions',
              'artistPage',
              'exhibitionPage',
              'fairPage',
              'artist',
              'article',
              'location',
              'page',
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
