import Loading from '@renderer/components/loading'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { createSale } from '@renderer/services/sale'
import NewProformaInvoiceController from '../controller/new.proforma_invoice.controller'

function removeEmptyElements(arr: any[]) {
  return arr.filter((element) => {
    // Remove element if it is empty
    return element !== null && element !== undefined && element !== ''
  })
}

export default function NewProformaInvoiceModel() {
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

  const newProformaInvoice = useMutation({
    mutationFn: createSale,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getSales', 'proforma_invoice']
      })
      toast({
        description: 'Proforma Invoice created successfully.',
        status: 'success'
      })
      navigate('/proforma-invoice')
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
    newProformaInvoice?.mutate(updateValues)
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

  if (newProformaInvoice?.isPending) {
    return <Loading />
  }
  return <NewProformaInvoiceController handleNew={handleNew} />
}
