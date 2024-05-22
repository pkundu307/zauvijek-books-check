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

import EditPurchaseInvoiceController from '../controller/edit.purchase_invoice.controller'
import { getPurchaseById, updatePurchase } from '@renderer/services/purchase'
import Loading from '@renderer/components/loading'

/**
 *
 *  CUSTOM MODULES END
 * ----------------------------------------------------------------------
 */

export default function EditPurchaseInvoiceModel() {
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

  const getSaleOrder = useQuery({
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

  const editPurchaseInvoice = useMutation({
    mutationFn: updatePurchase,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getPurchases', id]
      })
      toast({
        description: 'Purchase Invoice updated successfully.',
        status: 'success'
      })
      navigate('/purchase-invoice')
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
    editPurchaseInvoice?.mutate({ id: id, obj: values })
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
  // console.log(getSaleOrder?.data)
  if (editPurchaseInvoice?.isPending || getSaleOrder?.isLoading) {
    return <Loading />
  }

  return <EditPurchaseInvoiceController data={getSaleOrder?.data} handleEdit={handleUpdate} />
}
