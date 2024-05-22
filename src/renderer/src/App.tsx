// import { Text } from '@chakra-ui/react'
import AuthProvider from '@renderer/contexts/authentication/authentication_provider'
import Routes from '@renderer/routes'

export default function App(): JSX.Element {
  return (
    <AuthProvider>
      <Routes />
      {/* <Text fontFamily={'Lato-Bold'}>Zauvijek |g</Text>
      <Text fontFamily={'Rupee_Foradian'}>Tech Private Limited</Text> */}
    </AuthProvider>
  )
}
