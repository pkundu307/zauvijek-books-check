import React from "react";

// import { AuthenticationType } from '@renderer/types/authentication'
import { UserType } from "@renderer/types/user";
// import { cookies } from '@renderer/utils/cookie'
import { useToast } from "@chakra-ui/react";
// import { getMachineIdAsync } from '@renderer/components/machine_id'

export const AuthContext = React.createContext<any>(null!);

export default function AuthenticationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const authService = window.ZauvijekAPI.services.auth
  // const userService = window.ZauvijekAPI.services.user
  const machineId = window.ZauvijekAPI.services.getMachineIdSync();

  /**
   * ----------------------------------------------------------------------
   *  LIBRARY HOOKS START
   *
   */
  const toast = useToast();
  /**
   *
   *  LIBRARY HOOKS END
   * ----------------------------------------------------------------------
   */

  /**
   * ----------------------------------------------------------------------
   *  LOCAL STATES START
   *
   */
  const [user, setUser] = React.useState<any>();
  const [isLoading] = React.useState<boolean>(true);
  console.log("machine id", machineId);

  /**
   *
   *  LOCAL STATES END
   * ----------------------------------------------------------------------
   */

  /**
   * ----------------------------------------------------------------------
   *  CUSTOM HOOKS START
   *
   */
  // const id: string = cookies.get('user_id')
  /**
   *
   *  CUSTOM HOOKS END
   * ----------------------------------------------------------------------
   */

  /**
   * ----------------------------------------------------------------------
   *  LOCAL EFFECTS START
   *
   */

  // React.useEffect(() => {
  //   async function checkUser() {
  //     const userData = await userService.getUserById(id)
  //     setLoading(false)
  //     if (userData && id) {
  //       setUser(userData)
  //     } else {
  //       setUser(undefined)
  //     }
  //   }
  //   checkUser()
  // }, [id])
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

  // async function userSignUp(value: UserType, callback: VoidFunction) {
  //   try {
  //     const { message } = await authService.signUp(value)

  //     if (message === 'success') {
  //       toast({
  //         title: 'Registration Successful.',
  //         description: 'Login to access your account.',
  //         status: 'success'
  //       })
  //       callback()
  //     }
  //   } catch (error: any) {
  //     toast({
  //       title: 'Registration Failed.',
  //       description: error?.message,
  //       status: 'error'
  //     })
  //   }
  // }

  async function userSignIn(_value: UserType, callback: VoidFunction) {
    try {
      // const machine_id = await authService.userSignIn()

      if (user) {
        setUser(user);

        toast({
          description: "Login success.",
          status: "success",
        });
        callback();
      }
    } catch (error: any) {
      toast({
        description: error.message,
        status: "error",
      });
    }
  }

  // async function userSignOut(callback: VoidFunction) {
  //   try {
  //     cookies.set('access_token', undefined)
  //     cookies.set('user_id', undefined)
  //     setUser(undefined)
  //     callback()
  //   } catch (error: any) {
  //     /* empty */
  //   }
  // }

  // async function userForgotPassword(value: any, callback: VoidFunction) {
  //   try {
  //     const { status } = await authService.forgotPassword(value)

  //     if (status === 201) {
  //       toast({
  //         title: 'Email Sent Successfully.',
  //         description: 'Check your email to reset password.',
  //         status: 'success'
  //       })
  //       callback()
  //     }
  //   } catch (error: any) {
  //     toast({
  //       description: error.message,
  //       status: 'error'
  //     })
  //   }
  // }

  // async function userResetPassword(value: string, jwtToken: string, callback: VoidFunction) {
  //   try {
  //     const { status } = await authService.resetPassword({ password: value }, jwtToken)

  //     if (status === 201) {
  //       toast({
  //         title: 'Password Reset Successful.',
  //         description: 'Login to access your account.',
  //         status: 'success'
  //       })
  //       callback()
  //     }
  //   } catch (error: any) {
  //     toast({
  //       description: error.message,
  //       status: 'error'
  //     })
  //   }
  // }

  /**
   *
   *  HANDLER FUNCTIONS END
   * ----------------------------------------------------------------------
   */
  const value = {
    user,
    isLoading,
    // userSignUp,
    userSignIn,
    // userSignOut,
    // userForgotPassword,
    // userResetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
