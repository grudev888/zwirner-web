import {
  DzLink,
  DzTitle,
  LINK_VARIANTS,
  TEXT_LINK_SIZES,
  TITLE_SIZES,
  TITLE_TYPES,
  useBreakpoints,
} from '@zwirner/design-system'
import cn from 'classnames'
import Link from 'next/link'

interface SectionTitleProps {
  title: string
  className?: string
  linkTitle?: string
}

const SectionTitle = ({title, linkTitle, className = ''}: SectionTitleProps) => {
  const {isSmall} = useBreakpoints()
  return (
    <div className={cn('mb-5 flex justify-between md:mb-10', className)}>
      <DzTitle
        titleType={TITLE_TYPES.H2}
        title={title}
        titleSize={isSmall ? TITLE_SIZES.MD : TITLE_SIZES.XL}
      />
      {linkTitle && (
        <DzLink
          LinkElement={Link}
          href={'#'}
          variant={LINK_VARIANTS.TEXT}
          textLinkSize={isSmall ? TEXT_LINK_SIZES.XS : TEXT_LINK_SIZES.SM}
        >
          {linkTitle}
        </DzLink>
      )}
    </div>
  )
}

export default SectionTitle
