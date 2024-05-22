function searchByProperty(objects: any[], propertyName: string, keyword: string) {
  return objects.filter((object) =>
    object[propertyName].toLowerCase().includes(keyword.toLowerCase())
  )
}

export { searchByProperty }
