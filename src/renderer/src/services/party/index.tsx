import axios from 'axios'
import { API_URL } from '..'
import { cookies } from '@renderer/utils/cookie'
const services = window.ZauvijekAPI.services

export async function getParties(props: any) {
  try {
    const { business_id } = props
    const response = await services.party.getParties({ business_id })
    return response
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

export async function getPartyById(id: string) {
  try {
    const response = await services.party.getPartyById(id)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function createParty(props: any) {
  try {
    const response = await services.party.createParty({ ...props })
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function updateParty(props: any) {
  try {
    const { id, obj } = props
    const response = await services.party.updateParty(id, { ...obj })
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function deleteParty(id: string) {
  try {
    const response = await services.party.deleteParty(id)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
