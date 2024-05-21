import {
  Flex,
  Stack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Text,
  ButtonGroup
} from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import Spreadsheet, { CellBase, Matrix, createEmptyMatrix } from 'react-spreadsheet'
import { RiGroup2Line, RiArrowRightSLine, RiUpload2Line } from 'react-icons/ri'

import AppLayout from '@renderer/layouts/app'
import useThemeMode from '@renderer/hooks/useThemeMode'
import Container from '@renderer/components/container'

export default function SpreadsheetSupplierView(props: any) {
  const { modeBrand } = useThemeMode()
  const columnLabels = [
    'Category',
    'Business type',
    'Business name',
    'Supplier name',
    'Phone No.',
    'Email',
    'Billing address',
    'Shipping address',
    'GST No.',
    'PAN No.',
    'Place of supply',
    'Opening balance',
    'Closing balance',
    'Credit limit',
    'Credit period'
  ]

  const [data, setData] = React.useState<Matrix<CellBase>>([])

  React.useEffect(() => {
    initSpreadsheet()
  }, [])

  function initSpreadsheet() {
    const matrix: Matrix<CellBase> = createEmptyMatrix(100, 15)
    setData(matrix)
  }

  function handleBulkUpload() {
    const sheet: Matrix<CellBase> = { ...data }
    const entry: Matrix<CellBase> = []

    Object.keys(sheet).forEach((key: any) => {
      if (sheet[key].filter((item) => item === undefined).length === 0) return
      else {
        entry.push(sheet[key])
      }
    })
  }

  return (
    <AppLayout>
      <Flex py={2} justify="space-between" align="flex-start">
        <Stack direction="row" align="center" spacing={2}>
          <RiGroup2Line size="18px" />
          <Breadcrumb separator={<RiArrowRightSLine />}>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Parties</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/supplier">
                Suppliers
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink isCurrentPage>{props.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Stack>
        <ButtonGroup>
          <Button
            px={4}
            size={'sm'}
            rounded={0}
            color={modeBrand}
            leftIcon={<RiUpload2Line />}
            onClick={handleBulkUpload}
          >
            Upload
          </Button>
        </ButtonGroup>
      </Flex>

      <Container title={<Text fontSize="sm">Add or edit supplier details</Text>}>
        <Flex fontSize="sm" maxH="72vh" overflow="scroll" bg="#fff">
          <Spreadsheet columnLabels={columnLabels} data={data} onChange={setData} />
        </Flex>
      </Container>
    </AppLayout>
  )
}
