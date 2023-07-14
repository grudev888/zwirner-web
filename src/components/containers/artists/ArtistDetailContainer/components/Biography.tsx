import {
  DzLink,
  DzMedia,
  DzText,
  DzTitle,
  DzTitleMolecule,
  DzTitleMoleculeTypes,
  LINK_VARIANTS,
  MEDIA_ASPECT_RATIOS,
  TEXT_LINK_SIZES,
  TEXT_SIZES,
  TITLE_SIZES,
  TITLE_TYPES,
  useBreakpoints,
} from '@zwirner/design-system'

import DzPortableText from '@/common/components/portableText'

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

const Biography = ({title, biography, artist, ...rest}: any) => {
  const {isSmall} = useBreakpoints()

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
  })

  const birthYear = artist.birthdate ? dateFormatter.format(new Date(artist.birthdate)) : ''
  const deathYear = artist.deathDate ? dateFormatter.format(new Date(artist.deathDate)) : ''

  return (
    <section {...rest}>
      <DzTitleMolecule
        type={DzTitleMoleculeTypes.SECTION}
        data={{
          title: title,
          customClass: 'mb-5 md:mb-10',
        }}
      />

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

          {birthYear && (
            <DzText
              textSize={TEXT_SIZES.SMALL}
              text={`${deathYear ? '' : 'b.'}${birthYear}${deathYear ? ' — ' + deathYear : ''}`}
            />
          )}

          {!isSmall && <ArtistFooter artist={artist} />}
        </div>

        <div className="mt-5 flex-1 md:!mt-0">
          <DzPortableText portableProps={{value: biography.description}} />
        </div>

        {isSmall && <ArtistFooter artist={artist} />}
      </div>
    </section>
  )
}

export default Biography
