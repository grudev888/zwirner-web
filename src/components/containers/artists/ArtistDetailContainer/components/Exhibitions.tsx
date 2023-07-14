import {DzComplexGrid, DzHero, DzTitleMolecule, DzTitleMoleculeTypes} from '@zwirner/design-system'

const Exhibitions = ({exhibitions, ...rest}: any) => {
  return (
    <section {...rest}>
      <DzTitleMolecule
        type={DzTitleMoleculeTypes.SECTION}
        data={{
          title: exhibitions.title,
          customClass: 'mb-5 md:mb-10',
        }}
      />

      {exhibitions._type === 'grid' ? (
        <DzComplexGrid {...exhibitions.data} />
      ) : (
        <DzHero items={exhibitions.data} />
      )}
    </section>
  )
}

export default Exhibitions
