/*
 Removes the number from the end of a paginated path, eg:
  exhibitions/past-exhibitions -> /exhibitions/past-exhibitions
  exhibitions/past-exhibitions/2 -> /exhibitions/past-exhibitions
  exhibitions/past-exhibitions/page/3 -> /exhibitions/past-exhibitions/page
 */

export const getBasePaginatedPath = (paginatedPath: string) => {
  if (!paginatedPath.includes('/page')) {
    return paginatedPath.concat('/page')
  }
  const splitPath = paginatedPath.split('/')
  const lastPart = splitPath.pop() || ''

  return isNaN(parseInt(lastPart)) ? paginatedPath : splitPath.join('/')
}
