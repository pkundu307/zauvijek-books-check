import Loading from '@renderer/components/loading'
import { useToast } from '@chakra-ui/react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { deleteSale, getSales } from '@renderer/services/sale'
import ListProformaInvoiceController from '../controller/list.proforma_invoice.controller'

export default function ListProformaInvoiceModel() {
  /**
   * ----------------------------------------------------------------------
   *  LIBRARY HOOKS START
   *
   */

  const toast = useToast()
  const queryClient = useQueryClient()

  /**
   *
   *  LIBRARY HOOKS END
   * ----------------------------------------------------------------------
   */

  /**
   * ----------------------------------------------------------------------
   *  CUSTOM HOOKS START
   *
   */

  // const { user } = useAuthentication()

  /**
   *
   *  CUSTOM HOOKS END
   * ----------------------------------------------------------------------
   */

  /**
   * ----------------------------------------------------------------------
   *  LOCAL STATES START
   *
   */
  const [selectedDates, setSelectedDates] = React.useState<Date[]>([
    new Date('2024-04-20'),
    new Date('2024-04-30')
  ])
  const [search, setSearch] = React.useState('')

  /**
   *
   *  LOCAL STATES END
   * ----------------------------------------------------------------------
   */

  /**
   * ----------------------------------------------------------------------
   *  QUERY START
   *
   */
  const getProformaInvoices = useQuery({
    queryKey: ['getSales', '1111', 'proforma_invoice', selectedDates[0], selectedDates[1]],
    queryFn: () =>
      getSales({
        business_id: '1111',
        sale_type: 'proforma_invoice',
        startDate: selectedDates[0],
        endDate: selectedDates[1]
      }),
    refetchOnWindowFocus: false,
    retry: 1
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

  const deleteProformaInvoice = useMutation({
    mutationFn: deleteSale,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getSales', '1111', 'proforma_invoice', selectedDates[0], selectedDates[1]]
      })
      toast({
        description: 'Proforma Invoice deleted successfully.',
        status: 'success'
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

  function handleDelete(value: string) {
    deleteProformaInvoice?.mutate({ id: value })
  }

  function handleSelectedDates(value: Date[]) {
    setSelectedDates(value)
  }

  function searchFilter(value: string) {
    setSearch(value)
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

  if (getProformaInvoices?.isLoading) {
    return <Loading />
  }
  return (
    <ListProformaInvoiceController
      selectedDates={selectedDates}
      handleSelectedDates={handleSelectedDates}
      data={getProformaInvoices?.data || []}
      search={search}
      searchFilter={searchFilter}
      handleDelete={handleDelete}
    />
  )
}
