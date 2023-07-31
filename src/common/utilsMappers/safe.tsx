import DzPortableText from '@/common/components/portableText'

interface SafeTextProps {
  key: string
  text: any
  prefix?: string
}

export const safeText = ({key, text, prefix = 'portableText'}: SafeTextProps) => {
  if (!text) return {}
  if (typeof text === 'string') {
    return {
      [key]: text,
    }
  }
  const capitalizedKey = key?.charAt(0)?.toUpperCase() + key?.slice(1)
  return {
    [`${prefix}${capitalizedKey}`]: <DzPortableText portableProps={{value: text}} />,
  }
}
