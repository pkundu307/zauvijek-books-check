import { useNavigate, useLocation } from 'react-router-dom'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import SignInEmailView from '@renderer/features/authentication/views/email/sign_in/sign_in.email.view'
import { useAuthentication } from '@renderer/hooks/useAuthentication'
import { UserType } from '@renderer/features/authentication/types'

const defaultValues = {
  email: '',
  password: ''
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required()
})

export default function SignInEmailController() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isLoading, userSignIn } = useAuthentication()

  const state = location.state as any
  const from = state?.from?.pathname || '/'

  const form = useForm<UserType>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const handleSignIn = (value: UserType) => {
    userSignIn(value, () => navigate(from, { replace: true }))
  }

  return <SignInEmailView isLoading={isLoading} form={form} handleSignIn={handleSignIn} />
}
