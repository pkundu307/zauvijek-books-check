import axios from 'axios'
import { API_URL } from '..'
import { cookies } from '@renderer/utils/cookie'
const services = window.ZauvijekAPI.services

export async function getSales(props: any) {
  try {
    const { business_id, sale_type, startDate, endDate } = props
    const response = await services.sale.getSales({
      business_id,
      start_date: startDate,
      end_date: endDate,
      sale_type
    })
    return response
  } catch (error: any) {
    console.log(error)
    throw new Error(error.response.data.message)
  }
}

export async function getUnpaidSale(props: any) {
  try {
    const { business_id, sale_type } = props
    const response = await axios.get(
      `${API_URL}/sale?business_id=${business_id}&sale_type=${sale_type}&page=${1}&take=${99}`,
      { headers: { Authorization: `Bearer ${cookies.get('access_token')}` } }
    )
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function getTotalSaleAmountReceived(props: any) {
  try {
    const { business_id, start_date, end_date } = props
    const response = await axios.get(
      `${API_URL}/sale/total-sale-amount-received?business_id=${business_id}&start_date=${start_date}&end_date=${end_date}`,
      { headers: { Authorization: `Bearer ${cookies.get('access_token')}` } }
    )
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function getSalePrefix(props: any) {
  try {
    const { business_id, sale_type } = props
    const response = await axios.get(
      `${API_URL}/sale/prefix?business_id=${business_id}&sale_type=${sale_type}`,
      { headers: { Authorization: `Bearer ${cookies.get('access_token')}` } }
    )
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function getSalesForPaymentSettlement(props: any) {
  try {
    const { business_id, sale_type, page, take } = props
    const response = await axios.get(
      `${API_URL}/sale?business_id=${business_id}&sale_type=${sale_type}&page=${page}&take=${take}`,
      { headers: { Authorization: `Bearer ${cookies.get('access_token')}` } }
    )
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function searchSales(props: any) {
  try {
    const { business_id, sale_type, customer_name } = props
    const response = await axios.get(
      `${API_URL}/sale/search?business_id=${business_id}&sale_type=${sale_type}&customer_name=${customer_name}`,
      { headers: { Authorization: `Bearer ${cookies.get('access_token')}` } }
    )
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function getSaleById(id: string) {
  try {
    const response = await services.sale.getSaleById(id)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function createSale(props: any) {
  try {
    // const obj1 = { ...props, business_id: '1111', sale_item: [{ amount: 100 }] }
    // delete obj1.sale_tax
    // delete obj1.is_fully_received
    // delete obj1.enable_due_date
    // delete obj1.enable_scan_item
    // console.log(obj1)
    const response = await services.sale.createSale({ ...props })
    console.log(response)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function updateSale(props: any) {
  try {
    const { id, obj } = props
    const response = await services.sale.updateSale(id, { ...obj })
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function deleteSale(props: any) {
  try {
    const { id } = props
    const response = await services.sale.deleteSale(id)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
