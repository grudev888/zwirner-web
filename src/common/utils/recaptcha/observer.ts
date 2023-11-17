declare global {
  interface Window {
    recaptchaCloseListener: boolean
  }
}

export const captchaInitObserver = () => {
  window.recaptchaCloseListener = true

  var recaptchaWindow = [...document.getElementsByTagName('iframe')]?.find((x: any) =>
    x.src.includes('google.com/recaptcha/api2/bframe')
  )?.parentNode?.parentNode as HTMLDivElement
  const observer = new MutationObserver(() => {
    if (
      recaptchaWindow.style.visibility !== 'visible' ||
      recaptchaWindow.style.opacity !== '1' ||
      recaptchaWindow.style.top !== '10px'
    ) {
      recaptchaWindow.style.opacity = '1'
      recaptchaWindow.style.visibility = 'visible'
      recaptchaWindow.style.top = '10px'
    }
  })

  observer.observe(recaptchaWindow, {attributes: true, attributeFilter: ['style']})
  return observer
}

export const removeCaptchaObserver = (observer: any) => {
  if (observer) observer.disconnect()
}
