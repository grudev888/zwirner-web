import {DzComplexGrid, DzHero, DzTitleMolecule, DzTitleMoleculeTypes} from '@zwirner/design-system'

const Exhibitions = ({exhibitions}: {exhibitions: any}) => {
  return (
    <section>
      <DzTitleMolecule type={DzTitleMoleculeTypes.SECTION} data={{title: exhibitions.title}} />

      {exhibitions._type === 'grid' ? (
        <DzComplexGrid {...exhibitions.data} />
      ) : (
        <DzHero items={exhibitions.data} />
      )}
    </section>
  )
}

export default Exhibitions
