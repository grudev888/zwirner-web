import {
  PortableText,
  PortableTextComponentProps,
  PortableTextMarkComponentProps,
  PortableTextProps,
  PortableTextTypeComponentProps,
} from '@portabletext/react'
import {
  CARD_TYPES,
  CardSizes,
  DzCard,
  DzColumn,
  DzGridColumns,
  DzLink,
  DzText,
  DzTitle,
  LINK_VARIANTS,
  MEDIA_TYPES,
  TEXT_LINK_SIZES,
  TEXT_TYPES,
  TITLE_TYPES,
} from '@zwirner/design-system'
import cn from 'classnames'
import Image from 'next/image'
import React, {FC, Fragment, useMemo} from 'react'

import {builder} from '@/sanity/imageBuilder'

import styles from './portableText.module.css'

interface CustomStyles {
  [key: string]: string
}
export interface DzPortableTextProps {
  portableProps: PortableTextProps
  customStyles?: CustomStyles
}

const generalSpacer = (children: any) => {
  if (children && Array.isArray(children) && children[0] === '' && children.length === 1) {
    return <span className="block h-5 w-full" />
  }
  return null
}

export const DzPortableText: FC<DzPortableTextProps> = ({portableProps, customStyles}) => {
  const CUSTOM_COMPONENTS = useMemo(() => {
    return {
      types: {
        bodyImage: ({value}: PortableTextTypeComponentProps<any>) => {
          const {_key, alt, asset, caption} = value?.image ?? {}
          const imgSrc = asset ? builder.image(asset).url() : ''

          return (
            <DzGridColumns className={cn(styles.containerSpacer, customStyles?.['bodyImage'])}>
              <DzColumn span={10} start={2}>
                <DzCard
                  type={CARD_TYPES.MEDIA}
                  data={{
                    id: _key,
                    size: CardSizes['10col'],
                    media: {
                      type: MEDIA_TYPES.IMAGE,
                      ImgElement: Image,
                      imgProps: {src: imgSrc, alt, fill: true},
                    },
                    description: caption ?? '',
                    size: CardSizes['10col'],
                  }}
                />
              </DzColumn>
            </DzGridColumns>
          )
        },
        callToAction: ({value, isInline}: PortableTextTypeComponentProps<any>) =>
          isInline ? (
            <a href={value.url}>{value.text}</a>
          ) : (
            <div className="callToAction">{value.text}</div>
          ),
      },
      marks: {
        greyNote: ({children}: PortableTextMarkComponentProps) => {
          return children ? (
            <>
              {generalSpacer(children)}
              <span className={cn(styles.grayParagraph, customStyles?.['greyNote'])}>
                {children}
              </span>
            </>
          ) : null
        },
        link: ({value, children}: PortableTextMarkComponentProps) => {
          const target = (value?.href || '').startsWith('http')
          return (
            <DzLink
              href={value?.href}
              openNewTab={target}
              variant={LINK_VARIANTS.TEXT}
              className={styles.link}
              textLinkSize={TEXT_LINK_SIZES.MD}
            >
              {children}
            </DzLink>
          )
        },
      },
      block: {
        normal: ({children}: PortableTextComponentProps<any>) => {
          return children ? (
            <>
              {generalSpacer(children)}

              <DzText
                className={cn(styles.singleParagraph, customStyles?.['normal'])}
                text={children as any}
                textType={TEXT_TYPES.P}
              />
            </>
          ) : (
            <Fragment></Fragment>
          )
        },
        h1: ({children}: PortableTextComponentProps<any>) => {
          return (
            <>
              {generalSpacer(children)}
              <DzTitle
                className={cn(styles.h1Container, customStyles?.['h1'])}
                classNameTitle={cn(styles.h1, customStyles?.['h1-title'])}
                title={children}
                titleType={TITLE_TYPES.H1}
              />
            </>
          )
        },
      },
    }
  }, [customStyles])

  return <PortableText components={CUSTOM_COMPONENTS} {...portableProps} />
}

export default DzPortableText
