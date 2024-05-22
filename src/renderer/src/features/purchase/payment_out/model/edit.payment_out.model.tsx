/**
 * ----------------------------------------------------------------------
 *  NPM MODULES START
 *
 */

import { useToast } from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'

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

import { getPurchaseById, updatePurchase } from '@renderer/services/purchase'
import Loading from '@renderer/components/loading'
import EditPaymentOutController from '../controller/edit.payment_out.controller'

/**
 *
 *  CUSTOM MODULES END
 * ----------------------------------------------------------------------
 */

export default function EditPaymentOutModel() {
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

  const getPaymentOut = useQuery({
    queryKey: ['getPurchases', id],
    queryFn: () => getPurchaseById(id as string)
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

  const editPaymentOut = useMutation({
    mutationFn: updatePurchase,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getPurchases', id]
      })
      toast({
        description: 'Payment Out updated successfully.',
        status: 'success'
      })
      navigate('/payment-out')
    },
    onError: (error) => {
      toast({
        description: `${error}`,
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

  function handleUpdate(values: any) {
    editPaymentOut?.mutate({ id: id, obj: values })
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
  if (editPaymentOut?.isPending || getPaymentOut?.isLoading) {
    return <Loading />
  }

  return <EditPaymentOutController data={getPaymentOut?.data} handleEdit={handleUpdate} />
}
