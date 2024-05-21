import * as React from 'react'
import ListBankCashView from '../view/list.bank_cash.view'

export default function ListBankCashController(props: any) {
  const [bankCashs, setBankCashs] = React.useState({
    data: [],
    meta: {}
  })
  const [isSearching, setSearching] = React.useState(false)

  React.useEffect(() => {
    if (props.data && isSearching === false) {
      setBankCashs(props.data)
    } else {
      const result = { data: props.searchData, meta: {} }
      setBankCashs(result)
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
    <ListBankCashView
      bankCashs={bankCashs}
      search={props.search}
      searchFilter={searchFilter}
      setPageSize={setPageSize}
      setPageIndex={setPageIndex}
      useControlledState={useControlledState}
    />
  )
}
