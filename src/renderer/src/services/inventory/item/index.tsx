import axios from 'axios'
import { API_URL } from '../..'
import { cookies } from '@renderer/utils/cookie'

export async function getItems(props: any) {
  try {
    const { business_id, page, take } = props
    const response = await axios.get(
      `${API_URL}/item?business_id=${business_id}&page=${page}&take=${take}`,
      { headers: { Authorization: `Bearer ${cookies.get('access_token')}` } }
    )
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function searchItems(props: any) {
  try {
    const { business_id, item_name } = props
    const response = await axios.get(
      `${API_URL}/item/search?business_id=${business_id}&item_name=${item_name}`,
      { headers: { Authorization: `Bearer ${cookies.get('access_token')}` } }
    )
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function getTotalStockQuantity(props: any) {
  try {
    const { business_id } = props
    const response = await axios.get(`${API_URL}/item/stock-quantity?business_id=${business_id}`, {
      headers: { Authorization: `Bearer ${cookies.get('access_token')}` }
    })
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function getTotalStockValue(props: any) {
  try {
    const { business_id } = props
    const response = await axios.get(`${API_URL}/item/stock-value?business_id=${business_id}`, {
      headers: { Authorization: `Bearer ${cookies.get('access_token')}` }
    })
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function getLowStockCount(props: any) {
  try {
    const { business_id } = props
    const response = await axios.get(`${API_URL}/item/low-stock-count?business_id=${business_id}`, {
      headers: { Authorization: `Bearer ${cookies.get('access_token')}` }
    })
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function getItemById(props: any) {
  try {
    const response = await axios.get(`${API_URL}/item/${props.id}`, {
      headers: { Authorization: `Bearer ${cookies.get('access_token')}` }
    })
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function createItem(props: any) {
  try {
    const response = await axios.post(`${API_URL}/item`, props, {
      headers: { Authorization: `Bearer ${cookies.get('access_token')}` }
    })
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function updateItem(props: any) {
  try {
    const response = await axios.patch(`${API_URL}/item/${props.id}`, props, {
      headers: { Authorization: `Bearer ${cookies.get('access_token')}` }
    })
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function deleteItem(props: any) {
  try {
    const response = await axios.delete(`${API_URL}/item/${props.id}`, {
      headers: { Authorization: `Bearer ${cookies.get('access_token')}` }
    })
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function uploadItemImage(props: any) {
  try {
    const res = await axios.post(`${API_URL}/item/${props?.id}/item-image`, props.formData, {
      headers: { Authorization: `Bearer ${cookies.get('access_token')}` }
    })
    return res?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function uploadCSV(props: any) {
  try {
    const res = await axios.post(`${API_URL}/item/${props?.id}/csv-upload`, props.formData, {
      headers: { Authorization: `Bearer ${cookies.get('access_token')}` }
    })
    return res?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
