import {
  CartLineProvider,
  CartLineQuantityAdjustButton,
  Money,
  useCart,
} from '@shopify/hydrogen-react'
import {TEXT_SIZES} from '@zwirner/design-system'
import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

import {objectedAttributes} from '@/components/containers/cartPanel/mapper'
import CartLineQuantityIncreaseButton from '@/components/containers/collection/CartLineQuantityIncreaseButton'
import {DzLink} from '@/components/wrappers/DzLinkWrapper'
import useCartStore from '@/store/cartStore'

import styles from './cartLine.module.css'

interface CartLinesProps {
  isPanel?: boolean
}

const CartLines = ({isPanel}: CartLinesProps) => {
  const {lines} = useCart()
  const inventoryList = useCartStore((store) => store.inventoryList)

  return (
    <div className={clsx(styles.cartContainer, isPanel || styles.cartContainerResponsive)}>
      <div className={clsx(styles.cartHeader, isPanel || styles.cartHeaderResponsive)}>
        <div className={clsx(styles.cartHeaderTitle, isPanel || styles.cartHeaderTitleResponsive)}>
          Title
        </div>
        <div className={styles.cartHeaderOther}>
          <div className={styles.cartHeaderInfo}></div>
          <div
            className={clsx(
              styles.cartHeaderQuantity,
              isPanel || styles.cartHeaderQuantityResponsive
            )}
          >
            Quantity
          </div>
          <div className={styles.cartHeaderTotal}>Total</div>
        </div>
      </div>
      {lines?.map((line) => {
        const {
          maxQty: _maxQty,
          artistName,
          artistSlug,
          artworkTitle,
          artworkSlug,
          artworkImage,
          year,
        } = objectedAttributes(line?.attributes || [])
        const maxQty: number | null = typeof _maxQty === 'undefined' ? null : parseInt(_maxQty)
        return (
          <div className={styles.cartBodyContainer} key={line?.id}>
            <CartLineProvider line={line!}>
              <div
                className={clsx(
                  styles.cartBodyImageContainer,
                  isPanel || styles.cartBodyImageContainerResponsive
                )}
              >
                <Image
                  src={artworkImage}
                  alt={artworkTitle}
                  width={100}
                  height={75}
                  className={styles.cartBodyImage}
                />
              </div>
              <div
                className={clsx(styles.cartBodyOther, isPanel || styles.cartBodyOtherResponsive)}
              >
                <div className={styles.cartBodyInfo}>
                  {artistSlug ? (
                    <DzLink href={artistSlug} textLinkSize={TEXT_SIZES.SMALL}>
                      {artistName}
                    </DzLink>
                  ) : (
                    artistName
                  )}
                  {artworkSlug ? (
                    <div>
                      <DzLink href={artworkSlug} textLinkSize={TEXT_SIZES.SMALL} className="italic">
                        {artworkTitle}
                      </DzLink>
                      , {year}
                    </div>
                  ) : (
                    <>
                      <i>{artworkSlug}</i>, {year}
                    </>
                  )}
                  <div className={styles.cartBodyInfoPrice}>
                    <Money data={line?.merchandise?.price!}></Money>
                  </div>
                </div>
                <div className={styles.cartBodyQuantityContainer}>
                  {maxQty === 1 ? (
                    <div className={styles.cartBodyQuantityText}>Only 1 Artwork per customer</div>
                  ) : (
                    <>
                      <div className={styles.cartBodyQuantityAdjustContainer}>
                        <CartLineQuantityAdjustButton
                          adjust="decrease"
                          className={clsx(
                            maxQty == line?.quantity && 'text-[#757575]',
                            styles.cartBodyQuantityAdjustBtn
                          )}
                        >
                          —
                        </CartLineQuantityAdjustButton>
                        <div className={styles.cartBodyQuantity}>{line?.quantity}</div>
                        <CartLineQuantityIncreaseButton
                          className={clsx(
                            maxQty == line?.quantity && 'text-[#757575]',
                            styles.cartBodyQuantityAdjustBtn
                          )}
                          disabled={maxQty == line?.quantity}
                        >
                          +
                        </CartLineQuantityIncreaseButton>
                      </div>
                      {maxQty !== null && (
                        <div className={styles.cartBodyQuantityText}>Max of {maxQty} allowed</div>
                      )}
                      {inventoryList &&
                        (inventoryList[line?.merchandise?.product?.id ?? ''] ?? 0) <
                          (line?.quantity ?? 0) && (
                          <div className={styles.cartBodyErrorText}>
                            Current Inventory: {inventoryList[line?.merchandise?.product?.id ?? '']}
                          </div>
                        )}
                    </>
                  )}
                  <CartLineQuantityAdjustButton
                    adjust="remove"
                    className={clsx(
                      styles.cartBodyRemoveBtn,
                      isPanel || styles.cartBodyRemoveBtnResponsive
                    )}
                  >
                    Remove
                  </CartLineQuantityAdjustButton>
                </div>
                <div
                  className={clsx(styles.cartBodyTotal, isPanel || styles.cartBodyTotalResponsive)}
                >
                  <Money data={line?.cost?.totalAmount!}></Money>
                </div>
              </div>
            </CartLineProvider>
          </div>
        )
      })}
    </div>
  )
}

export default CartLines
