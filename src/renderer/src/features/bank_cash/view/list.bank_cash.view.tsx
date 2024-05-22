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
import { Link } from 'react-router-dom'
import { BsActivity } from 'react-icons/bs'
import { FaExchangeAlt, FaRupeeSign } from 'react-icons/fa'
import { RiAddLine, RiArrowRightSLine, RiBankLine } from 'react-icons/ri'

import useThemeMode from '@renderer/hooks/useThemeMode'
import AppLayout from '@renderer/layouts/app'
import { AdvanceTable } from '@renderer/components/table/advance_table'
import { Search } from '@renderer/components/search'
import { parseCurrency } from '@renderer/utils/parse_currency'
import { RowOptions } from '@renderer/components/row_options'

export default function ListBankCashView(props: any) {
  const { mode20, modeBrand } = useThemeMode()

  const columns = [
    {
      header: 'Account Name',
      accessorKey: 'account_name',
      cell: (row: any) => (
        <Text fontSize="sm" textAlign={'center'}>
          {row.getValue()}
        </Text>
      )
    },
    {
      header: 'Account Type',
      accessorKey: 'account_type',
      cell: (row: any) => (
        <Text fontSize="sm" textAlign={'center'}>
          {row.getValue() || '-'}
        </Text>
      )
    },
    {
      header: 'Opening Balance',
      accessorKey: 'opening_balance',
      cell: (row: any) => (
        <Text fontSize="sm" textAlign={'center'}>
          {parseCurrency(row.getValue()) || '-'}
        </Text>
      )
    },
    {
      header: 'Closing Balance',
      accessorKey: 'closing_balance',
      cell: (row: any) => (
        <Text fontSize="sm" textAlign={'center'}>
          {parseCurrency(row.getValue()) || '-'}
        </Text>
      )
    },
    {
      header: 'options',
      accessorKey: 'id',
      cell: (row: any) => (
        <RowOptions type={'bank-cash'} row={{ id: row.getValue() }} onDelete={props.handleDelete} />
      )
    }
  ]

  return (
    <AppLayout>
      <Flex my={2} justify={'space-between'} align={'center'}>
        <Stack direction={'row'} align={'center'} spacing={2}>
          <RiBankLine size={'18px'} />
          <Breadcrumb separator={<RiArrowRightSLine />}>
            <BreadcrumbItem>
              <BreadcrumbLink href={'#'}>Bank, Cash & Cheque</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Stack>
      </Flex>

      <Grid my={2} templateColumns={'repeat(4, 1fr)'} gap={6}>
        <GridItem colSpan={1}>
          <Card bg={mode20} boxShadow={'none'} rounded={0}>
            <CardBody>
              <Stat>
                <StatLabel>Total ( Bank + Cash + Cheque ) amount</StatLabel>
                <StatNumber>{parseCurrency(0)}</StatNumber>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem colSpan={1}>
          <Card bg={mode20} boxShadow={'none'} rounded={0}>
            <CardBody>
              <Stat>
                <StatLabel>Total Bank amount</StatLabel>
                <StatNumber>{parseCurrency(0)}</StatNumber>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem colSpan={1}>
          <Card bg={mode20} boxShadow={'none'} rounded={0}>
            <CardBody>
              <Stat>
                <StatLabel>Total Cash amount</StatLabel>
                <StatNumber>{parseCurrency(0)}</StatNumber>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem colSpan={1}>
          <Card bg={mode20} boxShadow={'none'} rounded={0}>
            <CardBody>
              <Stat>
                <StatLabel>Total Cheque amount</StatLabel>
                <StatNumber>{parseCurrency(0)}</StatNumber>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      <Flex my={4} justify={'space-between'} align={'center'}>
        <Stack direction={'row'} spacing={4} align={'center'}>
          <Flex w={'300px'}>
            <Search
              value={props.search}
              searchFilter={props.searchFilter}
              placeholder={'Search by account name'}
            />
          </Flex>
        </Stack>
        <ButtonGroup spacing={2}>
          <Link to={'/bank-cash-cheque/activity'}>
            <Button px={4} size={'sm'} rounded={0} color={modeBrand} leftIcon={<BsActivity />}>
              Activity
            </Button>
          </Link>
          <Button px={4} size={'sm'} rounded={0} color={modeBrand} leftIcon={<FaRupeeSign />}>
            Adjust Amount
          </Button>
          <Button px={4} size={'sm'} rounded={0} color={modeBrand} leftIcon={<FaExchangeAlt />}>
            Transfer Amount
          </Button>
          <Link to={'/bank-cash/new'}>
            <Button px={4} size={'sm'} rounded={0} color={modeBrand} leftIcon={<RiAddLine />}>
              Add Account
            </Button>
          </Link>
        </ButtonGroup>
      </Flex>

      <AdvanceTable
        columns={columns || []}
        data={props?.data || []}
        meta={props.meta}
        pagination={props.pagination}
        setPagination={props.setPagination}
      />
    </AppLayout>
  )
}
