import axios from 'axios'
import { API_URL } from '..'
import { cookies } from '@renderer/utils/cookie'
import { UserType } from '@renderer/types/user'

export async function getUsers(props: any) {
  try {
    const { business_id, page, take } = props
    const response = await axios.get(
      `${API_URL}/user?business_id=${business_id}&page=${page}&take=${take}`,
      { headers: { Authorization: `Bearer ${cookies.get('access_token')}` } }
    )
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function getUserById(id?: string) {
  try {
    const response = await axios.get(`${API_URL}/user/${id}`, {
      headers: { Authorization: `Bearer ${cookies.get('access_token')}` }
    })
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function updateUser(props: any) {
  try {
    const response = await axios.patch(`${API_URL}/user/${props.id}`, props, {
      headers: { Authorization: `Bearer ${cookies.get('access_token')}` }
    })
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function deleteUser(props: UserType) {
  try {
    const response = await axios.delete(`${API_URL}/user/${props.id}`, {
      headers: { Authorization: `Bearer ${cookies.get('access_token')}` }
    })
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
