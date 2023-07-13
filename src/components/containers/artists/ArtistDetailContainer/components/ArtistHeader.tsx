import {
  DzLink,
  DzText,
  DzTitleMolecule,
  DzTitleMoleculeTypes,
  LINK_VARIANTS,
  scrollToElementId,
  TEXT_SIZES,
  TITLE_SIZES,
  TITLE_TYPES,
  useBreakpoints,
} from '@zwirner/design-system'

interface ArtistHeaderProps {
  artist: any
  intro: string
}

const HEADER_OFFSET = 120

const ArtistHeader = ({artist, intro}: ArtistHeaderProps) => {
  const {isSmall} = useBreakpoints()
  return (
    <section className="space-between mt-[3.75rem] flex flex-col gap-5 md:flex-row">
      <DzTitleMolecule
        type={DzTitleMoleculeTypes.PAGE}
        data={{
          title: artist.fullName,
          customClass: 'flex-1 mb-5 md:mb-10',
          titleProps: {
            titleType: TITLE_TYPES.H1,
            titleSize: isSmall ? TITLE_SIZES.XL : TITLE_SIZES.XXL,
          },
        }}
      />
      <div className="flex flex-1 flex-col gap-5 whitespace-pre-wrap">
        <DzText textSize={TEXT_SIZES.SMALL} text={intro} />
        <DzLink
          variant={LINK_VARIANTS.TEXT}
          href={'#artist-biography'}
          onClick={(e) => {
            e.preventDefault()
            scrollToElementId('artist-biography', HEADER_OFFSET)
          }}
        >
          Learn More
        </DzLink>
      </div>
    </section>
  )
}

export default ArtistHeader
