import { useEffect, useMemo, useState } from 'react'
import { PaginationState } from '@tanstack/react-table'
import { searchByProperty } from '@renderer/utils/serach_by_propertyname'
import ListSaleInvoiceView from '../view/list.sale_invoice.view'

const ListSaleInvoiceController = (props: any) => {
  /**
   * ----------------------------------------------------------------------
   *  LOCAL STATES START
   *
   */
  const [data, setData] = useState({
    data: [...props.data],
    meta: { totalPage: props.data.length }
  })
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })
  const [isSearching, setSearching] = useState(false)

  /**
   *
   *  LOCAL STATES END
   * ----------------------------------------------------------------------
   */

  const updateData = useMemo(
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
  useEffect(() => {
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

  useEffect(() => {
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
    <ListSaleInvoiceView
      selectedDates={props.selectedDates}
      handleSelectedDates={props.handleSelectedDates}
      data={updateData}
      meta={data?.meta || {}}
      search={props.search}
      searchFilter={props.searchFilter}
      handleDelete={props.handleDelete}
      pagination={pagination}
      setPagination={setPagination}
    />
  )

  /**
   *
   *  RENDERING END
   * ----------------------------------------------------------------------
   */
}

export default ListSaleInvoiceController
