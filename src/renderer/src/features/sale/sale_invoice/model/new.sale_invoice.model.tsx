import Loading from '@renderer/components/loading'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { createSale } from '@renderer/services/sale'
import NewSaleInvoiceController from '../controller/new.sale_invoice.controller'

function removeEmptyElements(arr: any[]) {
  return arr.filter((element) => {
    // Remove element if it is empty
    return element !== null && element !== undefined && element !== ''
  })
}

export default function NewSaleInvoiceModel() {
  /**
   * ----------------------------------------------------------------------
   *  LIBRARY HOOKS START
   *
   */

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
   *  MUTATION START
   *
   */

  const newSaleInvoice = useMutation({
    mutationFn: createSale,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getSales', 'sale_invoice']
      })
      toast({
        description: 'Sale Invoice created successfully.',
        status: 'success'
      })
      navigate('/sale-invoice')
    },
    onError: (error) => {
      toast({
        description: `${error}.`,
        status: 'error'
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

  function handleNew(values: any) {
    const sale_tax = removeEmptyElements(values.sale_tax)
    const updateValues = { ...values, sale_tax: sale_tax }
    newSaleInvoice?.mutate(updateValues)
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

  if (newSaleInvoice?.isPending) {
    return <Loading />
  }
  return <NewSaleInvoiceController handleNew={handleNew} />
}
