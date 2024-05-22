import { useToast } from '@chakra-ui/react'
import Loading from '@renderer/components/loading'
import { getSaleById, updateSale } from '@renderer/services/sale'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import EditSaleOrderController from '../controller/edit.sale_order.controller'

export default function EditSaleOrderModel() {
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
    queryKey: ['getSaleOrder', id],
    queryFn: () => getSaleById(id as string)
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

  const editSaleOrder = useMutation({
    mutationFn: updateSale,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getSaleOrder', id]
      })
      toast({
        description: 'Sale Order updated successfully.',
        status: 'success'
      })
      navigate('/sale-order')
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
    editSaleOrder?.mutate({ id: id, obj: values })
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

  if (editSaleOrder?.isPending || getSaleOrder?.isLoading) {
    return <Loading />
  }

  return <EditSaleOrderController data={getSaleOrder?.data} handleEdit={handleUpdate} />
}
