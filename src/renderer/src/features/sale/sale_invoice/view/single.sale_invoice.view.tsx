import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonGroup,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/react'
import Loading from '@renderer/components/loading'
import useThemeMode from '@renderer/hooks/useThemeMode'
import AppLayout from '@renderer/layouts/app'
import { RiArrowRightSLine } from 'react-icons/ri'
import { Document, Page, pdfjs } from 'react-pdf'
import { Link } from 'react-router-dom'
import { IoMdDownload } from 'react-icons/io'
import { FaPrint } from 'react-icons/fa6'
import { IoLogoWhatsapp } from 'react-icons/io'

const url = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`
pdfjs.GlobalWorkerOptions.workerSrc = url

export default function SingleSaleInvoiceView(props: any) {
  const { modeBrand } = useThemeMode()
  const {
    handleRegularDownload,
    handleThermalDownload,
    handleRegularPrint,
    handleThermalPrint,
    handleRegularWhatsapp,
    handleThermalWhatsapp,
    setActiveTab,
    activeTab,
    regularPdfFile,
    onDocumentLoadSuccess,
    numPages,
    thermalPdfFile
  } = props
  return (
    <AppLayout>
      <Flex flex={1} direction={'column'}>
        <Flex px={4} minH={'47px'} justify={'space-between'} align={'center'}>
          <Breadcrumb fontWeight={600} separator={<RiArrowRightSLine />}>
            <BreadcrumbItem>
              <BreadcrumbLink href={'#'}>Sales</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to={'/sale-invoice'}>
                Sale Invoices
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink isCurrentPage>View Sale Invoice</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <ButtonGroup spacing={2}>
            <Button
              px={4}
              size={'sm'}
              color={modeBrand}
              colorScheme={'gray'}
              leftIcon={<IoMdDownload />}
              onClick={activeTab === 'regular' ? handleRegularDownload : handleThermalDownload}
            >
              Download
            </Button>
            <Button
              px={4}
              size={'sm'}
              color={modeBrand}
              colorScheme={'gray'}
              leftIcon={<FaPrint />}
              onClick={activeTab === 'regular' ? handleRegularPrint : handleThermalPrint}
            >
              Print
            </Button>
            <Button
              px={4}
              size={'sm'}
              color={'whatsapp.600'}
              colorScheme={'gray'}
              leftIcon={<IoLogoWhatsapp />}
              onClick={activeTab === 'regular' ? handleRegularWhatsapp : handleThermalWhatsapp}
            >
              WhatsApp
            </Button>
          </ButtonGroup>
        </Flex>

        <Tabs w={'100%'} colorScheme="brand">
          <TabList>
            <Tab fontSize={'sm'} fontWeight={600} onClick={() => setActiveTab('regular')}>
              Regular Invoice
            </Tab>
            <Tab fontSize={'sm'} fontWeight={600} onClick={() => setActiveTab('thermal')}>
              Thermal Invoice
            </Tab>
          </TabList>
          <TabPanels bg={'gray.100'}>
            <TabPanel p={0}>
              <Flex p={2} justify={'center'} maxH={'78vh'} overflowY={'scroll'}>
                {!regularPdfFile ? (
                  <Loading title="Generating Sales Invoice" />
                ) : (
                  <Document
                    file={regularPdfFile && regularPdfFile}
                    onLoadSuccess={onDocumentLoadSuccess}
                    noData={''}
                    loading={<Loading />}
                  >
                    {Array.from(new Array(numPages), (_el, index) => (
                      <Page key={`page_${index + 1}`} scale={1.3} pageNumber={index + 1} />
                    ))}
                  </Document>
                )}
              </Flex>
            </TabPanel>
            <TabPanel p={0}>
              <Flex p={2} justify={'center'} maxH={'78vh'} overflowY={'scroll'}>
                {!thermalPdfFile ? (
                  <Loading title="Generating Sales Invoice" />
                ) : (
                  <Document
                    file={thermalPdfFile && thermalPdfFile}
                    onLoadSuccess={onDocumentLoadSuccess}
                    noData={'Loading...'}
                    loading={<Loading />}
                  >
                    {Array.from(new Array(numPages), (_el, index) => (
                      <Page key={`page_${index + 1}`} scale={2} pageNumber={index + 1} />
                    ))}
                  </Document>
                )}
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </AppLayout>
  )
}
