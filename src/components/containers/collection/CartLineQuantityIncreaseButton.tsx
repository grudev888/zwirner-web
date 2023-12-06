import {CartLineQuantityAdjustButton} from '@shopify/hydrogen-react'
import React, {ReactNode} from 'react'

interface CartLineQuantityIncreaseButtonProps {
  className?: string
  disabled?: boolean
  children: ReactNode
}

const CartLineQuantityIncreaseButton = ({
  className,
  disabled,
  children,
}: CartLineQuantityIncreaseButtonProps) => {
  if (disabled)
    return (
      <button className={className} disabled>
        {children}
      </button>
    )
  return (
    <CartLineQuantityAdjustButton adjust="increase" className={className}>
      {children}
    </CartLineQuantityAdjustButton>
  )
}

export default CartLineQuantityIncreaseButton
