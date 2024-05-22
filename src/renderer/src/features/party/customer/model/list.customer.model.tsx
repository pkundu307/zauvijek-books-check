import React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@chakra-ui/react'

import Loading from '@renderer/components/loading'
import { deleteParty, getParties } from '@renderer/services/party'
import ListCustomerController from '../controller/list.customer.controller'

export default function ListCustomerModel() {
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

  const { isLoading, data } = useQuery({
    queryKey: ['getParties', '1111', 'customer'],
    queryFn: () =>
      getParties({
        business_id: '1111'
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

  const { mutate } = useMutation({
    mutationFn: deleteParty,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getParties', '111', 'customer']
      })
      toast({
        position: 'top',
        description: `Customer deleted successfully`,
        status: 'success',
        duration: 1500
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
    mutate(value)
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

  if (isLoading) {
    return <Loading />
  }

  return (
    <ListCustomerController
      data={data || []}
      search={search}
      setSearch={setSearch}
      searchFilter={searchFilter}
      handleDelete={handleDelete}
    />
  )
}
