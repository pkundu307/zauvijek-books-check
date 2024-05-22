import { useToast } from '@chakra-ui/react'
import Loading from '@renderer/components/loading'
import { getSaleById, updateSale } from '@renderer/services/sale'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import EditProformaInvoiceController from '../controller/edit.proforma_invoice.controller'

export default function EditProformaInvoiceModel() {
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

  const getProformaInvoice = useQuery({
    queryKey: ['getProformaInvoice', id],
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

  const editProformaInvoice = useMutation({
    mutationFn: updateSale,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getProformaInvoice', id]
      })
      toast({
        description: 'Proforma Invoice updated successfully.',
        status: 'success'
      })
      navigate('/proforma-invoice')
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
    editProformaInvoice?.mutate({ id: id, obj: values })
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

  if (editProformaInvoice?.isPending || getProformaInvoice?.isLoading) {
    return <Loading />
  }

  return <EditProformaInvoiceController data={getProformaInvoice?.data} handleEdit={handleUpdate} />
}
