export function resolveHref(documentType?: string, slug?: string): string | undefined {
  switch (documentType) {
    case 'home':
      return '/'
    default:
      return slug ? `${slug}` : undefined
  }
}
