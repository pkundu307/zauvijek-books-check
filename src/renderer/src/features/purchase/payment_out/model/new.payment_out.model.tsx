/**
 * ----------------------------------------------------------------------
 *  NPM MODULES START
 *
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

/**
 *
 *  NPM MODULES END
 * ----------------------------------------------------------------------
 */

/**
 * ----------------------------------------------------------------------
 *  CUSTOM MODULES START
 *
 */

import { createPurchase } from '@renderer/services/purchase'
import Loading from '@renderer/components/loading'
import { removeEmptyElements } from '@renderer/utils/remove_empty_elements_from_array'
import NewPaymentOutController from '../controller/new.payment_out.controller'

/**
 *
 *  CUSTOM MODULES END
 * ----------------------------------------------------------------------
 */

export default function NewPaymentOutModel() {
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

  const newPaymentOut = useMutation({
    mutationFn: createPurchase,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getPurchases', 'payment_out']
      })
      toast({
        description: 'Payment Out created successfully.',
        status: 'success'
      })
      navigate('/payment-out')
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
    const purchase_tax = removeEmptyElements(values.purchase_tax)
    const updateValues = { ...values, purchase_tax: purchase_tax }
    newPaymentOut?.mutate(updateValues)
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

  if (newPaymentOut?.isPending) {
    return <Loading />
  }
  return <NewPaymentOutController handleNew={handleNew} />
}
