import {
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  ButtonModes,
  DzButton,
  DzTitleMolecule,
  DzTitleMoleculeTypes,
  useBreakpoints,
} from '@zwirner/design-system'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {useState} from 'react'

const DzComplexGrid = dynamic(
  () => import('@zwirner/design-system').then((mod) => mod.DzComplexGrid),
  {ssr: false}
)

const MOBILE_CARDS_LIMIT = 2
const LOAD_MORE_FEATURE_ENABLED = false

const SelectedPress = ({selectedPress, ...rest}: any) => {
  const router = useRouter()
  const {isSmall} = useBreakpoints()
  const [shownCards, setShownCards] = useState<number>(MOBILE_CARDS_LIMIT)

  return (
    <section {...rest}>
      <DzTitleMolecule
        type={DzTitleMoleculeTypes.SECTION}
        data={{
          title: selectedPress.title,
          customClass: 'mb-5 md:mb-0',
          linkCTA: {
            text: 'Explore Selected Press',
            linkElement: Link,
            url: `/artists/${router.query.slug}/press`,
          },
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
