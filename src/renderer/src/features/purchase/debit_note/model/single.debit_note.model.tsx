import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { createPDF } from '@renderer/services/pdf'
import SingleDebitNoteController from '../controller/single.debit_note.controller'

export default function SingleDebitNoteModel() {
  /**
   * ----------------------------------------------------------------------
   *  LIBRARY HOOKS START
   *
   */
  const toast = useToast()
  const { id } = useParams()
  /**
   *
   *  LIBRARY HOOKS END
   * ----------------------------------------------------------------------
   */

  /**
   * ----------------------------------------------------------------------
   *  LOCAL STATES START
   *
   */
  const [activeTab, setActiveTab] = useState<any>('regular')
  const [regularPdfFile, setRegularPdfFile] = useState<any>()
  const [thermalPdfFile, setThermalPdfFile] = useState<any>()
  const [numPages, setNumPages] = useState(null)

  /**
   *
   *  LOCAL STATES END
   * ----------------------------------------------------------------------
   */

  /**
   * ----------------------------------------------------------------------
   *  REACT QUERY START
   *
   */

  const regularMutate = useMutation({
    mutationFn: createPDF,
    onSuccess: (data) => {
      // const file = new Blob([data], { type: 'application/pdf' })
      setRegularPdfFile(data)
    },
    onError: (error) => {
      toast({
        position: 'top',
        description: `${error}.`,
        status: 'error',
        duration: 1500
      })
    }
  })

  const thermalMutate = useMutation({
    mutationFn: createPDF,
    onSuccess: (data) => {
      // const file = new Blob([data], { type: 'application/pdf' })
      setThermalPdfFile(data)
    },
    onError: (error) => {
      toast({
        position: 'top',
        description: `${error}`,
        status: 'error',
        duration: 1500
      })
    }
  })

  /**
   *
   *  REACT QUERY END
   * ----------------------------------------------------------------------
   */

  /**
   * ----------------------------------------------------------------------
   *  RENDERING START
   *
   */

  return (
    <SingleDebitNoteController
      id={id}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      numPages={numPages}
      setNumPages={setNumPages}
      regularPdfFile={regularPdfFile}
      thermalPdfFile={thermalPdfFile}
      regularMutate={regularMutate}
      thermalMutate={thermalMutate}
    />
  )
}
