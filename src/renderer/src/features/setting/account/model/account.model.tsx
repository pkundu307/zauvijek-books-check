import { useAuthentication } from '@renderer/hooks/useAuthentication'
import AccountController from '../controller/account.controller'

export default function AccountModel() {
  const { user } = useAuthentication()
  return <AccountController user={user} />
}
