import {
  BannerAlertVariant,
  BannerMessageVariant,
  BannerToastVariant,
  BannerType,
} from '@zwirner/design-system'
import {useToasts} from 'react-toast-notifications'

type options = {
  type?: BannerType
  messageVariant?: BannerMessageVariant
  alertVariation?: BannerAlertVariant
  toastVariant?: BannerToastVariant
  title: string
  subtitle?: string
  showInfoIcon?: boolean
  linkText?: string
  link?: string
}
// Initialize a default options
const initialOptions: options = {
  title: '',
  type: 'toastType',
  subtitle: '',
  showInfoIcon: false,
  toastVariant: 'tDark',
  link: '',
  linkText: '',
}

const useDzToasts = () => {
  const {addToast} = useToasts()
  const addDzToast = (options: options) => {
    addToast(JSON.stringify({...initialOptions, ...options}))
  }

  return {addToast: addDzToast}
}

export default useDzToasts
