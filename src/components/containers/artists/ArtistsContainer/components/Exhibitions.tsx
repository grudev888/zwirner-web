import {DzComplexGrid, DzHero} from '@zwirner/design-system'

import SectionTitle from './SectionTitle'

const Exhibitions = ({exhibitions}: {exhibitions: any}) => {
  return (
    <section>
      <SectionTitle title={exhibitions.title} />

      {exhibitions._type === 'grid' ? (
        <DzComplexGrid {...exhibitions.data} />
      ) : (
        <DzHero items={exhibitions.data} />
      )}
    </section>
  )
}

export default Exhibitions
