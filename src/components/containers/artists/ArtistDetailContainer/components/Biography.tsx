import {
  DzColumn,
  DzGridColumns,
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
import Image from 'next/image'

import {DzPortableText} from '@/components/wrappers/DzPortableText'
import {builder} from '@/sanity/imageBuilder'

const ArtistFooter = ({artist}: {artist: any}) => {
  const {isSmall} = useBreakpoints()
  const renderUrl = (url: string, title: string, isSmall: boolean) => (
    <p>
      <DzLink
        variant={LINK_VARIANTS.TEXT}
        textLinkSize={isSmall ? TEXT_LINK_SIZES.SM : TEXT_LINK_SIZES.MD}
        href={url}
        openNewTab
      >
        {title}
      </DzLink>
    </p>
  )

  return (
    <div className="mt-5 flex flex-col gap-10 md:!mt-0">
      {artist.cvUrl && (
        <p>
          <DzLink
            variant={LINK_VARIANTS.TEXT}
            textLinkSize={isSmall ? TEXT_LINK_SIZES.SM : TEXT_LINK_SIZES.MD}
            href={artist.cvUrl}
            openNewTab
          >
            Download Full CV
          </DzLink>
        </p>
      )}
      <div className="flex flex-col gap-5 md:gap-2.5">
        {artist.url && renderUrl(artist.url, 'View Artist Website', isSmall)}
        {artist.social?.facebook && renderUrl(artist.social?.facebook, 'Facebook', isSmall)}
        {artist.social?.instagram && renderUrl(artist.social?.instagram, 'Instagram', isSmall)}
        {artist.social?.twitter && renderUrl(artist.social?.twitter, 'Twitter', isSmall)}
        {artist.social?.weChat && renderUrl(artist.social?.weChat, 'WeChat', isSmall)}
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
          titleProps: {
            titleType: TITLE_TYPES.H2,
            titleSize: TITLE_SIZES.LG,
            subtitleSize: TITLE_SIZES.LG,
            subtitleType: TITLE_TYPES.P,
          },
          customClass: 'mb-5 md:mb-10',
        }}
      />

      <div className="flex flex-col gap-5 md:flex-row">
        <DzGridColumns>
          <DzColumn
            span={3}
            display={['flex']}
            className="h-fit flex-1 flex-col gap-10 md:sticky md:top-16"
          >
            <div>
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
          </DzColumn>

          <DzColumn span={6} start={7} className="pt-5 md:pt-0">
            <DzPortableText
              portableProps={{value: biography.description}}
              builder={builder}
              ImgElement={Image}
            />
          </DzColumn>
        </DzGridColumns>

        {isSmall && <ArtistFooter artist={artist} />}
      </div>
    </section>
  )
}

export default Biography
