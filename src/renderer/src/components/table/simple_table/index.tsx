import { Table, Thead, Tbody, Tr, Th, Td, Flex } from '@chakra-ui/react'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import NoData from '@renderer/components/no_data'
import useThemeMode from '@renderer/hooks/useThemeMode'

export function SimpleTable({ columns, data, meta, pagination, setPagination }: any) {
  const { mode30 } = useThemeMode()
  const table = useReactTable({
    data: data ? data : [],
    columns,
    rowCount: meta.totalPage,
    state: {
      pagination
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true
  })

  return (
    <Flex flex={1} mb={2} p={4} direction={'column'}>
      <Flex borderTop={'1px solid'} borderColor={mode30} maxH={'65vh'} overflowY={'scroll'}>
        <Table>
          <Thead bg={'gray'}>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => (
                  <Th p={2.5} key={header.id} fontSize={'xs'} border={'1px solid'}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td key={cell.id} py={2} px={3} fontSize={'sm'} border={'1px solid'}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
        <Flex minH={'20vh'} justify={'center'} border={'1px solid'} borderColor={mode30}>
          <NoData />
        </Flex>
      )}
    </Flex>
  )
}
