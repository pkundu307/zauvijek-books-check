import axios from 'axios'
import { API_URL } from '..'
import { cookies } from '@renderer/utils/cookie'

export async function userOnboarding(props: any) {
  try {
    const response = await axios.post(`${API_URL}/user-onboarding`, props, {
      headers: { Authorization: `Bearer ${cookies.get('access_token')}` }
    })
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
