import axios from 'axios'
import { API_URL } from '..'
import { TokenType } from '@renderer/types/authentication'
import { UserType } from '@renderer/types/user'

export async function signUp(props: UserType) {
  try {
    const response = await axios.post(`${API_URL}/auth/email-sign-up`, props)
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function signIn(props: UserType) {
  try {
    const response = await axios.post(`${API_URL}/auth/email-sign-in`, props, {
      withCredentials: true
    })
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function signOut(refreshToken: TokenType) {
  try {
    const response = await axios.post(`${API_URL}/auth/logout`, refreshToken)
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function forgotPassword(props: UserType) {
  try {
    const response = await axios.post(`${API_URL}/auth/forgot-password`, props)
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function resetPassword(props: any, jwtToken: string) {
  try {
    const response = await axios.post(`${API_URL}/auth/reset-password?token=${jwtToken}`, props)
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function sendVerificationEmail(props: UserType) {
  try {
    const response = await axios.post(`${API_URL}/auth/send-verification-email`, props)
    return response?.data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
