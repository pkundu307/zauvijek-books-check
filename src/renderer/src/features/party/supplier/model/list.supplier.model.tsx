import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useDebounce } from 'use-debounce'

import Loading from '@renderer/components/loading'
import { useAuthentication } from '@renderer/hooks/useAuthentication'
import { getParties, searchParties } from '@renderer/services/party'
import ListSupplierController from '../controller/list.supplier.controller'

export default function ListSupplierModel() {
  const { user } = useAuthentication()

  const [page, setPage] = React.useState(0)
  const [limit, setLimit] = React.useState(10)
  const [search, setSearch] = React.useState('')

  const { isLoading, data } = useQuery({
    queryKey: ['getParties', user?.business_id, 'supplier', page + 1, limit],
    queryFn: () =>
      getParties({
        business_id: user?.business_id,
        party_type: 'supplier',
        page: page + 1,
        take: limit
      }),
    refetchOnWindowFocus: false,
    retry: 1
  })

  // Search
  const debouncedFilter = useDebounce(search, 500)
  const { data: searchData } = useQuery({
    queryKey: ['searchSuppliers', user?.business_id, 'supplier', debouncedFilter[0]],
    queryFn: () =>
      searchParties({
        business_id: user?.business_id,
        party_type: 'supplier',
        party_name: debouncedFilter[0]
      }),
    enabled: !!search
  })

  if (isLoading) {
    return <Loading />
  }

  return (
    <ListSupplierController
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
