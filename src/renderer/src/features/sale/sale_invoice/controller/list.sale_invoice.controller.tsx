import * as React from 'react'
import ListSaleInvoiceView from '../view/list.sale_invoice.view'

export default function ListSaleInvoiceController(props: any) {
  const [saleInvoices, setSaleInvoices] = React.useState({
    data: [],
    meta: {}
  })
  const [isSearching, setSearching] = React.useState(false)

  React.useEffect(() => {
    if (props.data && isSearching === false) {
      setSaleInvoices(props.data)
    } else {
      const result = { data: props.searchData, meta: {} }
      setSaleInvoices(result)
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
    <ListSaleInvoiceView
      saleInvoices={saleInvoices}
      search={props.search}
      searchFilter={searchFilter}
      setPageSize={setPageSize}
      setPageIndex={setPageIndex}
      useControlledState={useControlledState}
      handleDelete={handleDelete}
      selectedDates={props.selectedDates}
      handleSelectedDates={props.handleSelectedDates}
    />
  )
}
