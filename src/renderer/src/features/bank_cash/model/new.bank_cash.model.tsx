import { useToast } from '@chakra-ui/react'
import NewBankCashController from '../controller/new.bank_cash.controller'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBankCashCheque } from '@renderer/services/payment/bank_cash_cheque'

export default function NewBankCashModel() {
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

  const newBankCash = useMutation({
    mutationFn: createBankCashCheque,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bankCash', '1111']
      })
      toast({
        description: 'Bank Cash created successfully.',
        status: 'success'
      })
      navigate('/bank-cash')
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
    newBankCash?.mutate(values)
  }

  /**
   *
   *  HANDLER FUNCTIONS END
   * ----------------------------------------------------------------------
   */

  return <NewBankCashController handleNew={handleNew} />
}
