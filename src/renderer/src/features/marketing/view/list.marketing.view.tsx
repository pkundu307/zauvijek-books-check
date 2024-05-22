// import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
// import 'react-pdf/dist/esm/Page/TextLayer.css'

// import React from 'react'
// import { Button, Flex } from '@chakra-ui/react'
// import { Document, Page, pdfjs } from 'react-pdf'

// const url = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`
// pdfjs.GlobalWorkerOptions.workerSrc = url

export default function SingleSaleInvoiceView() {
  // const pdfBuffer = window.ZauvijekAPI.services.PDF

  // const [regularPdfFile, setRegularPdfFile] = React.useState<any>()
  // const [numPages, setNumPages] = React.useState(null)

  // React.useEffect(() => {
  //   async function getPDF() {
  //     const buffer = await pdfBuffer.generatePDF()
  //     setRegularPdfFile(buffer)
  //   }
  //   getPDF()
  // }, [])

  // function onDocumentLoadSuccess({ numPages }: any) {
  //   setNumPages(numPages)
  // }

  // async function handleRegularDownload() {
  //   // Setting various property values
  //   const alink = document.createElement('a')
  //   alink.href = regularPdfFile
  //   alink.download = `${'download'}.pdf`
  //   alink.click()
  // }

  // console.log('PDF', pdfBuffer.generatePDF())

  return <></>;
}

// import React from 'react'
// import Logo from '@renderer/assets/image/zauvijek-books-logo.svg'
// import { Button, ButtonGroup, Flex, Image, Text } from '@chakra-ui/react'
// import AppLayout from '@renderer/layouts/app'

// const services = window.ZauvijekAPI.services

// export default function ListMarketingView() {
//   // const [items, setItems] = React.useState<unknown>([])

//   // React.useEffect(() => {
//   //   getItems()
//   // }, [])

//   async function createItem() {
//     const res = await services.item.createItem({ item_name: 'Reebok' })
//     console.log('CREATE ITEM:', res)
//     services.item.getItems()
//   }

//   async function getItems() {
//     const result = await services.item.getItems()
//     console.log('GET ITEMS:', result)
//   }

//   async function createSale() {
//     const res = await services.sale.createSale({ invoice_no: 'INV00', customer_name: 'John' })
//     console.log('CREATE SALE:', res)
//     services.item.getItems()
//   }

//   async function getSales() {
//     const result = await services.sale.getSales()
//     console.log('GET SALES:', result)
//   }

//   // async function updateItem(): Promise<void> {
//   //   const res = await services.(1, {
//   //     item: { item_name: 'Nike' },
//   //     item_batching: { id: 1, batch_no: 'AN02' },
//   //     item_serialisation: { id: 1, serial_no: '456' }
//   //   })
//   //   console.log('UPDATE ITEM:', res)
//   //   getItems()
//   // }

//   return (
//     <AppLayout>
//       <Flex h="90vh" w="100%" direction="column" justify="center" align="center">
//         <Image src={Logo} width="400px" />
//         <Text my={4}>Zauvijek Desktop Apps Boilerplate</Text>
//         <ButtonGroup spacing={6}>
//           <Button onClick={createItem}>INSERT ITEM</Button>
//           <Button onClick={getItems}>GET ITEMS</Button>
//         </ButtonGroup>
//         <ButtonGroup spacing={6}>
//           <Button onClick={createSale}>INSERT SALE</Button>
//           <Button onClick={getSales}>GET SALES</Button>
//         </ButtonGroup>
//       </Flex>
//     </AppLayout>
//   )
// }
