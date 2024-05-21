import { Button, Flex } from '@chakra-ui/react'
import React from 'react'

export default function SingleSaleInvoiceView() {
  const pdfBuffer = window.ZauvijekAPI.services.PDF

  const [pdf, setPDF] = React.useState<any>()

  function getPDF() {
    const buffer = pdfBuffer
    setPDF(buffer)
  }
  return (
    <Flex>
      <Button onClick={() => getPDF()}>Print</Button>
      <iframe id="iframe" width="600" height="775">
        {pdf}
      </iframe>
    </Flex>
  )
}
