import * as React from 'react'
import ListSupplierView from '../view/list.supplier.view'

export default function ListSupplierController(props: any) {
  const [suppliers, setSuppliers] = React.useState({
    data: [],
    meta: {}
  })
  const [isSearching, setSearching] = React.useState(false)

  React.useEffect(() => {
    if (props.data && isSearching === false) {
      setSuppliers(props.data)
    } else {
      const result = { data: props.searchData, meta: {} }
      setSuppliers(result)
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
    <ListSupplierView
      suppliers={suppliers}
      search={props.search}
      searchFilter={searchFilter}
      setPageSize={setPageSize}
      setPageIndex={setPageIndex}
      useControlledState={useControlledState}
    />
  )
}
