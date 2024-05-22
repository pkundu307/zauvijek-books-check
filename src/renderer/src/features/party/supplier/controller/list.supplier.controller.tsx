import * as React from 'react'
import ListSupplierView from '../view/list.supplier.view'
import { PaginationState } from '@tanstack/react-table'
import { searchByProperty } from '@renderer/utils/serach_by_propertyname'

export default function ListSupplierController(props: any) {
  /**
   * ----------------------------------------------------------------------
   *  LOCAL STATES START
   *
   */
  const [data, setData] = React.useState({
    data: [...props.data],
    meta: { totalPage: props.data.length }
  })
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })
  const [isSearching, setSearching] = React.useState(false)

  /**
   *
   *  LOCAL STATES END
   * ----------------------------------------------------------------------
   */

  const updateData = React.useMemo(
    () =>
      data?.data.slice(
        pagination.pageIndex * pagination.pageSize,
        pagination.pageIndex * pagination.pageSize + pagination.pageSize
      ) || [],
    [data, pagination]
  )
  /**
   * ----------------------------------------------------------------------
   *  LOCAL EFFECTS START
   *
   */
  React.useEffect(() => {
    if (props.data && isSearching === false) {
      setData({
        data: [...props.data],
        meta: { totalPage: props.data.length }
      })
    } else {
      const updateData = searchByProperty(props?.data, 'party_name', props.search)
      const result = { data: updateData, meta: { totalPage: updateData.length } }
      setData(result)
    }
  }, [props.data, isSearching, props.search])

  React.useEffect(() => {
    if (props.search === '') {
      setSearching(false)
    } else {
      setSearching(true)
    }
  }, [props.search])

  /**
   *
   *  LOCAL EFFECTS END
   * ----------------------------------------------------------------------
   */

  /**
   * ----------------------------------------------------------------------
   *  RENDERING START
   *
   */

  return (
    <ListSupplierView
      data={updateData}
      meta={data?.meta || {}}
      search={props.search}
      searchFilter={props.searchFilter}
      handleDelete={props.handleDelete}
      pagination={pagination}
      setPagination={setPagination}
    />
  )
}
