import { useToast } from '@chakra-ui/react'
import Loading from '@renderer/components/loading'
import { getSaleById, updateSale } from '@renderer/services/sale'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import EditSaleInvoiceController from '../controller/edit.sale_invoice.controller'

export default function EditSaleInvoiceModel() {
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

  const getSaleInvoice = useQuery({
    queryKey: ['getSaleInvoice', id],
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

  const editSaleInvoice = useMutation({
    mutationFn: updateSale,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getSaleInvoice', id]
      })
      toast({
        description: 'Sale Invoice updated successfully.',
        status: 'success'
      })
      navigate('/sale-invoice')
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
    editSaleInvoice?.mutate({ id: id, obj: values })
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
  console.log('----->>>>>', getSaleInvoice?.data)

  if (editSaleInvoice?.isPending || getSaleInvoice?.isLoading) {
    return <Loading />
  }

  return <EditSaleInvoiceController data={getSaleInvoice?.data} handleEdit={handleUpdate} />
}
