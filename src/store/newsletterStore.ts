import {create} from 'zustand'

type State = {
  method: string
  cta_value: string
}

type NewsletterState = State & {
  setNewsletterState: (state: State) => void
}

// Initialize a default state
const INITIAL_STATE: State = {
  method: 'inline',
  cta_value: '',
}

const useNewsletterStore = create<NewsletterState>()((set) => ({
  ...INITIAL_STATE,
  setNewsletterState: (state: State) => set(() => state),
}))

export default useNewsletterStore
