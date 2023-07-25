import {
  DzTitleMolecule,
  DzTitleMoleculeTypes,
  scrollToElementId,
  TITLE_TYPES,
} from '@zwirner/design-system'

interface ArtistHeaderProps {
  artist: any
  intro: string
}

const HEADER_OFFSET = 120

const ArtistHeader = ({artist, intro}: ArtistHeaderProps) => {
  return (
    <section className="space-between mt-10 flex flex-col md:mt-[3.75rem] md:flex-row">
      <DzTitleMolecule
        type={DzTitleMoleculeTypes.PAGE}
        data={{
          title: artist.fullName,
          customClass: 'flex-1',
          titleProps: {
            titleType: TITLE_TYPES.H1,
          },
          description: <>{intro}</>,
          linkCTA: {
            href: '#artist-biography',
            onClick: (e: any) => {
              e.preventDefault()
              scrollToElementId('artist-biography', HEADER_OFFSET)
            },
            children: <>Learn More</>,
          },
        }}
      />
    </section>
  )
}

export default ArtistHeader
