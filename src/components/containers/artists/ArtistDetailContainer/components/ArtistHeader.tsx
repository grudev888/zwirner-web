import {
  DzLink,
  DzText,
  DzTitleMolecule,
  DzTitleMoleculeTypes,
  LINK_VARIANTS,
  TEXT_SIZES,
  TITLE_SIZES,
  TITLE_TYPES,
  useBreakpoints,
} from '@zwirner/design-system'

const ArtistHeader = ({artist, intro}: {artist: any; intro: string}) => {
  const {isSmall} = useBreakpoints()
  return (
    <section className="space-between mt-[3.75rem] flex flex-col gap-5 md:flex-row">
      <DzTitleMolecule
        type={DzTitleMoleculeTypes.PAGE}
        data={{
          title: artist.fullName,
          customClass: 'flex-1',
          titleProps: {
            titleType: TITLE_TYPES.H1,
            titleSize: isSmall ? TITLE_SIZES.XL : TITLE_SIZES.XXL,
          },
        }}
      />
      <div className="flex flex-1 flex-col gap-5 whitespace-pre-wrap">
        <DzText textSize={TEXT_SIZES.SMALL} text={intro} />
        <DzLink variant={LINK_VARIANTS.TEXT} href={'#'}>
          Learn More
        </DzLink>
      </div>
    </section>
  )
}

export default ArtistHeader
