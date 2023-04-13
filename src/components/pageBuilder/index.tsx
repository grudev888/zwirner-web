import {DzColumn} from '@zwirner/design-system'
import {FC} from 'react'

import {DzCard} from './DzCard/DzCard'
import {DzHero} from './DzHero/DzHero'
import {DzImage} from './DzImage/DzImage'
import {DzRichText} from './DzRichText/DzRichText'

const componentsIndex: any = {
  dzHero: DzHero,
  dzImage: DzImage,
  dzCard: DzCard,
  dzRichText: DzRichText,
}
interface PageBuilderProps {
  sections: any[]
}

export const PageBuilder: FC<PageBuilderProps> = ({sections = []}) => {
  return (
    <DzColumn className="h-screen divide-y" span={12}>
      {Object.entries(sections).map((section, k) => {
        const [type, data] = section
        const Component = componentsIndex[type] ?? 'div'
        return <Component className=""key={`${k}-${type}`} data={data}/>
      })}
    </DzColumn>
  )
}

export default PageBuilder
