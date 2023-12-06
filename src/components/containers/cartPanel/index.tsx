import {Dialog, Transition} from '@headlessui/react'
import {CartCost, useCart} from '@shopify/hydrogen-react'
import {DzText, TEXT_SIZES} from '@zwirner/design-system'
import Image from 'next/image'
import {Fragment} from 'react'

import CartLines from '@/common/components/cart/CartLines'
import {DzCheckOutButton} from '@/common/components/cart/DzCheckOutButton'
import {COLLECTION_NOTE} from '@/common/constants/cart'
import {DzLink} from '@/components/wrappers/DzLinkWrapper'
import useCartStore from '@/store/cartStore'

export default function CartPanel() {
  const {totalQuantity} = useCart()
  const state = useCartStore((store) => store.state)
  const setCatPanelClose = useCartStore((store) => store.setCatPanelClose)
  return (
    <Transition.Root show={state} as={Fragment}>
      <Dialog as="div" className="relative z-[60]" onClose={setCatPanelClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom=""
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo=""
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-[30rem]">
                  <div className="flex h-screen w-full flex-col items-end overflow-auto bg-white-100">
                    <div className="flex flex-1 flex-col px-5 py-0">
                      <div className="flex w-full justify-between py-4">
                        <button onClick={setCatPanelClose}>
                          <Image
                            width={16.26}
                            height={12}
                            alt="Drawer close"
                            src="/images/drawer-close.svg"
                          />
                        </button>
                        <DzLink href="/collection">Collection ({totalQuantity})</DzLink>
                      </div>
                      <DzText text="Artwork Added" textSize={TEXT_SIZES.LARGE} />
                      <DzText
                        text={COLLECTION_NOTE}
                        textSize={TEXT_SIZES.SMALL}
                        className="py-5 text-black-60"
                      />
                      <ul className="flex h-full w-full flex-1 flex-col gap-5">
                        <CartLines isPanel />
                      </ul>
                    </div>
                    <div className="flex flex-col px-5 pb-5 text-sm">
                      <DzText
                        text={COLLECTION_NOTE}
                        textSize={TEXT_SIZES.SMALL}
                        className="py-4 text-black-60"
                      />
                      <div className="flex items-center justify-between py-2">
                        <DzText text="Subtotal" className="text-black-60" />
                        <CartCost amountType="subtotal" />
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <DzText text="Shipping" className="text-black-60" />
                        <DzText text="Calculated at next step" className="text-black-60" />
                      </div>
                      <DzCheckOutButton className="my-3">Complete Purchase</DzCheckOutButton>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
