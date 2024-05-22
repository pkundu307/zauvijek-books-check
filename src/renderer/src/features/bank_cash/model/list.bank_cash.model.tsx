import * as React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import Loading from '@renderer/components/loading'
import ListBankCashController from '../controller/list.bank_cash.controller'
import { useToast } from '@chakra-ui/react'

export default function ListBankCashModel() {
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

  const getBankCashCheques = useQuery({
    queryKey: ['getBankCashCheque', '1111'],
    queryFn: () => [],
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

  const deleteCreditNote = useMutation({
    mutationFn: async ({ id }: { id: any }) => {
      console.log(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getBankCashCheque', '1111']
      })
      toast({
        description: 'Credit Note deleted successfully.',
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
    deleteCreditNote?.mutate({ id: value })
  }

  function searchFilter(value: string) {
    setSearch(value)
  }

  /**
   *
   *  HANDLER FUNCTIONS END
   * ----------------------------------------------------------------------
   */

  if (getBankCashCheques?.isLoading) {
    return <Loading />
  }

  return (
    <ListBankCashController
      data={getBankCashCheques?.data || []}
      search={search}
      searchFilter={searchFilter}
      handleDelete={handleDelete}
    />
  )
}
