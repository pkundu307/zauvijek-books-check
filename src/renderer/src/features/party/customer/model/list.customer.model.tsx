import React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@chakra-ui/react'
import { useDebounce } from 'use-debounce'

import Loading from '@renderer/components/loading'
import { useAuthentication } from '@renderer/hooks/useAuthentication'
import { deleteParty, getParties, searchParties } from '@renderer/services/party'
import ListCustomerController from '../controller/list.customer.controller'

export default function ListCustomerModel() {
  const toast = useToast()
  const queryClient = useQueryClient()
  const { user } = useAuthentication()

  const [page, setPage] = React.useState(0)
  const [limit, setLimit] = React.useState(10)
  const [search, setSearch] = React.useState('')

  const { isLoading, data } = useQuery({
    queryKey: ['getParties', user?.business_id, 'customer', page + 1, limit],
    queryFn: () =>
      getParties({
        business_id: user?.business_id,
        party_type: 'customer',
        page: page + 1,
        take: limit
      }),
    refetchOnWindowFocus: false,
    retry: 1
  })

  // Search
  const debouncedFilter = useDebounce(search, 500)
  const { data: searchData } = useQuery({
    queryKey: ['searchCustomers', user?.business_id, 'customer', debouncedFilter[0]],
    queryFn: () =>
      searchParties({
        business_id: user?.business_id,
        party_type: 'customer',
        party_name: debouncedFilter[0]
      }),
    enabled: !!search
  })

  // Delete
  const { mutate } = useMutation({
    mutationFn: deleteParty,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getParties', user?.business_id, 'customer', 1, 10]
      })
      toast({
        position: 'top',
        description: `Customer deleted successfully`,
        status: 'success',
        duration: 1500
      })
    }
  })

  function handleDelete(value: string) {
    console.log('Delete', value)
    mutate({ id: value })
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <ListCustomerController
      data={data || []}
      page={page}
      limit={limit}
      setPage={setPage}
      setLimit={setLimit}
      search={search}
      setSearch={setSearch}
      searchData={searchData}
      handleDelete={handleDelete}
    />
  )
}
