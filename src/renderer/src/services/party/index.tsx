import axios from 'axios'
import { API_URL } from '..'
import { cookies } from '@renderer/utils/cookie'

export async function getParties(props: any) {
  try {
    const { business_id, party_type, page, take } = props
    const response = await axios.get(
      `${API_URL}/party?business_id=${business_id}&party_type=${party_type}&page=${page}&take=${take}`,
      { headers: { Authorization: `Bearer ${cookies.get('access_token')}` } }
    )
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function searchParties(props: any) {
  try {
    const { business_id, party_type, party_name } = props
    const response = await axios.get(
      `${API_URL}/party/search?business_id=${business_id}&party_type=${party_type}&party_name=${party_name}`,
      { headers: { Authorization: `Bearer ${cookies.get('access_token')}` } }
    )
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function getPartyById(props: any) {
  try {
    const response = await axios.get(`${API_URL}/party/${props.id}`, {
      headers: { Authorization: `Bearer ${cookies.get('access_token')}` }
    })
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function createParty(props: any) {
  try {
    const response = await axios.post(`${API_URL}/party`, props, {
      headers: { Authorization: `Bearer ${cookies.get('access_token')}` }
    })
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function updateParty(props: any) {
  try {
    const response = await axios.patch(`${API_URL}/party/${props.id}`, props, {
      headers: { Authorization: `Bearer ${cookies.get('access_token')}` }
    })
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function deleteParty(props: { id: string }) {
  try {
    const response = await axios.delete(`${API_URL}/party/${props.id}`, {
      headers: { Authorization: `Bearer ${cookies.get('access_token')}` }
    })
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
