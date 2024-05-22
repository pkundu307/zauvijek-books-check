import Loading from '@renderer/components/loading'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { createSale } from '@renderer/services/sale'
import NewSaleOrderController from '../controller/new.sale_order.controller'

function removeEmptyElements(arr: any[]) {
  return arr.filter((element) => {
    // Remove element if it is empty
    return element !== null && element !== undefined && element !== ''
  })
}

export default function NewSaleOrderModel() {
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

  const newSaleOrder = useMutation({
    mutationFn: createSale,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getSales', 'sale_order']
      })
      toast({
        description: 'Sale Order created successfully.',
        status: 'success'
      })
      navigate('/sale-order')
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
    newSaleOrder?.mutate(updateValues)
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

  if (newSaleOrder?.isPending) {
    return <Loading />
  }
  return <NewSaleOrderController handleNew={handleNew} />
}
