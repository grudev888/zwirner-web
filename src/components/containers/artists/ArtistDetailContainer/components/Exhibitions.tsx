import {DzHero, DzTitleMolecule, DzTitleMoleculeTypes} from '@zwirner/design-system'
import dynamic from 'next/dynamic'

const DzComplexGrid = dynamic(
  () => import('@zwirner/design-system').then((mod) => mod.DzComplexGrid),
  {ssr: false}
)

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
