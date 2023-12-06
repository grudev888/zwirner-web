import {useCart} from '@shopify/hydrogen-react'
import {DzButton} from '@zwirner/design-system'
import {useEffect, useState} from 'react'

import {CHECKOUT_UNAVAILABLE_PRODUCTS_ERROR} from '@/common/constants/errorMessages'
import useDzToasts from '@/components/hooks/useDzToasts'
import useCartStore from '@/store/cartStore'
import {getInventories} from '@/storefront/services/cart.service'

function DzCheckOutButton(props: any) {
  const [requestedCheckout, setRequestedCheckout] = useState<boolean>(false)
  const {status, checkoutUrl, lines, cartAttributesUpdate} = useCart()
  const setInventoryList = useCartStore((store) => store.setInventoryList)
  const {addToast} = useDzToasts()
  const {children, ...passthroughProps} = props
  useEffect(() => {
    if (requestedCheckout && checkoutUrl && status === 'idle') window.location.href = checkoutUrl
  }, [requestedCheckout, status, checkoutUrl])
  async function handleSubmit() {
    const {valid, inventories} = await getInventories(lines)
    setInventoryList(inventories)
    if (valid) {
      cartAttributesUpdate([{value: window.location.href, key: 'sourceURL'}])
      setRequestedCheckout(true)
    } else {
      addToast({
        title: CHECKOUT_UNAVAILABLE_PRODUCTS_ERROR,
        toastVariant: 'tError',
      })
    }
  }

  return (
    <DzButton
      onClick={handleSubmit}
      mode="dark"
      variant="secondary"
      size="large"
      disabled={requestedCheckout || passthroughProps.disabled}
      {...passthroughProps}
    >
      {children}
    </DzButton>
  )
}

export {DzCheckOutButton}
