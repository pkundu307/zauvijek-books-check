import { useToast } from '@chakra-ui/react'
import Loading from '@renderer/components/loading'
import { getSaleById, updateSale } from '@renderer/services/sale'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import EditSaleReturnController from '../controller/edit.sale_return.controller'

export default function EditSaleReturnModel() {
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

  const getSaleReturn = useQuery({
    queryKey: ['getSaleReturn', id],
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

  const editSaleReturn = useMutation({
    mutationFn: updateSale,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getSaleReturn', id]
      })
      toast({
        description: 'Sale Return updated successfully.',
        status: 'success'
      })
      navigate('/sale-return')
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
    editSaleReturn?.mutate({ id: id, obj: values })
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

  if (editSaleReturn?.isPending || getSaleReturn?.isLoading) {
    return <Loading />
  }

  return <EditSaleReturnController data={getSaleReturn?.data} handleEdit={handleUpdate} />
}
