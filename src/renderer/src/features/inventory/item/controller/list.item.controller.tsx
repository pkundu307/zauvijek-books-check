import * as React from 'react'
import ListItemView from '../view/list.item.view'
import { PaginationState } from '@tanstack/react-table'

export default function ListItemController(props: any) {
  const [items, setItems] = React.useState({
    data: [],
    meta: {}
  })
  const [isSearching, setSearching] = React.useState(false)
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })

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

  function searchFilter(value: string) {
    props.setSearch(value)
  }

  return (
    <ListItemView
      items={items}
      search={props.search}
      searchFilter={searchFilter}
      pagination={pagination}
      setPagination={setPagination}
    />
  )
}
