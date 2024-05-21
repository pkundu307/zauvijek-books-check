import * as React from 'react'
import ListItemView from '../view/list.item.view'

export default function ListItemController(props: any) {
  const [items, setItems] = React.useState({
    data: [],
    meta: {}
  })
  const [isSearching, setSearching] = React.useState(false)

  React.useEffect(() => {
    if (props.data && isSearching === false) {
      setItems(props.data)
    } else {
      const result = { data: props.searchData, meta: {} }
      setItems(result)
    }
  }, [props.data, isSearching, props.searchData])

  React.useEffect(() => {
    if (props.search === '') {
      setSearching(false)
    } else {
      setSearching(true)
    }
  }, [props.search])

  const useControlledState = (state: any) => {
    return React.useMemo(
      () => ({
        ...state,
        pageIndex: props.page,
        pageSize: props.limit
      }),
      [state]
    )
  }

  const setPageIndex = React.useCallback((value: any) => {
    props.setPage(value)
  }, [])

  const setPageSize = React.useCallback((value: any) => {
    props.setLimit(value)
  }, [])

  function searchFilter(value: string) {
    props.setSearch(value)
  }

  return (
    <ListItemView
      items={items}
      search={props.search}
      searchFilter={searchFilter}
      setPageSize={setPageSize}
      setPageIndex={setPageIndex}
      useControlledState={useControlledState}
    />
  )
}
