import { useToast } from '@chakra-ui/react'
import Loading from '@renderer/components/loading'
import { getSaleById, updateSale } from '@renderer/services/sale'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import EditDeliveryChallanController from '../controller/edit.delivery_challan.controller'

export default function EditDeliveryChallanModel() {
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

  const getDeliveryChallan = useQuery({
    queryKey: ['getDeliveryChallan', id],
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

  const editDeliveryChallan = useMutation({
    mutationFn: updateSale,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getDeliveryChallan', id]
      })
      toast({
        description: 'Delivery Challan updated successfully.',
        status: 'success'
      })
      navigate('/delivery-challan')
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
    editDeliveryChallan?.mutate({ id: id, obj: values })
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

  if (editDeliveryChallan?.isPending || getDeliveryChallan?.isLoading) {
    return <Loading />
  }

  return <EditDeliveryChallanController data={getDeliveryChallan?.data} handleEdit={handleUpdate} />
}
