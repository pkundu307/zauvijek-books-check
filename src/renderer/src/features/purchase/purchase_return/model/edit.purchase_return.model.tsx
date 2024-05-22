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
import EditPurchaseReturnController from '../controller/edit.purchase_return.controller'

/**
 *
 *  CUSTOM MODULES END
 * ----------------------------------------------------------------------
 */

export default function EditPurchaseReturnModel() {
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

  const getPurchaseReturn = useQuery({
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

  const editPurchaseReturn = useMutation({
    mutationFn: updatePurchase,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getPurchases', id]
      })
      toast({
        description: 'Purchase Return updated successfully.',
        status: 'success'
      })
      navigate('/purchase-return')
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
    editPurchaseReturn?.mutate({ id: id, obj: values })
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
  if (editPurchaseReturn?.isPending || getPurchaseReturn?.isLoading) {
    return <Loading />
  }

  return <EditPurchaseReturnController data={getPurchaseReturn?.data} handleEdit={handleUpdate} />
}
