import { useEffect } from 'react'
import SingleSaleReturnView from '../view/single.sale_return.view'

const SingleSaleReturnController = (props: any) => {
  const {
    id,
    activeTab,
    setActiveTab,
    numPages,
    setNumPages,
    regularPdfFile,
    thermalPdfFile,
    regularMutate,
    thermalMutate
  } = props

  /**
   * ----------------------------------------------------------------------
   *  LOCAL EFFECTS START
   *
   */

  useEffect(() => {
    async function fetchRegularInvoicePdf() {
      regularMutate.mutate({ business_id: '1111', sale_type: 'credit_note', sale_id: '' })
    }
    async function fetchThermalInvoicePdf() {
      thermalMutate.mutate({ business_id: '1111' })
    }
    fetchRegularInvoicePdf()
    fetchThermalInvoicePdf()
  }, [])

  /**
   *
   *  LOCAL EFFECTS END
   * ----------------------------------------------------------------------
   */

  /**
   * ----------------------------------------------------------------------
   *  HANDLER FUNCTIONS START
   *
   */

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages)
  }

  function handleRegularDownload() {
    const fileURL = window.URL.createObjectURL(regularPdfFile && regularPdfFile)
    // Setting various property values
    const alink = document.createElement('a')
    alink.href = fileURL
    alink.download = `${id}.pdf`
    alink.click()
  }

  function handleRegularPrint() {
    const fileURL = window.URL.createObjectURL(regularPdfFile && regularPdfFile)
    window.open(fileURL, 'PRINT')
  }

  function handleRegularWhatsapp() {
    const alink = document.createElement('a')
    alink.href = `https://web.whatsapp.com/send?text= View your invoice at https://books.zauvijek.com/r/${id}`
    alink.target = '_blank'
    alink.click()
  }

  function handleThermalDownload() {
    const fileURL = window.URL.createObjectURL(thermalPdfFile && thermalPdfFile)
    // Setting various property values
    const alink = document.createElement('a')
    alink.href = fileURL
    alink.download = `${id}.pdf`
    alink.click()
  }

  function handleThermalPrint() {
    const fileURL = window.URL.createObjectURL(thermalPdfFile && thermalPdfFile)
    window.open(fileURL, 'PRINT')
  }

  function handleThermalWhatsapp() {
    const alink = document.createElement('a')
    alink.href = `https://web.whatsapp.com/send?text= View your invoice at https://books.zauvijek.com/t/${id}`
    alink.target = '_blank'
    alink.click()
  }

  /**
   *
   *  HANDLER FUNCTIONS END
   * ----------------------------------------------------------------------
   */
  return (
    <SingleSaleReturnView
      handleRegularDownload={handleRegularDownload}
      handleThermalDownload={handleThermalDownload}
      handleRegularPrint={handleRegularPrint}
      handleThermalPrint={handleThermalPrint}
      handleRegularWhatsapp={handleRegularWhatsapp}
      handleThermalWhatsapp={handleThermalWhatsapp}
      setActiveTab={setActiveTab}
      activeTab={activeTab}
      regularPdfFile={regularPdfFile}
      thermalPdfFile={thermalPdfFile}
      onDocumentLoadSuccess={onDocumentLoadSuccess}
      numPages={numPages}
    />
  )
}

export default SingleSaleReturnController
