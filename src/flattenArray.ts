const flatten = (list: any[]) => {
  for (const item of list) {
    if (Array.isArray(item)) {
      return flatten(item)
    }
    return item
  }
}

export const flattenArray = (list: any[]): any[] => {
  let result: any[] = []

  for (const item of list) {
    if (Array.isArray(item)) {
      result = result.concat(flattenArray(item))
    } else {
      result.push(item)
    }
  }

  return result
}
