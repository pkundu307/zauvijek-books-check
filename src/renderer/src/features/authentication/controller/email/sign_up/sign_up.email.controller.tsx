import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import SignUpEmailView from '@renderer/features/authentication/views/email/sign_up/sign_up.email.view'
import { useAuthentication } from '@renderer/hooks/useAuthentication'
import { UserType } from '@renderer/features/authentication/types'

const defaultValues = {
  name: '',
  email: '',
  password: ''
}

const schema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required()
})

export default function SignUpEmailController() {
  const navigate = useNavigate()
  const { isLoading, userSignUp } = useAuthentication()

  const form = useForm<UserType>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const handleSignUp = (value: UserType) => {
    userSignUp(value, () => navigate('/sign-in'))
  }

  return <SignUpEmailView isLoading={isLoading} form={form} handleSignUp={handleSignUp} />
}
