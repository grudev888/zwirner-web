import {DzColumn} from '@zwirner/design-system'
import React, {FC, useState} from 'react'

import useDzToasts from '@/components/hooks/useDzToasts'

const ToastExample: FC = () => {
  const {addToast} = useDzToasts()
  const [title, setTitle] = useState<string>('')
  const [subtitle, setSubtitle] = useState<string>('')
  const toastVariantOptions = ['tDark', 'tSuccess', 'tError']
  const [toastVariant, setToastVariant] = useState<string>('tDark')
  const [showInfoIcon, setShowInfoIcon] = useState<boolean>(false)
  const [link, setLink] = useState<string>('')
  const [linkText, setLinkText] = useState<string>('')
  return (
    <DzColumn span={12}>
      <div>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border"
        />
        <input
          type="text"
          placeholder="subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="border"
        />
        <select value={toastVariant} onChange={(e) => setToastVariant(e.target.value)}>
          {toastVariantOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <label>
          <input
            type="checkbox"
            checked={showInfoIcon}
            onChange={() => setShowInfoIcon((e) => !e)}
          />
          showInfoIcon
        </label>
        <input
          type="text"
          placeholder="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="border"
        />
        <input
          type="text"
          placeholder="linkText"
          value={linkText}
          onChange={(e) => setLinkText(e.target.value)}
          className="border"
        />
      </div>
      <br />
      <button
        onClick={() => addToast({title, subtitle, toastVariant, showInfoIcon, link, linkText})}
      >
        Show Toast Anywhere
      </button>
    </DzColumn>
  )
}

export default ToastExample
