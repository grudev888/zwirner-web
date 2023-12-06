import {create} from 'zustand'

type State = {
  state: boolean
  inventoryList: any
}

type NewsletterState = State & {
  setCatPanelOpen: () => void
  setCatPanelClose: () => void
  setInventoryList: (val: object) => void
}

// Initialize a default state
const INITIAL_STATE: State = {
  state: false,
  inventoryList: null,
}

const useCartStore = create<NewsletterState>()((set) => ({
  ...INITIAL_STATE,
  setCatPanelOpen: () => set({state: true}),
  setCatPanelClose: () => set({state: false}),
  setInventoryList: (inventoryList) => set({inventoryList}),
}))

export default useCartStore
