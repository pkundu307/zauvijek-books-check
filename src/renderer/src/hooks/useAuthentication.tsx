import React from 'react'
import { AuthContext } from '@renderer/contexts/authentication/authentication_provider'

export function useAuthentication() {
  return React.useContext(AuthContext)
}
