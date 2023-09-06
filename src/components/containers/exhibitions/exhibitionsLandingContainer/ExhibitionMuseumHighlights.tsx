import {CARD_TYPES, CardSizes, DzCard, DzColumn, DzGridColumns} from '@zwirner/design-system'
import {FC} from 'react'

import {mapHighlightCards} from '@/components/containers/exhibitions/exhibitionsLandingContainer/mapper'

interface ExhibitionMuseumHighlightsProps {
  data: any
}

export const ExhibitionMuseumHighlights: FC<ExhibitionMuseumHighlightsProps> = ({data}) => {
  // TODO do sorting in query after resolving GroqQueryError: Cannot determine property key for type: PipeFuncCall
  const museumHighlightsCardsData = mapHighlightCards(
    data.museumHighlights?.sort((h1: any, h2: any) =>
      h1.dateSelection?.dateRange?.from?.localeCompare(h2.dateSelection?.dateRange?.from)
    )
  )

  return (
    <DzGridColumns className="!gap-y-10 md:gap-y-5">
      {museumHighlightsCardsData?.map((article: any, key: any) => {
        return (
          <DzColumn key={`article-${key}`} span={4}>
            <article>
              <DzCard type={CARD_TYPES.CONTENT} data={{...article, size: CardSizes['4col']}} />
            </article>
          </DzColumn>
        )
      })}
    </DzGridColumns>
  )
}
