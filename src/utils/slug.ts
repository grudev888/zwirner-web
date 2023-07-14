export const removePrefixSlug = (slug: string, prefix: string): string =>
  slug.replace(prefix, '').replace(/^\//g, '')
