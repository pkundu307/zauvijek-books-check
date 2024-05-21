import * as React from 'react'
import { useToast } from '@chakra-ui/react'
import { cookies } from '@renderer/utils/cookie'
import { useQuery } from '@tanstack/react-query'

import { AuthenticationType } from '@renderer/types/authentication'
import { UserType } from '@renderer/types/user'
import { getUserById } from '@renderer/services/user'
import { signUp, signIn, forgotPassword, resetPassword } from '@renderer/services/authentication'

type AuthProviderType = {
  children: React.ReactNode
}

const maxAge = 60 * 60 * 24 * 60
export const AuthContext = React.createContext<AuthenticationType>(null!)

export default function AuthProvider({ children }: AuthProviderType) {
  /**
   * ----------------------------------------------------------------------
   *  LIBRARY HOOKS START
   *
   */
  const toast = useToast()
  /**
   *
   *  LIBRARY HOOKS END
   * ----------------------------------------------------------------------
   */

  /**
   * ----------------------------------------------------------------------
   *  CUSTOM HOOKS START
   *
   */
  const id: string = cookies.get('user_id')
  /**
   *
   *  CUSTOM HOOKS END
   * ----------------------------------------------------------------------
   */

  /**
   * ----------------------------------------------------------------------
   *  LOCAL STATES START
   *
   */
  const [user, setUser] = React.useState<UserType>()
  const [isLoading, setLoading] = React.useState<boolean>(true)

  /**
   *
   *  LOCAL STATES END
   * ----------------------------------------------------------------------
   */

  /**
   * ----------------------------------------------------------------------
   *  REACT QUERY START
   *
   */
  const { isLoading: userFetching, data } = useQuery({
    queryKey: ['getUserById', id],
    queryFn: () => getUserById(id),
    retry: 0
  })
  /**
   *
   *  REACT QUERY END
   * ----------------------------------------------------------------------
   */

  /**
   * ----------------------------------------------------------------------
   *  LOCAL EFFECTS START
   *
   */

  React.useEffect(() => {
    function checkUser() {
      if (userFetching === false) {
        setLoading(false)
        if (data && id) {
          setUser(data)
        } else {
          setUser(undefined)
        }
      }
    }
    checkUser()
  }, [data, id, userFetching])
  /**
   *
   *  LOCAL EFFECTS END
   * ----------------------------------------------------------------------
   */

  /**
   * ----------------------------------------------------------------------
   *  HANDLER FUNCTIONS START
   *
   */

  async function userSignUp(value: UserType, callback: VoidFunction) {
    try {
      const { message } = await signUp(value)

      if (message === 'success') {
        toast({
          title: 'Registration Successfull !',
          description: 'Now, login to access your account',
          status: 'success',
          duration: 1500,
          position: 'top'
        })
        callback()
      }
    } catch (error: any) {
      toast({
        title: 'Registration Failed!',
        description: error?.message,
        status: 'error',
        duration: 1500,
        position: 'top'
      })
    }
  }

  async function userSignIn(value: UserType, callback: VoidFunction) {
    try {
      const { user, access_token, refresh_token } = await signIn(value)

      if (user) {
        setUser(user)
        cookies.set('user_id', user?.id, { maxAge })
        cookies.set('access_token', access_token, { maxAge })
        cookies.set('refresh_token', refresh_token, { maxAge })

        toast({
          title: 'Login success!',
          status: 'success',
          duration: 1500,
          position: 'top'
        })
        callback()
      }
    } catch (error: any) {
      toast({
        description: error.message,
        status: 'error',
        duration: 1500,
        position: 'top'
      })
    }
  }

  async function userSignOut(callback: VoidFunction) {
    // const refreshToken: Token = cookies.get('refresh_token')

    try {
      // await logout(refreshToken)
      cookies.set('access_token', undefined)
      cookies.set('user_id', undefined)
      setUser(undefined)
      callback()
    } catch (error: any) {
      console.log('')
    }
  }

  async function userForgotPassword(value: any, callback: VoidFunction) {
    try {
      const { status } = await forgotPassword(value)

      if (status === 201) {
        toast({
          title: 'Email Sent Successfully !',
          description: 'Check your email to reset password.',
          status: 'success',
          duration: 1500,
          position: 'top'
        })
        callback()
      }
    } catch (error: any) {
      toast({
        title: 'Error!',
        description: error.message,
        status: 'error',
        duration: 1500,
        position: 'top'
      })
    }
  }

  async function userResetPassword(value: string, jwtToken: string, callback: VoidFunction) {
    try {
      const { status } = await resetPassword({ password: value }, jwtToken)

      if (status === 201) {
        toast({
          title: 'Password Reset Successfull !',
          description: 'Login to access your account.',
          status: 'success',
          duration: 1500,
          position: 'top'
        })
        callback()
      }
    } catch (error: any) {
      toast({
        title: 'Error!',
        description: error.message,
        status: 'error',
        duration: 1500,
        position: 'top'
      })
    }
  }

  /**
   *
   *  HANDLER FUNCTIONS END
   * ----------------------------------------------------------------------
   */

  const value = {
    user,
    isLoading,
    userSignUp,
    userSignIn,
    userSignOut,
    userForgotPassword,
    userResetPassword
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
