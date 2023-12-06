export function objectedAttributes(attributes: Array<any>) {
  const obj: any = {}
  attributes.forEach((item) => {
    obj[item.key] = item.value
  })
  return obj
}
