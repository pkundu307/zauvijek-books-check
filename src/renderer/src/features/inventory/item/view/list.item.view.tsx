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
  // Tag,
  Text
} from '@chakra-ui/react'
import { RiAddLine, RiArrowRightSLine, RiBox3Line, RiFileExcel2Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { BsActivity } from 'react-icons/bs'

import useThemeMode from '@renderer/hooks/useThemeMode'
import AppLayout from '@renderer/layouts/app'
import { AdvanceTable } from '@renderer/components/table/advance_table'
import { Search } from '@renderer/components/search'
import { parseCurrency } from '@renderer/utils/parse_currency'
import { RowOptions } from '@renderer/components/row_options'
// import { getInnerWidth } from '@renderer/utils/inner_width'

export default function ListItemView(props: any) {
  const { mode20, modeBrand } = useThemeMode()

  const columns = [
    {
      header: 'Item Name',
      accessorKey: 'item_name',
      cell: (row: any) => (
        <Text fontSize="sm" textAlign={'center'}>
          {row.getValue() ? row.getValue() : '-'}
        </Text>
      )
    },
    {
      header: 'Category',
      accessorKey: 'item_category',
      cell: (row: any) => (
        <Text fontSize="sm" textAlign={'center'}>
          {row.getValue() ? row.getValue() : '-'}
        </Text>
      )
    },
    {
      header: 'Selling Price',
      accessorKey: 'selling_price',
      cell: (row: any) => (
        <Text fontSize="sm" textAlign={'center'}>
          {row.getValue() ? parseCurrency(row.getValue()) : '-'}
        </Text>
      )
    },

    {
      header: 'GST Rate',
      accessorKey: 'gst_rate',
      cell: (row: any) => (
        <Text fontSize="sm" textAlign={'center'}>
          {row.getValue() ? `${row.getValue()}%` : '-'}
        </Text>
      )
    },
    {
      header: 'Closing Stock',
      accessorKey: 'closing_stock',
      cell: (row: any) => (
        <Text textAlign={'center'}>
          {row.getValue() ? (
            row.getValue() < 0 ? (
              <Text color={'red.500'} fontSize="sm">
                {row.getValue()}
              </Text>
            ) : (
              <Text color={'green.500'} fontSize="sm">
                {row.getValue()}
              </Text>
            )
          ) : (
            <Text color={'green.500'} fontSize="sm">
              {'-'}
            </Text>
          )}
        </Text>
      )
    },
    // {
    //   Header: 'Stock Type',
    //   accessorKey: 'Stock Type',
    //   accessor: (row: itemType) => {
    //     return (
    //       <>
    //         {row?.batching_enabled && (
    //           <Tag colorScheme={'blue'}>
    //             <Text fontSize="sm">Batching</Text>
    //           </Tag>
    //         )}
    //         {row?.serialization_enabled && (
    //           <Tag colorScheme={'purple'}>
    //             <Text fontSize="sm">Serialisation</Text>
    //           </Tag>
    //         )}
    //         {!row?.serialization_enabled && !row?.batching_enabled && (
    //           <Tag colorScheme={'gray'}>
    //             <Text fontSize="sm">Default</Text>
    //           </Tag>
    //         )}
    //       </>
    //     )
    //   }
    // },
    {
      header: 'options',
      accessorKey: 'id',
      cell: (row: any) => (
        <RowOptions type={'items'} row={{ id: row.getValue() }} onDelete={props.handleDelete} />
      )
    }
  ]

  return (
    <AppLayout>
      <Flex py={2} justify={'space-between'} align="flex-start">
        <Stack direction={'row'} align={'center'} spacing={2}>
          <RiBox3Line size={'18px'} />
          <Breadcrumb separator={<RiArrowRightSLine />}>
            <BreadcrumbItem>
              <BreadcrumbLink href={'#'}>Inventory</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink isCurrentPage>Items</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Stack>
      </Flex>

      <Grid my={2} templateColumns={'repeat(3, 1fr)'} gap={6}>
        <GridItem colSpan={1}>
          <Card bg={mode20} boxShadow={'none'} rounded={0}>
            <CardBody>
              <Stat>
                <StatLabel>Total Stock Value</StatLabel>
                <StatNumber>{parseCurrency(0)}</StatNumber>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem colSpan={1}>
          <Card bg={mode20} boxShadow={'none'} rounded={0}>
            <CardBody>
              <Stat>
                <StatLabel>Low Stock Count</StatLabel>
                <StatNumber>0</StatNumber>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem colSpan={1}>
          <Card bg={mode20} boxShadow={'none'} rounded={0}>
            <CardBody>
              <Stat>
                <StatLabel>Expiry Stock Count</StatLabel>
                <StatNumber>0</StatNumber>
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
              placeholder={'Search by item name'}
            />
          </Flex>
        </Stack>

        <ButtonGroup spacing={2}>
          <Link to={'/item/activity'}>
            <Button px={4} size={'sm'} rounded={0} color={modeBrand} leftIcon={<BsActivity />}>
              Stock Activity
            </Button>
          </Link>
          <Link to={'/item/bulk-upload'}>
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
          <Link to={'/item/new'}>
            <Button px={4} size={'sm'} rounded={0} color={modeBrand} leftIcon={<RiAddLine />}>
              Add Item
            </Button>
          </Link>
        </ButtonGroup>
      </Flex>

      <AdvanceTable
        columns={columns || []}
        data={props.items?.data || []}
        meta={{ totalPages: 0 }}
        pagination={props.pagination}
        setPagination={props.setPagination}
      />
    </AppLayout>
  )
}
