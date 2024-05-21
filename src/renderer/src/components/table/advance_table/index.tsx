import * as React from 'react'
import { useTable, usePagination } from 'react-table'
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Text,
  IconButton,
  Select,
  Stack
} from '@chakra-ui/react'

import useThemeMode from '@renderer/hooks/useThemeMode'
import NoData from '@renderer/components/no_data'

export function AdvanceTable(props: any) {
  const { mode30 } = useThemeMode()
  const { setPageIndex, setPageSize, useControlledState } = props

  const data = React.useMemo(() => props?.data, [props?.data])
  const meta = React.useMemo(() => props?.meta, [props?.meta])
  const columns = React.useMemo(() => props?.columns, [props?.columns])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    state: { pageIndex, pageSize },
    setQueryPageIndex,
    setQueryPageSize
  } = useTable(
    {
      columns,
      data: data ? data : [],
      useControlledState,
      manualPagination: true,
      pageCount: meta?.pageCount,
      autoResetPage: false,
      setQueryPageIndex: setPageIndex,
      setQueryPageSize: setPageSize
    },
    usePagination
  )

  return (
    <Flex flex={1} direction={'column'}>
      <Flex>
        <Table {...getTableProps()}>
          <Thead bg="brand.500">
            {headerGroups.map((headerGroup, i) => (
              <Tr key={i} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, i) => (
                  <Th
                    key={i}
                    p={2.5}
                    color="brand.50"
                    border="1px solid"
                    borderColor={mode30}
                    {...column.getHeaderProps()}
                  >
                    {column.render('Header')}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page?.map((row: any, i) => {
              prepareRow(row)
              return (
                <Tr key={i} {...row.getRowProps()}>
                  {row.cells.map((cell: any, i) => {
                    return (
                      <Td
                        key={i}
                        p={2.5}
                        border={'1px solid'}
                        borderColor={mode30}
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </Td>
                    )
                  })}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Flex>

      {/* No data found */}
      {data?.length === 0 && (
        <Flex minH={'60vh'} justify={'center'} border={'1px solid'} borderColor={mode30}>
          <NoData />
        </Flex>
      )}

      {/* Pagination */}
      <Flex py={6} justify={'space-between'} align={'center'}>
        <Stack direction={'row'} spacing={2}>
          <IconButton
            aria-label={''}
            icon={<FaAngleDoubleLeft />}
            size={'sm'}
            onClick={() => setQueryPageIndex(0)}
            isDisabled={!canPreviousPage}
          />
          <IconButton
            aria-label={''}
            icon={<FaAngleLeft />}
            size={'sm'}
            onClick={() => setQueryPageIndex(pageIndex > 0 ? pageIndex - 1 : 1)}
            isDisabled={!canPreviousPage}
          />
          <IconButton
            aria-label={''}
            icon={<FaAngleRight />}
            size={'sm'}
            onClick={() => setQueryPageIndex(pageIndex < pageCount ? pageIndex + 1 : pageCount)}
            isDisabled={!canNextPage}
          />
          <IconButton
            aria-label={''}
            icon={<FaAngleDoubleRight />}
            size={'sm'}
            onClick={() => setQueryPageIndex(pageCount - 1)}
            isDisabled={!canNextPage}
          />
        </Stack>

        <Stack direction={'row'} spacing={2} align={'center'}>
          <Text fontSize={'xs'} fontWeight={600}>
            Page {pageIndex + 1} of {pageOptions?.length}
          </Text>
          <Flex>
            <Select
              size={'sm'}
              value={pageSize}
              onChange={(e) => {
                e.preventDefault()
                setQueryPageSize(Number(e.target.value))
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </Select>
          </Flex>
        </Stack>
      </Flex>
    </Flex>
  )
}
