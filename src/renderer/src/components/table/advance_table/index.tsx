// import {
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Flex,
//   Text,
//   IconButton,
//   Select,
//   Stack
// } from '@chakra-ui/react'
// import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa'
// import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

// import NoData from '@renderer/components/no_data'
// import useThemeMode from '@renderer/hooks/useThemeMode'

// export function AdvanceTable({ columns, data, meta, pagination, setPagination }: any) {
//   const { mode30 } = useThemeMode()
//   const table = useReactTable({
//     data: data ? data : [],
//     columns,
//     rowCount: meta.totalPage,
//     state: {
//       pagination
//     },
//     onPaginationChange: setPagination,
//     getCoreRowModel: getCoreRowModel(),
//     manualPagination: true
//   })

//   return (
//     <Flex flex={1} mb={2} p={4} direction={'column'}>
//       <Flex borderTop={'1px solid'} borderColor={mode30} maxH={'65vh'} overflowY={'scroll'}>
//         <Table>
//           <Thead bg={'gray'}>
//             {table.getHeaderGroups().map((headerGroup: any) => (
//               <Tr key={headerGroup.id}>
//                 {headerGroup.headers.map((header: any) => (
//                   <Th p={2.5} key={header.id} fontSize={'xs'} border={'1px solid'}>
//                     {flexRender(header.column.columnDef.header, header.getContext())}
//                   </Th>
//                 ))}
//               </Tr>
//             ))}
//           </Thead>
//           <Tbody>
//             {table.getRowModel().rows.map((row) => {
//               return (
//                 <Tr key={row.id}>
//                   {row.getVisibleCells().map((cell) => {
//                     return (
//                       <Td key={cell.id} py={2} px={3} fontSize={'sm'} border={'1px solid'}>
//                         {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                       </Td>
//                     )
//                   })}
//                 </Tr>
//               )
//             })}
//           </Tbody>
//         </Table>
//       </Flex>

//       {/* No data found */}
//       {data?.length === 0 && (
//         <Flex minH={'40vh'} justify={'center'} border={'1px solid'} borderColor={mode30}>
//           <NoData />
//         </Flex>
//       )}

//       {/* Pagination */}
//       <Flex py={6} justify={'space-between'} align={'center'}>
//         <Stack direction={'row'} spacing={2}>
//           <IconButton
//             aria-label={''}
//             icon={<FaAngleDoubleLeft />}
//             size={'sm'}
//             onClick={() => table.firstPage()}
//             isDisabled={!table.getCanPreviousPage()}
//           />
//           <IconButton
//             aria-label={''}
//             icon={<FaAngleLeft />}
//             size={'sm'}
//             onClick={() => table.previousPage()}
//             isDisabled={!table.getCanPreviousPage()}
//           />
//           <IconButton
//             aria-label={''}
//             icon={<FaAngleRight />}
//             size={'sm'}
//             onClick={() => table.nextPage()}
//             isDisabled={!table.getCanNextPage()}
//           />
//           <IconButton
//             aria-label={''}
//             icon={<FaAngleDoubleRight />}
//             size={'sm'}
//             onClick={() => table.lastPage()}
//             isDisabled={!table.getCanNextPage()}
//           />
//         </Stack>

//         <Stack direction={'row'} spacing={2} align={'center'}>
//           <Text fontSize={'xs'} fontWeight={600}>
//             Page {table.getState().pagination.pageIndex + 1} of{' '}
//             {table.getPageCount().toLocaleString()}
//           </Text>
//           <Flex>
//             <Select
//               size={'sm'}
//               value={table.getState().pagination.pageSize}
//               onChange={(e) => {
//                 e.preventDefault()
//                 table.setPageSize(Number(e.target.value))
//               }}
//             >
//               {[10, 20, 30, 40, 50].map((pageSize) => (
//                 <option key={pageSize} value={pageSize}>
//                   Show {pageSize}
//                 </option>
//               ))}
//             </Select>
//           </Flex>
//         </Stack>
//       </Flex>
//     </Flex>
//   )
// }

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
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa'
import { PaginationState, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import useThemeMode from '@renderer/hooks/useThemeMode'
import NoData from '@renderer/components/no_data'

export function AdvanceTable({
  columns,
  data,
  meta,
  pagination,
  setPagination
}: {
  columns: any[]
  data: any[]
  meta: any
  pagination: PaginationState
  setPagination: any
}) {
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

  const { mode30 } = useThemeMode()
  console.log(mode30)

  return (
    <Flex flex={1} mb={2} py={4} px={0} direction={'column'}>
      <Flex
        borderTop={'1px solid'}
        borderColor={mode30}
        maxH={'65vh'}
        // overflowY={"scroll"}
      >
        <Table>
          <Thead bg={mode30}>
            {table.getHeaderGroups().map((headerGroup, index) => (
              <Tr key={headerGroup.id + Math.random().toString(36).substr(index, 9)}>
                {headerGroup.headers.map((header, index) => (
                  <Th
                    p={2.5}
                    key={header.id + Math.random().toString(36).substr(index, 9)}
                    colSpan={header.colSpan}
                    fontSize={'xs'}
                    // color={mode70}
                    // textTransform={'none'}
                    border={'1px solid'}
                    borderColor={mode30}
                    textAlign={'center'}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row, index: number) => {
              return (
                <Tr key={row.id + Math.random().toString(36).substr(index, 9)}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td
                        key={cell.id + Math.random().toString(36).substr(index, 9)}
                        py={2}
                        px={3}
                        fontSize={'sm'}
                        border={'1px solid'}
                        borderColor={mode30}
                      >
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
        <Flex minH={'40vh'} justify={'center'} border={'1px solid'} borderColor={mode30}>
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
            onClick={() => table.firstPage()}
            isDisabled={!table.getCanPreviousPage()}
          />
          <IconButton
            aria-label={''}
            icon={<FaAngleLeft />}
            size={'sm'}
            onClick={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
          />
          <IconButton
            aria-label={''}
            icon={<FaAngleRight />}
            size={'sm'}
            onClick={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}
          />
          <IconButton
            aria-label={''}
            icon={<FaAngleDoubleRight />}
            size={'sm'}
            onClick={() => table.lastPage()}
            isDisabled={!table.getCanNextPage()}
          />
        </Stack>

        <Stack direction={'row'} spacing={2} align={'center'}>
          <Text fontSize={'xs'} fontWeight={600}>
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount().toLocaleString()}
          </Text>
          <Flex>
            <Select
              size={'sm'}
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                e.preventDefault()
                table.setPageSize(Number(e.target.value))
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
