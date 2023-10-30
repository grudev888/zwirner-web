import {DzPortableText} from '@/components/wrappers/DzPortableTextWrapper'
import {builder} from '@/sanity/imageBuilder'

interface SafeTextProps {
  key: string
  text: any
  prefix?: string
  customStyles?: any
  charLimit?: number
}

export const safeText = ({
  key,
  text,
  prefix = 'portableText',
  customStyles = {normal: '!mx-0'},
  charLimit,
}: SafeTextProps) => {
  if (!text) return {}
  if (typeof text === 'string') {
    return {
      [key]: text,
    }
  }
  const capitalizedKey = key?.charAt(0)?.toUpperCase() + key?.slice(1)
  return {
    [`${prefix}${capitalizedKey}`]: (
      <DzPortableText
        portableProps={{value: text}}
        builder={builder}
        customStyles={customStyles}
        charLimit={charLimit}
      />
    ),
  }
}
