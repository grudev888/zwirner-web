import {GetStaticProps} from 'next'

import {AvailableArtworksContainer} from '@/components/containers/availableArtworks'
import {getAllArtistAvailableArtworkPageSlugs} from '@/sanity/services/artist.service'
import {getAvailableArtworksDataByArtistSlug} from '@/sanity/services/availableArtworks.service'

interface AvailableArtworksCMS {
  artworksPage: any
}

interface PageProps {
  data: AvailableArtworksCMS
  preview: boolean
  slug: string | null
  token: string | null
}

interface Query {
  [key: string]: string
}

/*
  interface PreviewData {
    token?: string
  }
 */

export default function AvailableWorksPage({data /*, preview*/}: PageProps) {
  if (!data) {
    return <></>
  }

  const containerData = {artworksGrid: {artworks: data.artworksPage.availableWorksSubpage.artwork}}
  return <AvailableArtworksContainer data={containerData} />
}

export const getStaticPaths = async () => {
  const paths = await getAllArtistAvailableArtworkPageSlugs()
  return {paths, fallback: true}
}

export const getStaticProps: GetStaticProps<PageProps, Query /*, PreviewData*/> = async (ctx) => {
  const {params = {}, preview = false /*, previewData = {}*/} = ctx

  /*
  if (preview && previewData.token) {
    return {
      props: {
        data: {
          artworksPage: null,
        },
        preview,
        slug: params?.slug || null,
        token: previewData.token,
      },
    }
  }
  */

  try {
    const fetchedData = await getAvailableArtworksDataByArtistSlug({slug: `/${params.slug}`})
    console.info('++++++ available works query result data: ', fetchedData)
    //await getAvailableArtworksDataByArtistSlug({ slug: `/${params.slug}`})
    const data = mockData

    return {
      props: {
        data: {
          artworksPage: data,
        },
        preview,
        slug: params?.slug || null,
        token: null,
      },
    }
  } catch (e: any) {
    console.error('ERROR FETCHING ARTIST AVAILABLE ARTWORKS DATA:', e.message)
    return {
      props: {
        data: {
          artworksPage: [],
        },
        preview,
        slug: params?.slug || null,
        token: null,
      },
    }
  }
}

const mockData = {
  availableWorksSubpage: {
    artwork: [
      {
        _updatedAt: '2023-06-21T14:49:06Z',
        photos: [
          {
            asset: {
              _ref: 'image-8bafe653e3162eb31c13f89b919562827aeb54bb-1499x2000-jpg',
              _type: 'reference',
            },
            _type: 'image',
            alt: 'A painting by Maria Lassnig, titled Die müde Turnerin, dated 2000.',
            _key: 'FPHhikOX',
          },
          {
            _type: 'image',
            alt: 'A painting by Maria Lassnig, titled Die müde Turnerin, dated 2000.',
            _key: 'FKX7QLje',
            asset: {
              _ref: 'image-02b8b66366376d8c41e47a7cfb376b500b56a375-2667x2000-jpg',
              _type: 'reference',
            },
          },
          {
            alt: 'A detail from a painting by Maria Lassnig, titled Die müde Turnerin, dated 2000.',
            _key: 'LjBUKpej',
            asset: {
              _ref: 'image-26dee8d1b84544c39f76021c6eb09dab047c5b52-2669x2000-jpg',
              _type: 'reference',
            },
            _type: 'image',
          },
          {
            _type: 'image',
            alt: 'A painting by Maria Lassnig, titled Die müde Turnerin, dated 2000.',
            _key: 'yfqajLZ8',
            asset: {
              _ref: 'image-8bafe653e3162eb31c13f89b919562827aeb54bb-1499x2000-jpg',
              _type: 'reference',
            },
          },
          {
            asset: {
              _ref: 'image-02b8b66366376d8c41e47a7cfb376b500b56a375-2667x2000-jpg',
              _type: 'reference',
            },
            _type: 'image',
            alt: 'A painting by Maria Lassnig, titled Die müde Turnerin, dated 2000.',
            _key: 'ulKSh8iK',
          },
          {
            _type: 'image',
            alt: 'A detail from a painting by Maria Lassnig, titled Die müde Turnerin, dated 2000.',
            _key: 'VTIBMp7v',
            asset: {
              _ref: 'image-26dee8d1b84544c39f76021c6eb09dab047c5b52-2669x2000-jpg',
              _type: 'reference',
            },
          },
        ],
        dimensions: '80 1/8 x 57 7/8 inches (203.5 x 147 cm)',
        _type: 'artwork',
        _id: '047ADFFB-C314-419D-99B5-932857A07886',
        availability: 'unavailable',
        title: 'Die müde Turnerin',
        dateSelection: {
          year: '2000',
        },
        artists: [],
        _createdAt: '2023-05-12T16:08:32Z',
        _rev: 'brojXkxMsVghaPGG1YbLPe',
      },
      {
        _rev: 'brojXkxMsVghaPGG1Yb9Ab',
        _type: 'artwork',
        availability: 'unavailable',
        _updatedAt: '2023-06-21T14:49:01Z',
        dateSelection: {
          year: '1950',
        },
        dimensions: '21 x 15 inches (53.5 x 38 cm)Framed: 28 1/2 x 20 7/8 inches (72.5 x 53 cm)',
        artists: [],
        _createdAt: '2023-05-12T16:08:32Z',
        photos: [
          {
            _type: 'image',
            alt: 'A print by Sue Fuller, titled New York, New York!, dated 1950.',
            _key: 'fckYpmpU',
            asset: {
              _type: 'reference',
              _ref: 'image-9ab20aa05e8a69a635ea870fe8b4678262492f75-2293x3000-jpg',
            },
          },
          {
            _type: 'image',
            alt: 'A detail from a print by Sue Fuller, titled New York, New York!, dated 1950.',
            _key: 'ardgSlUA',
            asset: {
              _ref: 'image-ffe1fab752efefdb79a805c0aebc0b7541edf69c-3000x2249-jpg',
              _type: 'reference',
            },
          },
          {
            _type: 'image',
            alt: 'A print by Sue Fuller, titled New York, New York!, dated 1950.',
            _key: 'xUG0toIs',
            asset: {
              _ref: 'image-9ab20aa05e8a69a635ea870fe8b4678262492f75-2293x3000-jpg',
              _type: 'reference',
            },
          },
          {
            _type: 'image',
            alt: 'A detail from a print by Sue Fuller, titled New York, New York!, dated 1950.',
            _key: '9ozQMuWP',
            asset: {
              _ref: 'image-ffe1fab752efefdb79a805c0aebc0b7541edf69c-3000x2249-jpg',
              _type: 'reference',
            },
          },
        ],
        _id: '22655718-3014-4035-829F-171D686587F4',
        title: 'New York, New York!',
      },
      {
        _id: '22C1F366-2949-42E4-B1FB-E00E04CD4E81',
        title: 'Acting as father',
        dateSelection: {
          year: '2022',
        },
        dimensions: '13 x 11 inches (33.1 x 28.1 cm)',
        artists: [],
        _createdAt: '2023-05-12T16:08:32Z',
        _rev: 'brojXkxMsVghaPGG1YagXT',
        _type: 'artwork',
        availability: 'unavailable',
        _updatedAt: '2023-06-21T14:48:47Z',
        photos: [
          {
            _type: 'image',
            alt: 'A casein on board painting by Mahesh Baliga, titled Acting as father, dated 2022.',
            _key: 'xjhqlhsq',
            asset: {
              _ref: 'image-d9517be0d67779e679e5ded65d3adc613a82ff7c-2632x3000-jpg',
              _type: 'reference',
            },
          },
          {
            asset: {
              _ref: 'image-d9517be0d67779e679e5ded65d3adc613a82ff7c-2632x3000-jpg',
              _type: 'reference',
            },
            _type: 'image',
            alt: 'A casein on board painting by Mahesh Baliga, titled Acting as father, dated 2022.',
            _key: 'udwwLNlu',
          },
        ],
      },
      {
        photos: [
          {
            _type: 'image',
            alt: 'A photographic reproduction by Anthony Barboza, titled Quincy Troupe, Gloria Baldwin, Toni Morrison, Toni Cade Bambara, Ishmael Reed, and [tbd], at the Life Forces: Blackroots VIII writers talk, sponsored by Frederick Douglass Creative Arts Center, Inc and held at McMillin Theatre, Columbia University, New York, May 31, 19..., date TBC.',
            _key: 'pIGMb5UO',
            asset: {
              _ref: 'image-ff0be2158491fe936da8a3daaa5e0406720a083c-3000x2397-jpg',
              _type: 'reference',
            },
          },
          {
            _type: 'image',
            alt: 'A photographic reproduction by Anthony Barboza, titled Quincy Troupe, Gloria Baldwin, Toni Morrison, Toni Cade Bambara, Ishmael Reed, and [tbd], at the Life Forces: Blackroots VIII writers talk, sponsored by Frederick Douglass Creative Arts Center, Inc and held at McMillin Theatre, Columbia University, New York, May 31, 19..., date TBC.',
            _key: 'WIxxOVux',
            asset: {
              _ref: 'image-ff0be2158491fe936da8a3daaa5e0406720a083c-3000x2397-jpg',
              _type: 'reference',
            },
          },
        ],
        artists: [],
        _createdAt: '2023-05-12T16:08:32Z',
        _type: 'artwork',
        _id: '0D223C8A-D718-476F-942C-C44D95C2AE5E',
        title:
          'Quincy Troupe, Gloria Baldwin, Toni Morrison, Toni Cade Bambara, Ishmael Reed, and Chinweizu Ibekwe at the eighth annual Lifeforces/Blackroots Festival of literary and performing artists, Columbia University, May 31, 1980',
        _updatedAt: '2023-06-21T14:48:48Z',
        dateSelection: {
          year: '1980',
        },
        dimensions:
          'Image: 19 5/8 x 28 1/2 inches (49.8 x 72.4 cm)  Framed: 26 5/8 x 32 1/2 inches (67.6 x 82.6 cm)  Edition of 15',
        _rev: 'brojXkxMsVghaPGG1Yai1q',
        availability: 'unavailable',
      },
      {
        artists: [],
        _id: '21C7686D-1B47-491A-B4C3-9C574D9F1A2B',
        dateSelection: {
          year: '2017',
        },
        photos: [
          {
            _key: 'VqVXs5fi',
            asset: {
              _ref: 'image-43afc6116c007dbde67f63687bf0d313a9f6d158-3000x2100-jpg',
              _type: 'reference',
            },
            _type: 'image',
            alt: 'A work on paper by Kerstin Brätsch, titled Unstable Talismanic Rendering_ Psychopompo (with gratitude to master marbler Dirk Lange), dated 2017.',
          },
          {
            alt: 'A work on paper by Kerstin Brätsch, titled Unstable Talismanic Rendering_ Psychopompo (with gratitude to master marbler Dirk Lange), dated 2017.',
            _key: 'ENj0KinD',
            asset: {
              _ref: 'image-dc25d40827ae3f63321da75e939f6d618891c47d-2133x3000-jpg',
              _type: 'reference',
            },
            _type: 'image',
          },
          {
            alt: 'A detail from a work on paper by Kerstin Brätsch, titled ﻿Unstable Talismanic Rendering_ Psychopompo (with gratitude to master marbler Dirk Lange), dated 2017.',
            _key: 'zLeYaB8V',
            asset: {
              _ref: 'image-05c49b6c1393fad668d556000c8df50de9ff7e7c-3000x2000-jpg',
              _type: 'reference',
            },
            _type: 'image',
          },
          {
            asset: {
              _ref: 'image-9aabfbedb54ea784ffd56c47e960ecdd34c7671c-3000x2250-jpg',
              _type: 'reference',
            },
            _type: 'image',
            alt: 'A work on paper by Kerstin Brätsch, titled ﻿Unstable Talismanic Rendering_ Psychopompo (with gratitude to master marbler Dirk Lange), dated 2017.',
            _key: 'CX6KvToo',
          },
          {
            asset: {
              _type: 'reference',
              _ref: 'image-dc25d40827ae3f63321da75e939f6d618891c47d-2133x3000-jpg',
            },
            _type: 'image',
            alt: 'A work on paper by Kerstin Brätsch, titled Unstable Talismanic Rendering_ Psychopompo (with gratitude to master marbler Dirk Lange), dated 2017.',
            _key: 'WKigeNcP',
          },
          {
            _type: 'image',
            alt: 'A work on paper by Kerstin Brätsch, titled Unstable Talismanic Rendering_ Psychopompo (with gratitude to master marbler Dirk Lange), dated 2017.',
            _key: '21mjrP4C',
            asset: {
              _ref: 'image-43afc6116c007dbde67f63687bf0d313a9f6d158-3000x2100-jpg',
              _type: 'reference',
            },
          },
          {
            _type: 'image',
            alt: 'A detail from a work on paper by Kerstin Brätsch, titled ﻿Unstable Talismanic Rendering_ Psychopompo (with gratitude to master marbler Dirk Lange), dated 2017.',
            _key: '3Xbu8nSi',
            asset: {
              _ref: 'image-616e08198d04b79cdb45f943a7155677bef0100e-2000x3000-jpg',
              _type: 'reference',
            },
          },
          {
            _type: 'image',
            alt: 'A work on paper by Kerstin Brätsch, titled ﻿Unstable Talismanic Rendering_ Psychopompo (with gratitude to master marbler Dirk Lange), dated 2017.',
            _key: 'UunOd1y0',
            asset: {
              _ref: 'image-9aabfbedb54ea784ffd56c47e960ecdd34c7671c-3000x2250-jpg',
              _type: 'reference',
            },
          },
        ],
        _createdAt: '2023-05-12T16:08:32Z',
        _rev: 'brojXkxMsVghaPGG1Yai1q',
        _type: 'artwork',
        availability: 'unavailable',
        title:
          'Unstable Talismanic Rendering_ Psychopompo (with gratitude to master marbler Dirk Lange)',
        _updatedAt: '2023-06-21T14:48:48Z',
        dimensions:
          '108 x 72 inches (274.3 x 182.9 cm) Photo by Kirsten Kilponen. © Kerstin Brätsch. Courtesy the artist and Gladstone Gallery',
      },
    ],
  },
}
