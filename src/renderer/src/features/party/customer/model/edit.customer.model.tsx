import { useToast } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import Loading from '@renderer/components/loading'
import { getPartyById, updateParty } from '@renderer/services/party'
// import { useAuthentication } from '@renderer/hooks/useAuthentication'
import EditCustomerController from '../controller/edit.customer.controller'

export default function EditCustomerModel() {
  /**
   * ----------------------------------------------------------------------
   *  LIBRARY HOOKS START
   *
   */

  const { id } = useParams()
  const toast = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  /**
   *
   *  LIBRARY HOOKS END
   * ----------------------------------------------------------------------
   */

  /**
   * ----------------------------------------------------------------------
   *  QUERY START
   *
   */

  const { isLoading, data } = useQuery({
    queryKey: ['getCustomer', id],
    queryFn: () => getPartyById(id as string)
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

  const { isPending, mutate } = useMutation({
    mutationFn: updateParty,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getParties', '1111', 'customer']
      })
      toast({
        position: 'top',
        description: `Customer updated successfully !`,
        status: 'success',
        duration: 1500
      })
      navigate('/customer')
    },
    onError: (error) => {
      toast({
        position: 'top',
        description: `${error}`,
        status: 'error',
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

  function handleUpdate(values: any) {
    mutate({ id: id, obj: values })
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

  if (isPending || isLoading) {
    return <Loading />
  }

  return <EditCustomerController data={data} handleUpdate={handleUpdate} />
}
