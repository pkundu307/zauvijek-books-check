import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  InputGroup,
  InputLeftAddon,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Tag,
  Text
} from '@chakra-ui/react'
import { RiAddLine, RiArrowRightSLine, RiCalendar2Line, RiFundsLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

import useThemeMode from '@renderer/hooks/useThemeMode'
import AppLayout from '@renderer/layouts/app'
import SelectDateRange from '@renderer/components/select_date_range'
import { AdvanceTable } from '@renderer/components/table/advance_table'
import { Search } from '@renderer/components/search'
import { parseCurrency } from '@renderer/utils/parse_currency'
import { RowOptions } from '@renderer/components/row_options'
import { parseDate } from '@renderer/utils/parse_date'

export default function ListSaleInvoiceView(props: any) {
  const { mode20, modeBrand } = useThemeMode()

  const columns = [
    {
      Header: 'Date',
      accessor: (row: saleInvoiceType) => <Text fontSize="sm">{parseDate(row?.invoice_date)}</Text>
    },
    {
      Header: 'Invoice No.',
      accessor: (row: saleInvoiceType) => (
        <Text fontSize="sm">
          {row?.invoice_prefix}
          {row?.invoice_no}
        </Text>
      )
    },
    {
      Header: 'Customer name',
      accessor: (row: saleInvoiceType) => <Text fontSize="sm">{row.customer_name || '-'}</Text>
    },
    {
      Header: 'Total Amount',
      accessor: (row: saleInvoiceType) => <Text fontSize="sm">{row.total_amount || '-'}</Text>
    },
    {
      Header: 'Unpaid',
      accessor: (row: saleInvoiceType) => <Text fontSize="sm">{parseCurrency(row.balance)}</Text>
    },
    {
      Header: 'Status',
      accessor: (row: saleInvoiceType) => {
        return row?.balance > 0 ? (
          <Tag colorScheme={'red'}>Unpaid</Tag>
        ) : (
          <Tag colorScheme={'green'}>Paid</Tag>
        )
      }
    },
    {
      id: 'options',
      accessor: (row: saleInvoiceType) => (
        <RowOptions type={'sale-invoice'} row={row} onDelete={props.handleDelete} />
      ),
      width: 8
    }
  ]

  return (
    <AppLayout>
      <Flex py={2} justify={'space-between'} align="flex-start">
        <Stack direction={'row'} align={'center'} spacing={2}>
          <RiFundsLine size={'18px'} />
          <Breadcrumb separator={<RiArrowRightSLine />}>
            <BreadcrumbItem>
              <BreadcrumbLink href={'#'}>Sales</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink isCurrentPage>Sale Invoices</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Stack>
      </Flex>

      <Grid py={2} templateColumns={'repeat(3, 1fr)'} gap={6}>
        <GridItem colSpan={1}>
          <Card bg={mode20} boxShadow={'none'} rounded={0}>
            <CardBody>
              <Stat>
                <StatLabel>Total Sales Amount</StatLabel>
                <StatNumber>{parseCurrency(0)}</StatNumber>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem colSpan={1}>
          <Card bg={mode20} boxShadow={'none'} rounded={0}>
            <CardBody>
              <Stat>
                <StatLabel>Total Received Amount</StatLabel>
                <StatNumber>{parseCurrency(0)}</StatNumber>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem colSpan={1}>
          <Card bg={mode20} boxShadow={'none'} rounded={0}>
            <CardBody>
              <Stat>
                <StatLabel>Total Outstanding Amount</StatLabel>
                <StatNumber>{parseCurrency(0)}</StatNumber>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      <Flex py={2} justify={'space-between'} align={'center'}>
        <Stack direction={'row'} spacing={4} align={'center'}>
          <Flex>
            <InputGroup size={'sm'} zIndex={2}>
              <InputLeftAddon children={<RiCalendar2Line />} bg={mode20} />
              <Flex w="220px">
                <SelectDateRange
                  selectedDates={props.selectedDates}
                  setSelectedDates={props.handleSelectedDates}
                />
              </Flex>
            </InputGroup>
          </Flex>
          <Flex w={'300px'}>
            <Search
              value={props.search}
              searchFilter={props.searchFilter}
              placeholder={'Search by customer name'}
            />
          </Flex>
        </Stack>

        <ButtonGroup spacing={2}>
          <Link to={'/sale-invoice/new'}>
            <Button px={4} size={'sm'} rounded={0} color={modeBrand} leftIcon={<RiAddLine />}>
              Add Sale Invoice
            </Button>
          </Link>
        </ButtonGroup>
      </Flex>

      <AdvanceTable
        columns={columns || []}
        data={props.saleInvoices?.data || []}
        meta={props.saleInvoices?.meta}
        setPageIndex={props.setPageIndex}
        setPageSize={props.setPageSize}
        useControlledState={props.useControlledState}
      />
    </AppLayout>
  )
}
