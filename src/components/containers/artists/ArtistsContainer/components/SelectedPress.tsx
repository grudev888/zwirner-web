import {
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  ButtonModes,
  DzButton,
  DzComplexGrid,
  useBreakpoints,
} from '@zwirner/design-system'
import {useState} from 'react'

import SectionTitle from './SectionTitle'

const MOBILE_CARDS_LIMIT = 6

const SelectedPress = ({selectedPress}: {selectedPress: any}) => {
  const {isSmall} = useBreakpoints()
  const [shownCards, setShownCards] = useState<number>(MOBILE_CARDS_LIMIT)

  return (
    <section>
      <SectionTitle title={selectedPress.title} linkTitle="Explore Selected Press" />
      <DzComplexGrid
        {...{
          ...selectedPress,
          cards: isSmall ? selectedPress.cards.slice(0, shownCards) : selectedPress.cards,
        }}
      />
      {isSmall && shownCards < selectedPress.cards.length ? (
        <div className="flex">
          <DzButton
            className="mx-auto mt-10"
            variant={BUTTON_VARIANTS.PRIMARY}
            size={BUTTON_SIZES.LARGE}
            mode={ButtonModes.DARK}
            onClick={() => setShownCards((prev) => prev + MOBILE_CARDS_LIMIT)}
          >
            Load more
          </DzButton>
        </div>
      ) : null}
    </section>
  )
}

export default SelectedPress
