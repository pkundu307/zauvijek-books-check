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
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text
} from '@chakra-ui/react'
import { RiAddLine, RiArrowRightSLine, RiFileExcel2Line, RiGroup2Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { BsActivity } from 'react-icons/bs'

import useThemeMode from '@renderer/hooks/useThemeMode'
import AppLayout from '@renderer/layouts/app'
import { AdvanceTable } from '@renderer/components/table/advance_table'
import { Search } from '@renderer/components/search'
import { parseCurrency } from '@renderer/utils/parse_currency'
import { RowOptions } from '@renderer/components/row_options'

export default function ListCustomerView(props: any) {
  const { mode20, modeBrand } = useThemeMode()

  const columns = [
    {
      Header: 'Customer Name',
      accessor: (row: customerType) => <Text fontSize="sm">{row?.party_name}</Text>
    },
    {
      Header: 'Phone No.',
      accessor: (row: customerType) => <Text fontSize="sm">{row.phone_no || '-'}</Text>
    },
    {
      Header: 'Location',
      accessor: (row: customerType) => <Text fontSize="sm">{row.place_of_supply || '-'}</Text>
    },
    {
      Header: 'GST No.',
      accessor: (row: customerType) => <Text fontSize="sm">{row.gst_no || '-'}</Text>
    },
    {
      Header: 'Credit Limit',
      accessor: (row: customerType) => <Text fontSize="sm">{parseCurrency(row.credit_limit)}</Text>
    },
    {
      Header: 'Closing Balance',
      accessor: (row: customerType) => (
        <Text fontSize="sm">{parseCurrency(row.closing_balance)}</Text>
      )
    },
    {
      id: 'options',
      accessor: (row: customerType) => (
        <RowOptions type={'customer'} row={row} onDelete={props.handleDelete} />
      ),
      width: 8
    }
  ]

  return (
    <AppLayout>
      <Flex py={2} justify={'space-between'} align="flex-start">
        <Stack direction={'row'} align={'center'} spacing={2}>
          <RiGroup2Line size={'18px'} />
          <Breadcrumb separator={<RiArrowRightSLine />}>
            <BreadcrumbItem>
              <BreadcrumbLink href={'#'}>Parties</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink isCurrentPage>Customers</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Stack>
      </Flex>

      <Grid my={2} templateColumns={'repeat(3, 1fr)'} gap={6}>
        <GridItem colSpan={1}>
          <Card bg={mode20} boxShadow={'none'} rounded={0}>
            <CardBody>
              <Stat>
                <StatLabel>Total Customer Count</StatLabel>
                <StatNumber>0</StatNumber>
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
          <Flex w={'300px'}>
            <Search
              value={props.search}
              searchFilter={props.searchFilter}
              placeholder={'Search by customer name'}
            />
          </Flex>
        </Stack>

        <ButtonGroup spacing={2}>
          <Link to={'/customer/activity'}>
            <Button px={4} size={'sm'} rounded={0} color={modeBrand} leftIcon={<BsActivity />}>
              Activity
            </Button>
          </Link>
          <Link to={'/customer/bulk-upload'}>
            <Button
              px={4}
              size={'sm'}
              rounded={0}
              color={modeBrand}
              leftIcon={<RiFileExcel2Line />}
            >
              Bulk Upload
            </Button>
          </Link>
          <Link to={'/customer/new'}>
            <Button px={4} size={'sm'} rounded={0} color={modeBrand} leftIcon={<RiAddLine />}>
              Add Customer
            </Button>
          </Link>
        </ButtonGroup>
      </Flex>

      <AdvanceTable
        columns={columns || []}
        data={props.customers?.data || []}
        meta={props.customers?.meta}
        setPageIndex={props.setPageIndex}
        setPageSize={props.setPageSize}
        useControlledState={props.useControlledState}
      />
    </AppLayout>
  )
}
