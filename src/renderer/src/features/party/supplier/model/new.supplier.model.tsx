import Loading from '@renderer/components/loading'
import NewSupplierController from '../controller/new.supplier.controller'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import { createParty } from '@renderer/services/party'

export default function NewSupplierModel() {
  const toast = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { isPending, mutate } = useMutation({
    mutationFn: createParty,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getParties', '1111', 'customer']
      })
      toast({
        position: 'top',
        description: `Customer created successfully !`,
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

  function handleNew(values: any) {
    mutate(values)
  }

  if (isPending) {
    return <Loading />
  }
  return <NewSupplierController handleNew={handleNew} />
}
