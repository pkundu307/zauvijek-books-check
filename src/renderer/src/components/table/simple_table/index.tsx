import * as React from 'react'
import { useTable } from 'react-table'
import { Table, Thead, Tbody, Tr, Th, Td, Flex } from '@chakra-ui/react'

import useThemeMode from '@renderer/hooks/useThemeMode'
import NoData from '@renderer/components/no_data'

export function SimpleTable(props: any) {
  const { mode20 } = useThemeMode()

  const data = React.useMemo(() => props.data, [props.data])
  const columns = React.useMemo(() => props.columns, [props.columns])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: data ? data : []
  })

  return (
    <Flex direction={'column'}>
      <Flex>
        <Table {...getTableProps()} variant={'simple'}>
          <Thead bg={mode20}>
            {headerGroups.map((headerGroup, i) => (
              <Tr key={i} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, i) => (
                  <Th key={i} {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row)
              return (
                <Tr key={i} {...row.getRowProps()}>
                  {row.cells.map((cell, i) => {
                    return (
                      <Td key={i} py={3} {...cell.getCellProps()}>
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
      {data?.length === 0 && <NoData />}
    </Flex>
  )
}
