/**
 * ----------------------------------------------------------------------
 *  NPM MODULES START
 *
 */

import { useToast } from '@chakra-ui/react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'

/**
 *
 *  NPM MODULES END
 * ----------------------------------------------------------------------
 */

/**
 * ----------------------------------------------------------------------
 *  CUSTOM MODULES START
 *
 */

import { getPurchases, deletePurchase } from '@renderer/services/purchase'
import Loading from '@renderer/components/loading'
import ListPurchaseReturnController from '../controller/list.purchase_return.controller'

/**
 *
 *  CUSTOM MODULES END
 * ----------------------------------------------------------------------
 */

export default function ListPurchaseReturnModel() {
  /**
   * ----------------------------------------------------------------------
   *  LIBRARY HOOKS START
   *
   */

  const toast = useToast()
  const queryClient = useQueryClient()

  /**
   *
   *  LIBRARY HOOKS END
   * ----------------------------------------------------------------------
   */

  /**
   * ----------------------------------------------------------------------
   *  LOCAL STATES START
   *
   */
  const [selectedDates, setSelectedDates] = React.useState<Date[]>([
    new Date('2024-04-20'),
    new Date('2024-04-30')
  ])
  const [search, setSearch] = React.useState('')

  /**
   *
   *  LOCAL STATES END
   * ----------------------------------------------------------------------
   */

  /**
   * ----------------------------------------------------------------------
   *  QUERY START
   *
   */
  const getPurchaseReturns = useQuery({
    queryKey: ['getPurchases', '1111', 'purchase_return', selectedDates[0], selectedDates[1]],
    queryFn: () =>
      getPurchases({
        business_id: '1111',
        startDate: selectedDates[0],
        endDate: selectedDates[1],
        purchase_type: 'purchase_return'
      }),
    refetchOnWindowFocus: false,
    retry: 1
  })
  /**
   *
   *  QUERY END
   * ----------------------------------------------------------------------
   */

  /**
   * ----------------------------------------------------------------------
   *  MUTATION START
   *
   */

  const deletePurchaseReturn = useMutation({
    mutationFn: deletePurchase,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getPurchases', '1111', 'purchase_return', selectedDates[0], selectedDates[1]]
      })
      toast({
        description: 'Purchase Return deleted successfully.',
        status: 'success'
      })
    }
  })

  /**
   *
   *  MUTATION END
   * ----------------------------------------------------------------------
   */

  /**
   * ----------------------------------------------------------------------
   *  HANDLER FUNCTIONS START
   *
   */

  function handleDelete(value: string) {
    deletePurchaseReturn?.mutate(value)
  }

  function handleSelectedDates(value: Date[]) {
    setSelectedDates(value)
  }

  function searchFilter(value: string) {
    setSearch(value)
  }

  /**
   *
   *  HANDLER FUNCTIONS END
   * ----------------------------------------------------------------------
   */

  /**
   * ----------------------------------------------------------------------
   *  RENDERING START
   *
   */

  if (getPurchaseReturns?.isLoading) {
    return <Loading />
  }
  return (
    <ListPurchaseReturnController
      selectedDates={selectedDates}
      handleSelectedDates={handleSelectedDates}
      data={getPurchaseReturns?.data || []}
      search={search}
      searchFilter={searchFilter}
      handleDelete={handleDelete}
    />
  )
}
