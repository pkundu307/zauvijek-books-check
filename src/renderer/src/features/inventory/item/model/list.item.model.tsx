import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useDebounce } from 'use-debounce'

import Loading from '@renderer/components/loading'
import { useAuthentication } from '@renderer/hooks/useAuthentication'
import { getItems, searchItems } from '@renderer/services/inventory/item'
import ListItemController from '../controller/list.item.controller'

export default function ListItemModel() {
  const { user } = useAuthentication()

  const [page, setPage] = React.useState(0)
  const [limit, setLimit] = React.useState(10)
  const [search, setSearch] = React.useState('')

  const { isLoading, data } = useQuery({
    queryKey: ['getItems', user?.business_id, page + 1, limit],
    queryFn: () =>
      getItems({
        business_id: user?.business_id,
        page: page + 1,
        take: limit
      }),
    refetchOnWindowFocus: false,
    retry: 1
  })

  // Search
  const debouncedFilter = useDebounce(search, 500)
  const { data: searchData } = useQuery({
    queryKey: ['searchItems', user?.business_id, debouncedFilter[0]],
    queryFn: () =>
      searchItems({
        business_id: user?.business_id,
        item_name: debouncedFilter[0]
      }),
    enabled: !!search
  })

  if (isLoading) {
    return <Loading />
  }

  return (
    <ListItemController
      data={data || []}
      page={page}
      limit={limit}
      setPage={setPage}
      setLimit={setLimit}
      search={search}
      setSearch={setSearch}
      searchData={searchData}
    />
  )
}
