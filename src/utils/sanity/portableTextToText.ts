const defaults = {nonTextBehavior: 'remove'}

export const portableTextToText = (blocks: Array<any>, opts = {}) => {
  const options = Object.assign({}, defaults, opts)

  if (!blocks) {
    return ''
  }

  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove' ? '' : `[${block._type} block]`
      }

      return block.children.map((child: any) => child.text).join('')
    })
    .join('\n\n')
}
