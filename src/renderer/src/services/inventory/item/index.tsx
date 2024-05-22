import axios from 'axios'
import { API_URL } from '../..'
import { cookies } from '@renderer/utils/cookie'
const services = window.ZauvijekAPI.services

export async function getItems(props: any) {
  try {
    const { business_id } = props
    const response = await services.item.getItems({ business_id })
    return response
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

export async function getItemById(id: string) {
  try {
    const response = await services.item.getItemById(id)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function createItem(props: any) {
  try {
    const response = await services.item.createItem({ ...props })
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function updateItem(id: string, props: any) {
  try {
    const response = await services.item.updateItem(id, { ...props })
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function deleteItem(id: string) {
  try {
    const response = await services.item.deleteItem(id)
    return response
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
