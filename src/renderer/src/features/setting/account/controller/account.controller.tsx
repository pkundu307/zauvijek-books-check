import AccountView from '../view/account.view'

export default function AccountController(props: any) {
  return <AccountView user={props.user} />
}
