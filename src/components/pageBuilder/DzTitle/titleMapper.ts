import {DzTitleTypeProps} from '@/sanity/schema/objects/page/components/molecules/dzTitle'

export const dzTitleOverrides = (props: DzTitleTypeProps) => {
  const {enableOverrides} = props
  if (!enableOverrides) return {}

  return {}
}

export const titleMappers: any = {
  artist: (data: any) => {
    const {birthdate, fullName, summary, description} = data

    return {
      category: birthdate,
      title: fullName,
      subtitle: summary,
      description,
      // linkCTA: {
      //   text: 'View All',
      //   linkElement: 'a',
      //   url: '/',
      // },
    }
  },
  artwork: (data: any) => {
    const {availability, dimensions, edition, medium, title} = data

    return {
      category: availability,
      title,
      subtitle: medium,
      description: `${edition} ${dimensions}`,
      // linkCTA: {
      //   text: 'View All',
      //   linkElement: 'a',
      //   url: '/',
      // },
    }
  },
  exhibition: (data: any) => {
    const {subtitle, title, summary, description} = data

    return {
      category: subtitle,
      title,
      subtitle: summary,
      description,
      // linkCTA: {
      //   text: 'View All',
      //   linkElement: 'a',
      //   url: '/',
      // },
    }
  },
}
