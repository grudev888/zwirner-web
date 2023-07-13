import {
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  ButtonModes,
  DzButton,
  DzComplexGrid,
  DzTitleMolecule,
  DzTitleMoleculeTypes,
  useBreakpoints,
} from '@zwirner/design-system'
import Link from 'next/link'
import {useState} from 'react'

const MOBILE_CARDS_LIMIT = 2
const LOAD_MORE_FEATURE_ENABLED = false

const SelectedPress = ({selectedPress, ...rest}: any) => {
  const {isSmall} = useBreakpoints()
  const [shownCards, setShownCards] = useState<number>(MOBILE_CARDS_LIMIT)

  return (
    <section {...rest}>
      <DzTitleMolecule
        type={DzTitleMoleculeTypes.SECTION}
        data={{
          title: selectedPress.title,
          linkCTA: {text: 'Explore Selected Press', linkElement: Link, url: '#'},
        }}
      />
      <DzComplexGrid
        {...{
          ...selectedPress,
          cards:
            LOAD_MORE_FEATURE_ENABLED && isSmall
              ? selectedPress.cards.slice(0, shownCards)
              : selectedPress.cards,
        }}
      />
      {LOAD_MORE_FEATURE_ENABLED && isSmall && shownCards < selectedPress.cards.length ? (
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
