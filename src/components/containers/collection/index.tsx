import {CartCost, useCart} from '@shopify/hydrogen-react'
import {DzText, DzTitle, TEXT_SIZES} from '@zwirner/design-system'

import CartLines from '@/common/components/cart/CartLines'
import {DzCheckOutButton} from '@/common/components/cart/DzCheckOutButton'
import {COLLECTION_NOTE} from '@/common/constants/cart'
import {DzLink} from '@/components/wrappers/DzLinkWrapper'

import styles from './collection.module.css'

const CollectionContainer = () => {
  const {cost} = useCart()
  return (
    <div>
      <div className="items-center justify-between py-10 md:flex">
        <DzTitle title="Collection" titleSize="extraLarge" titleType="h1" />
        <DzLink href="/available-artworks">Continue Shopping</DzLink>
      </div>
      <div className={styles.container}>
        <CartLines />
        <div className={styles.checkoutContainer}>
          <div className="flex flex-col gap-9">
            <DzText
              text={COLLECTION_NOTE}
              textSize={TEXT_SIZES.SMALL}
              className="py-5 text-black-60"
            />
            <div className="flex items-center justify-between py-2">
              <DzText text="Subtotal" className="text-black-60" />
              <CartCost amountType="subtotal" />
            </div>
            <div className="flex items-center justify-between py-2">
              <DzText text="Shipping" className="text-black-60" />
              <DzText text="Calculated at next step" className="text-black-60" />
            </div>
          </div>
          <div className={styles.checkoutAction}>
            <hr />
            <div className="flex w-full items-center justify-between">
              <div className="text-md">Total</div>
              <div className="flex items-center">
                <span className={styles.checkoutActionTotalCountCurrencyCode}>
                  {cost?.totalAmount?.currencyCode}
                </span>
                <span className="text-lg">
                  <CartCost amountType="total" />
                </span>
              </div>
            </div>
            <DzCheckOutButton className="my-3">Complete Purchase</DzCheckOutButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollectionContainer
