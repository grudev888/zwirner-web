import {
  DzEditorial,
  DzLink,
  DzMedia,
  DzText,
  DzTitle,
  EDITORIAL_TYPES,
  LINK_VARIANTS,
  MEDIA_ASPECT_RATIOS,
  TEXT_LINK_SIZES,
  TEXT_SIZES,
  TITLE_SIZES,
  TITLE_TYPES,
  useBreakpoints,
} from '@zwirner/design-system'

import SectionTitle from './SectionTitle'

const ArtistFooter = ({artist}: {artist: any}) => {
  const renderUrl = (url: string, title: string) => (
    <p>
      <DzLink variant={LINK_VARIANTS.TEXT} textLinkSize={TEXT_LINK_SIZES.MD} href={url} openNewTab>
        {title}
      </DzLink>
    </p>
  )

  return (
    <div className="flex flex-col gap-10">
      {artist.cvUrl && (
        <p>
          <DzLink
            variant={LINK_VARIANTS.TEXT}
            textLinkSize={TEXT_LINK_SIZES.MD}
            href={artist.cvUrl}
            openNewTab
          >
            Download Full CV
          </DzLink>
        </p>
      )}
      <div className="flex flex-col gap-2.5">
        {artist.url && renderUrl(artist.url, 'View Artist Website')}
        {artist.social?.facebook && renderUrl(artist.social?.facebook, 'Facebook')}
        {artist.social?.instagram && renderUrl(artist.social?.instagram, 'Instagram')}
        {artist.social?.twitter && renderUrl(artist.social?.twitter, 'Twitter')}
        {artist.social?.weChat && renderUrl(artist.social?.weChat, 'WeChat')}
      </div>
    </div>
  )
}

const Biography = (props: any) => {
  const {isSmall} = useBreakpoints()
  const {title, biography, artist} = props

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
  })

  const birthYear = artist.birthdate ? dateFormatter.format(new Date(artist.birthdate)) : ''
  const deathYear = artist.deathDate ? dateFormatter.format(new Date(artist.deathDate)) : ''

  return (
    <section>
      <SectionTitle title={title} />

      <div className="flex flex-col gap-5 md:flex-row">
        <div className="flex flex-1 flex-col gap-10">
          <div className="max-w-[20.938rem]">
            <DzMedia
              {...biography.media}
              className="mb-2.5"
              aspectRatio={MEDIA_ASPECT_RATIOS.AUTO}
            />
            <DzTitle
              subtitle={artist.summary}
              subtitleType={TITLE_TYPES.P}
              subtitleSize={TITLE_SIZES.XS}
            />
          </div>

          <DzText
            textSize={TEXT_SIZES.SMALL}
            text={`${deathYear ? '' : 'b.'}${birthYear}${deathYear ? ' — ' + deathYear : ''}`}
          />

          {!isSmall && <ArtistFooter artist={artist} />}
        </div>

        <div className="flex-1">
          <DzEditorial
            type={EDITORIAL_TYPES.COMPLEX}
            data={{reverse: biography.reverse, paragraphs: biography.paragraphs}}
          />
        </div>

        {isSmall && <ArtistFooter artist={artist} />}
      </div>
    </section>
  )
}

export default Biography
