export const articleMock = {
  title: 'Open Graph Article Title',
  description: 'Description of open graph article',
  url: 'https://www.example.com/articles/article-title',
  type: 'article',
  article: {
    publishedTime: '2017-06-21T23:04:13Z',
    modifiedTime: '2018-01-21T18:04:43Z',
    expirationTime: '2022-12-21T22:04:11Z',
    section: 'Section II',
    authors: [
      'https://www.example.com/authors/@firstnameA-lastnameA',
      'https://www.example.com/authors/@firstnameB-lastnameB',
    ],
    tags: ['Tag A', 'Tag B', 'Tag C'],
  },
  images: [
    {
      url: 'https://www.test.ie/images/cover.jpg',
      width: 850,
      height: 650,
      alt: 'Photo of text',
    },
  ],
}

export const bookMock = {
  title: 'Open Graph Book Title',
  description: 'Description of open graph book',
  url: 'https://www.example.com/books/book-title',
  type: 'book',
  book: {
    releaseDate: '2018-09-17T11:08:13Z',
    isbn: '978-3-16-148410-0',
    authors: [
      'https://www.example.com/authors/@firstnameA-lastnameA',
      'https://www.example.com/authors/@firstnameB-lastnameB',
    ],
    tags: ['Tag A', 'Tag B', 'Tag C'],
  },
  images: [
    {
      url: 'https://www.test.ie/images/book.jpg',
      width: 850,
      height: 650,
      alt: 'Cover of the book',
    },
  ],
}

export const generalMock = {
  title: 'Using More of Config',
  titleTemplate: '%s | David Zwirner',
  description: 'This example uses more of the available config options.',
  canonical: 'https://www.canonical.ie/',
  noindex: false,
  nofollow: false,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.url.ie/',
    siteName: 'SiteName',
    title: 'Open Graph Title',
    description: 'Open Graph Description',
    images: [
      {
        url: 'https://www.example.ie/og-image-01.jpg',
        width: 800,
        height: 600,
        alt: 'Og Image Alt',
        type: 'image/jpeg',
      },
      {
        url: 'https://www.example.ie/og-image-02.jpg',
        width: 900,
        height: 800,
        alt: 'Og Image Alt Second',
        type: 'image/jpeg',
      },
      {url: 'https://www.example.ie/og-image-03.jpg'},
      {url: 'https://www.example.ie/og-image-04.jpg'},
    ],
    videos: [],
  },
  profile: {
    firstName: '',
    lastName: '',
    username: '',
    gender: '',
  },
  book: {
    releaseDate: '2018-09-17T11:08:13Z',
    isbn: '978-3-16-148410-0',
    authors: [
      'https://www.example.com/authors/@firstnameA-lastnameA',
      'https://www.example.com/authors/@firstnameB-lastnameB',
    ],
    tags: ['Tag A', 'Tag B', 'Tag C'],
  },
  article: {
    publishedTime: '2017-06-21T23:04:13Z',
    modifiedTime: '2018-01-21T18:04:43Z',
    expirationTime: '2022-12-21T22:04:11Z',
    section: 'Section II',
    authors: [
      'https://www.example.com/authors/@firstnameA-lastnameA',
      'https://www.example.com/authors/@firstnameB-lastnameB',
    ],
    tags: ['Tag A', 'Tag B', 'Tag C'],
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
  facebook: {
    appId: '',
  },
}

export const DEFAULT_SEO_PROPERTIES = {
  title: 'New York, London, Paris and Hong Kong Art Galleries',
  description:
    'David Zwirner is a gallery with locations in New York, London, Paris and Hong Kong. We present physical and online exhibitions as well as podcasts, books, and more.',
  titleTemplate: '%s | David Zwirner',
  defaultTitle: 'David Zwirner',
  canonical: 'https://www.davidzwirner.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.davidzwirner.com/',
    siteName: 'David Zwirner',
  },
  twitter: {
    site: '@davidzwirner',
    cardType: 'summary_large_image',
  }
}
