import * as React from 'react'
import { AuthContext } from '@renderer/contexts/authentication/auth_provider'

export function useAuthentication() {
  return React.useContext(AuthContext)
}
