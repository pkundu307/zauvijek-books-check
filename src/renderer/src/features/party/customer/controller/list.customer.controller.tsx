import * as React from 'react'
import ListCustomerView from '../view/list.customer.view'

export default function ListCustomerController(props: any) {
  const [customers, setCustomers] = React.useState({
    data: [],
    meta: {}
  })
  const [isSearching, setSearching] = React.useState(false)

  React.useEffect(() => {
    if (props.data && isSearching === false) {
      setCustomers(props.data)
    } else {
      const result = { data: props.searchData, meta: {} }
      setCustomers(result)
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

  function handleDelete(value: string) {
    props.handleDelete(value)
  }

  return (
    <ListCustomerView
      customers={customers}
      search={props.search}
      searchFilter={searchFilter}
      setPageSize={setPageSize}
      setPageIndex={setPageIndex}
      useControlledState={useControlledState}
      handleDelete={handleDelete}
    />
  )
}
