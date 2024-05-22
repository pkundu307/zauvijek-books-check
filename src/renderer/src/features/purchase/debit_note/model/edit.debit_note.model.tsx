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
import EditDebitNoteController from '../controller/edit.debit_note.controller'

/**
 *
 *  CUSTOM MODULES END
 * ----------------------------------------------------------------------
 */

export default function EditDebitNoteModel() {
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

  const getDebitNote = useQuery({
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

  const editDebitNote = useMutation({
    mutationFn: updatePurchase,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getPurchases', id]
      })
      toast({
        description: 'Debit Note updated successfully.',
        status: 'success'
      })
      navigate('/debit-note')
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
    editDebitNote?.mutate({ id: id, obj: values })
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
  if (editDebitNote?.isPending || getDebitNote?.isLoading) {
    return <Loading />
  }

  return <EditDebitNoteController data={getDebitNote?.data} handleEdit={handleUpdate} />
}
