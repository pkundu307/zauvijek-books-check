import axios from 'axios'
import { API_URL } from '../../'
import { cookies } from '@renderer/utils/cookie'

// Phone Pe payment intent
export async function createBilling(props: any) {
  try {
    const response = await axios.post(`${API_URL}/billing/pay`, props, {
      headers: { Authorization: `Bearer ${cookies.get('access_token')}` }
    })
    window.open(response?.data)
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function getBillingStatus(props: any) {
  try {
    const { merchant_transaction_id, account_id, billing_id, name, phone_no } = props
    const response = await axios.get(
      `${API_URL}/billing/status?merchant_transaction_id=${merchant_transaction_id}&account_id=${account_id}&billing_id=${billing_id}&name=${name}&phone_no=${phone_no}`,
      { headers: { Authorization: `Bearer ${cookies.get('access_token')}` } }
    )
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
