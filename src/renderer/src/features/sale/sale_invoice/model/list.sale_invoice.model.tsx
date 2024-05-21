import React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@chakra-ui/react'
import { useDebounce } from 'use-debounce'

import Loading from '@renderer/components/loading'
import { useAuthentication } from '@renderer/hooks/useAuthentication'
import { getSales, deleteSale, searchSales } from '@renderer/services/sale'
import ListSaleInvoiceController from '../controller/list.sale_invoice.controller'

export default function ListSaleInvoiceModel() {
  const toast = useToast()
  const queryClient = useQueryClient()
  const { user } = useAuthentication()

  const [selectedDates, setSelectedDates] = React.useState<Date[]>([
    new Date('2023-04-01'),
    new Date('2024-03-31')
  ])
  const [page, setPage] = React.useState(0)
  const [limit, setLimit] = React.useState(10)
  const [search, setSearch] = React.useState('')

  const { isLoading, data } = useQuery({
    queryKey: [
      'getSales',
      user?.business_id,
      'sale_invoice',
      selectedDates[0],
      selectedDates[1],
      page + 1,
      limit
    ],
    queryFn: () =>
      getSales({
        business_id: user?.business_id,
        sale_type: 'sale_invoice',
        start_date: selectedDates[0],
        end_date: selectedDates[1],
        page: page + 1,
        take: limit
      }),
    refetchOnWindowFocus: false,
    retry: 1
  })

  // Search
  const debouncedFilter = useDebounce(search, 500)
  const { data: searchData } = useQuery({
    queryKey: ['searchSaleInvoices', user?.business_id, debouncedFilter[0]],
    queryFn: () =>
      searchSales({
        business_id: user?.business_id,
        sale_type: 'sale_invoice',
        party_name: debouncedFilter[0]
      }),
    enabled: !!search
  })

  // Delete
  const { mutate } = useMutation({
    mutationFn: deleteSale,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getParties', user?.business_id, 'sale_invoice', 1, 10]
      })
      toast({
        position: 'top',
        description: `Sale Invoice deleted successfully`,
        status: 'success',
        duration: 1500
      })
    }
  })

  function handleDelete(value: string) {
    mutate({ id: value })
  }

  function handleSelectedDates(value: Date[]) {
    setSelectedDates(value)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <ListSaleInvoiceController
      data={data || []}
      selectedDates={selectedDates}
      handleSelectedDates={handleSelectedDates}
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
