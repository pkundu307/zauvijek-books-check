import Loading from '@renderer/components/loading'
import NewDeliveryChallanController from '../controller/new.delivery_challan.controller'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import { createSale } from '@renderer/services/sale'

function removeEmptyElements(arr: any[]) {
  return arr.filter((element) => {
    // Remove element if it is empty
    return element !== null && element !== undefined && element !== ''
  })
}

export default function NewDeliveryChallanModel() {
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

  const newDeliveryChallan = useMutation({
    mutationFn: createSale,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getSales', 'delivery_challan']
      })
      toast({
        description: 'Delivery Challan created successfully.',
        status: 'success'
      })
      navigate('/delivery-challan')
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
    newDeliveryChallan?.mutate(updateValues)
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

  if (newDeliveryChallan?.isPending) {
    return <Loading />
  }
  return <NewDeliveryChallanController handleNew={handleNew} />
}
