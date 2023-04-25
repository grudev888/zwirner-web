import {Listbox} from '@headlessui/react'
import {SanityDocument} from '@sanity/client'
import {ChevronDownIcon, CopyIcon, LaunchIcon, MobileDeviceIcon} from '@sanity/icons'
import {TransferIcon} from '@sanity/icons'
import cn from 'classnames'
import {FC, useState} from 'react'

import styles from './previewIframe.module.css'

// TODO: import it from the design system
const breakpoints = [
  {
    id: 1,
    name: 'iPhone 5',
    value: 'iphone5',
    height: '568px',
    width: '320px',
    type: 'mobile',
  },
  {
    id: 2,
    name: 'iPhone 6',
    value: 'iphone6',
    height: '667px',
    width: '375px',
    type: 'mobile',
  },
  {
    id: 3,
    name: 'iPhone 6 Plus',
    value: 'iphone6p',
    height: '736px',
    width: '414px',
    type: 'mobile',
  },
  {
    id: 4,
    name: 'iPhone 8 Plus',
    value: 'iphone8p',
    height: '736px',
    width: '414px',
    type: 'mobile',
  },
  {
    id: 5,
    name: 'iPhone X',
    value: 'iphonex',
    height: '812px',
    width: '375px',
    type: 'mobile',
  },
  {
    id: 6,
    name: 'iPhone XR',
    value: 'iphonexr',
    height: '896px',
    width: '414px',
    type: 'mobile',
  },
  {
    id: 7,
    name: 'iPhone XS Max',
    value: 'iphonexsmax',
    height: '896px',
    width: '414px',
    type: 'mobile',
  },
  {
    id: 8,
    name: 'iPhone SE (2nd generation)',
    value: 'iphonese2',
    height: '667px',
    width: '375px',
    type: 'mobile',
  },
  {
    id: 9,
    name: 'iPhone 12 mini',
    value: 'iphone12mini',
    height: '812px',
    width: '375px',
    type: 'mobile',
  },
  {
    id: 10,
    name: 'iPhone 12',
    value: 'iphone12',
    height: '844px',
    width: '390px',
    type: 'mobile',
  },
  {
    id: 11,
    name: 'iPhone 12 Pro Max',
    value: 'iphone12promax',
    height: '926px',
    width: '428px',
    type: 'mobile',
  },
  {
    id: 12,
    name: 'iPad',
    value: 'ipad',
    height: '1024px',
    width: '768px',
    type: 'tablet',
  },
  {
    id: 13,
    name: 'iPad Pro 10.5-in',
    value: 'ipad10p',
    height: '1112px',
    width: '834px',
    type: 'tablet',
  },
  {
    id: 14,
    name: 'iPad Pro 12.9-in',
    value: 'ipad12p',
    height: '1366px',
    width: '1024px',
    type: 'tablet',
  },
  {
    id: 15,
    name: 'Galaxy S5',
    value: 'galaxys5',
    height: '640px',
    width: '360px',
    type: 'mobile',
  },
  {
    id: 16,
    name: 'Galaxy S9',
    value: 'galaxys9',
    height: '740px',
    width: '360px',
    type: 'mobile',
  },
  {
    id: 17,
    name: 'Nexus 5X',
    value: 'nexus5x',
    height: '660px',
    width: '412px',
    type: 'mobile',
  },
  {
    id: 18,
    name: 'Nexus 6P',
    value: 'nexus6p',
    height: '732px',
    width: '412px',
    type: 'mobile',
  },
  {
    id: 19,
    name: 'Pixel',
    value: 'pixel',
    height: '960px',
    width: '540px',
    type: 'mobile',
  },
  {
    id: 20,
    name: 'Pixel XL',
    value: 'pixelxl',
    height: '1280px',
    width: '720px',
    type: 'mobile',
  },
]

interface PreviewIframeProps {
  options: any
  document: SanityDocument
}

export const PreviewIframe: FC<PreviewIframeProps> = ({options, document}) => {
  const [openMobile, setOpenMobile] = useState(false)
  const [rotateViewport, setRotateViewport] = useState(false)
  const [selectedBreakpoint, setSelectedBreakpoint] = useState(breakpoints[10])
  const viewportWidth = !rotateViewport ? selectedBreakpoint.width : selectedBreakpoint.height
  const viewportHeight = !rotateViewport ? selectedBreakpoint.height : selectedBreakpoint.width
  const mobileIframeStyle = openMobile
    ? {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: viewportWidth,
        height: viewportHeight,
        border: '1px solid rgb(77 77 77)',
      }
    : {}

  const {url} = options
  const source = typeof url === 'function' ? url(document.draft ?? document.displayed) : url
  return (
    <div className={styles.container}>
      <div className={styles.headerMenu}>
        <div
          className={cn(styles.mobileContainer, openMobile ? styles.openMobile : '')}
          onClick={() => {
            setOpenMobile((s) => !s)
          }}
        >
          <MobileDeviceIcon className={styles.copyIcon} />
        </div>
        <input className={styles.inputUrl} value={source} readOnly />
        <button
          className={styles.copyBtn}
          onClick={() => {
            navigator.clipboard.writeText(source)
          }}
        >
          <CopyIcon className={styles.copyIcon} />
        </button>
        <button
          className={styles.openBtn}
          onClick={() => {
            window.open(source, '_blank', 'noreferrer')
          }}
        >
          <div>
            <LaunchIcon />
          </div>
          Open
        </button>
      </div>
      {openMobile ? (
        <div className={styles.mobileViewer}>
          <div className={styles.selectionSection}>
            <strong className="text-sm">Dimensions:</strong>
            <Listbox
              value={selectedBreakpoint}
              onChange={(selected: any) => {
                setSelectedBreakpoint(selected)
              }}
            >
              <Listbox.Button>
                <div className={styles.selector}>
                  {selectedBreakpoint.name} <ChevronDownIcon />
                </div>
              </Listbox.Button>
              <Listbox.Options className={styles.selectorOptions}>
                {breakpoints.map((breakpoint) => (
                  <Listbox.Option
                    key={breakpoint.id}
                    className={styles.selectorOption}
                    value={breakpoint}
                  >
                    {breakpoint.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>
          <div className={styles.visualizeScreen}>
            <input className={styles.inputViewport} value={viewportWidth} disabled />
            <div
              className={styles.rotateViewport}
              onClick={() => {
                setRotateViewport((v) => !v)
              }}
            >
              <TransferIcon className={styles.rotateIcon} />
            </div>
            <input className={styles.inputViewport} value={viewportHeight} disabled />
          </div>
        </div>
      ) : null}

      <iframe
        className={styles.frame}
        style={mobileIframeStyle}
        title={`preview`}
        frameBorder="0"
        src={source}
        sandbox="allow-same-origin allow-forms allow-scripts"
      ></iframe>
    </div>
  )
}
