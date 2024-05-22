function removeEmptyElements(arr: any[]) {
  return arr.filter((element) => {
    // Remove element if it is empty
    return element !== null && element !== undefined && element !== ''
  })
}

export { removeEmptyElements }
