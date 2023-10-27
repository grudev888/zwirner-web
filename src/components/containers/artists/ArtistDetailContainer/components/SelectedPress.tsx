import {
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  ButtonModes,
  DzButton,
  DzTitleMolecule,
  DzTitleMoleculeTypes,
  TITLE_SIZES,
  TITLE_TYPES,
  useBreakpoints,
} from '@zwirner/design-system'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {useState} from 'react'

import PageBuilder from '@/components/pageBuilder'

const MOBILE_CARDS_LIMIT = 2
const LOAD_MORE_FEATURE_ENABLED = true
const DEFAULT_ITEMS_PER_ROW = 3
const SelectedPress = ({selectedPress, ...rest}: any) => {
  const router = useRouter()
  const {isSmall} = useBreakpoints()
  const [shownCards, setShownCards] = useState<number>(MOBILE_CARDS_LIMIT)

  return (
    <section {...rest}>
      <DzTitleMolecule
        type={DzTitleMoleculeTypes.MOLECULE}
        data={{
          title: 'Selected Press',
          titleProps: {
            titleType: TITLE_TYPES.H2,
            titleSize: TITLE_SIZES.LG,
            subtitleSize: TITLE_SIZES.LG,
            subtitleType: TITLE_TYPES.P,
          },
          customClass: 'mb-5 md:mb-10',
          linkCTA: {
            text: 'Explore Selected Press',
            url: `/artists/${router.query.slug}/press`,
          },
        }}
        LinkElement={Link}
      />
      <PageBuilder
        components={[
          {
            ...selectedPress,
            props: {
              ...selectedPress?.props,
              itemsPerRow: DEFAULT_ITEMS_PER_ROW,
              grid:
                LOAD_MORE_FEATURE_ENABLED && isSmall
                  ? selectedPress?.props?.grid?.slice(0, shownCards)
                  : selectedPress?.props?.grid,
            },
          },
        ]}
      />

      {LOAD_MORE_FEATURE_ENABLED && isSmall && shownCards < selectedPress?.props?.grid.length ? (
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
