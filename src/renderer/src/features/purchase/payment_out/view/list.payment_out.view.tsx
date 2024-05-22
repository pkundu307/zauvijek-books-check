/**
 * ----------------------------------------------------------------------
 *  NPM MODULES START
 *
 */

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
import {
  RiAddLine,
  RiArrowRightSLine,
  RiCalendar2Line,
  RiFundsLine,
  RiSettings3Line
} from 'react-icons/ri'
import { Link } from 'react-router-dom'

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

import AppLayout from '@renderer/layouts/app'
import useThemeMode from '@renderer/hooks/useThemeMode'
import SelectDateRange from '@renderer/components/form/select_date_range'
import { Search } from '@renderer/components/form/search'
import { RowOptions } from '@renderer/components/row_options'
import { parseCurrency } from '@renderer/utils/parse_currency'
import { AdvanceTable } from '@renderer/components/table/advance_table'
import { format } from 'date-fns'

/**
 *
 *  CUSTOM MODULES END
 * ----------------------------------------------------------------------
 */

export default function ListPaymentOutView(props: any) {
  /**
   * ----------------------------------------------------------------------
   *  CUSTOM HOOKS START
   *
   */

  const { mode20, modeBrand } = useThemeMode()

  /**
   *
   *  CUSTOM HOOKS END
   * ----------------------------------------------------------------------
   */

  /**
   * ----------------------------------------------------------------------
   *  TABLE COLUMNS START
   *
   */

  const columns = [
    {
      header: 'Date',
      accessorKey: 'invoice_date',
      cell: (row: any) => (
        <Text fontSize="sm" textAlign={'center'}>
          {format(row.getValue(), 'dd/MM/yyyy')}
        </Text>
      )
    },
    {
      header: 'Invoice No.',
      accessorKey: 'invoice_no',
      cell: (row: any) => (
        <Text fontSize="sm" textAlign={'center'}>
          {row.getValue() ? row.getValue() : '-'}
        </Text>
      )
    },
    {
      header: 'Customer name',
      accessorKey: 'party_name',
      cell: (row: any) => (
        <Text fontSize="sm" textAlign={'center'}>
          {row.getValue() ? row.getValue() : '-'}
        </Text>
      )
    },
    {
      header: 'Total Amount',
      accessorKey: 'total_amount',
      cell: (row: any) => (
        <Text fontSize="sm" textAlign={'center'}>
          {row.getValue() ? row.getValue() : '-'}
        </Text>
      )
    },
    {
      header: 'Unpaid',
      accessorKey: 'balance_amount',
      cell: (row: any) => (
        <Text fontSize="sm" textAlign={'center'}>
          {row.getValue() ? row.getValue() : '0'}
        </Text>
      )
    },
    {
      header: 'Status',
      accessorKey: 'balance_amount',
      cell: (row: any) => (
        <Text textAlign={'center'}>
          {row.getValue() ? (
            row.getValue() > 0 ? (
              <Tag colorScheme={'red'}>Unpaid</Tag>
            ) : (
              <Tag colorScheme={'green'}>Paid</Tag>
            )
          ) : (
            <Tag colorScheme={'green'}>Paid</Tag>
          )}
        </Text>
      )
    },
    {
      header: 'options',
      accessorKey: 'id',
      cell: (row: any) => (
        <RowOptions
          type={'payment-out'}
          row={{ id: row.getValue() }}
          onDelete={props.handleDelete}
        />
      )
    }
  ]

  /**
   *
   *  TABLE COLUMNS END
   * ----------------------------------------------------------------------
   */

  /**
   * ----------------------------------------------------------------------
   *  RENDERING START
   *
   */
  return (
    <AppLayout>
      <Flex py={4} px={0} justify={'space-between'} align="center">
        <Stack direction={'row'} align={'center'} spacing={2}>
          <RiFundsLine size={'18px'} />
          <Breadcrumb separator={<RiArrowRightSLine />}>
            <BreadcrumbItem>
              <BreadcrumbLink href={'#'}>Purchases</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink isCurrentPage>Payment Outs</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Stack>

        <ButtonGroup spacing={2}>
          <Button
            px={4}
            size="sm"
            rounded={0}
            color={modeBrand}
            colorScheme="gray"
            leftIcon={<RiSettings3Line />}
          >
            Settings
          </Button>
        </ButtonGroup>
      </Flex>

      <Grid templateColumns={'repeat(3, 1fr)'} gap={6} px={0}>
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

      <Flex py={4} px={0} justify={'space-between'} align={'center'}>
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
          <Link to={'/payment-out/new'}>
            <Button px={4} size={'sm'} rounded={0} color={modeBrand} leftIcon={<RiAddLine />}>
              Add Payment Out
            </Button>
          </Link>
        </ButtonGroup>
      </Flex>
      <AdvanceTable
        columns={columns}
        data={props?.data || []}
        meta={props.meta}
        pagination={props.pagination}
        setPagination={props.setPagination}
      />
    </AppLayout>
  )

  /**
   *
   *  RENDERING END
   * ----------------------------------------------------------------------
   */
}
