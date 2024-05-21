import { useToast } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import Loading from '@renderer/components/loading'
import { getPartyById, updateParty } from '@renderer/services/party'
import { useAuthentication } from '@renderer/hooks/useAuthentication'
import EditCustomerController from '../controller/edit.customer.controller'

export default function EditCustomerModel() {
  const { id } = useParams()
  const toast = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { user } = useAuthentication()

  const { isLoading, data } = useQuery({
    queryKey: ['getCustomer', id],
    queryFn: () => getPartyById({ id })
  })

  const { isPending, mutate } = useMutation({
    mutationFn: updateParty,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getParties', user?.business_id, 'customer', 1, 10]
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

  function handleUpdate(values: any) {
    mutate(values)
  }

  if (isPending || isLoading) {
    return <Loading />
  }

  return <EditCustomerController data={data} handleUpdate={handleUpdate} />
}
