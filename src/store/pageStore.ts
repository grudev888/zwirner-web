import {create} from 'zustand'

export type PageState = {
  title: string
  hash: string
  section: string
}

type PageStore = PageState & {
  setPageState: (state: PageState) => void
}

// Initialize a default state
const INITIAL_STATE: PageState = {
  title: '',
  hash: '',
  section: '',
}

const usePageStore = create<PageStore>()((set) => ({
  ...INITIAL_STATE,
  setPageState: (state: PageState) => set(() => state),
}))

export default usePageStore
