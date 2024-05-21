import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import Loading from '@renderer/components/loading'
import { useAuthentication } from '@renderer/hooks/useAuthentication'
import { createSale } from '@renderer/services/sale'
import NewSaleInvoiceController from '../controller/new.sale_invoice.controller'

export default function NewSaleInvoiceModel() {
  const toast = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { user } = useAuthentication()

  const { isPending, mutate } = useMutation({
    mutationFn: createSale,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getSaleInvoices', user?.business_id]
      })
      toast({
        position: 'top',
        description: `Sale Invoice created successfully !`,
        status: 'success',
        duration: 1500
      })
      navigate('/sale-invoice')
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

  return <NewSaleInvoiceController handleNew={handleNew} />
}
