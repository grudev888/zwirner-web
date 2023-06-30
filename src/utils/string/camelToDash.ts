const camelToDashCase = (str: string = '') => {
  return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
}

export default camelToDashCase
