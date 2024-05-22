import Loading from '@renderer/components/loading'
import { useToast } from '@chakra-ui/react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { deleteSale, getSales } from '@renderer/services/sale'
import ListDeliveryChallanController from '../controller/list.delivery_challan.controller'

export default function ListDeliveryChallanModel() {
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
   *  CUSTOM HOOKS START
   *
   */

  // const { user } = useAuthentication()

  /**
   *
   *  CUSTOM HOOKS END
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
  const getDeliveryChallans = useQuery({
    queryKey: ['getSales', '1111', 'delivery_challan', selectedDates[0], selectedDates[1]],
    queryFn: () =>
      getSales({
        business_id: '1111',
        sale_type: 'delivery_challan',
        startDate: selectedDates[0],
        endDate: selectedDates[1]
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

  const deleteDeliveryChallan = useMutation({
    mutationFn: deleteSale,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getSales', '1111', 'delivery_challan', selectedDates[0], selectedDates[1]]
      })
      toast({
        description: 'Delivery Challan deleted successfully.',
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
    deleteDeliveryChallan?.mutate({ id: value })
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

  if (getDeliveryChallans?.isLoading) {
    return <Loading />
  }
  return (
    <ListDeliveryChallanController
      selectedDates={selectedDates}
      handleSelectedDates={handleSelectedDates}
      data={getDeliveryChallans?.data || []}
      search={search}
      searchFilter={searchFilter}
      handleDelete={handleDelete}
    />
  )
}
