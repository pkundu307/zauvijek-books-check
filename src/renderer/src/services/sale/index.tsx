import axios from 'axios'
import { API_URL } from '..'
import { cookies } from '@renderer/utils/cookie'

export async function getSales(props: any) {
  try {
    const { business_id, sale_type, start_date, end_date, page, take } = props
    const response = await axios.get(
      `${API_URL}/sale?business_id=${business_id}&sale_type=${sale_type}&start_date=${start_date}&end_date=${end_date}&page=${page}&take=${take}`,
      { headers: { Authorization: `Bearer ${cookies.get('access_token')}` } }
    )
    return response?.data
  } catch (error: any) {
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

export async function getSaleById(props: any) {
  try {
    const response = await axios.get(`${API_URL}/sale/${props.id}`, {
      headers: { Authorization: `Bearer ${cookies.get('access_token')}` }
    })
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function createSale(props: any) {
  try {
    const response = await axios.post(`${API_URL}/sale`, props, {
      headers: { Authorization: `Bearer ${cookies.get('access_token')}` }
    })
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function updateSale(props: any) {
  try {
    const response = await axios.patch(`${API_URL}/sale/${props.id}`, props, {
      headers: { Authorization: `Bearer ${cookies.get('access_token')}` }
    })
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function deleteSale(props: any) {
  try {
    const response = await axios.delete(`${API_URL}/sale/${props.id}`, {
      headers: { Authorization: `Bearer ${cookies.get('access_token')}` }
    })
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
