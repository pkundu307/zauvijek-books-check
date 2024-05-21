import {
  Flex,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import AuthLayout from '@renderer/layouts/auth'

export default function SignInEmailView(props: any) {
  const { formState, register, handleSubmit } = props.form
  const { errors } = formState

  return (
    <AuthLayout>
      <Flex direction="column" align="center">
        <Stack direction={'column'} spacing={4} p="1.5rem" width="350px">
          <Text fontWeight={600}>Welcome ! Login here.</Text>

          <form onSubmit={handleSubmit(props.handleSignIn)}>
            <Stack spacing={4} align="flex-start">
              <FormControl isInvalid={!!errors.email}>
                <FormLabel htmlFor="email" fontSize="sm">
                  Email
                </FormLabel>
                <Input fontSize="sm" placeholder="Enter your email id" {...register('email')} />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.password}>
                <FormLabel htmlFor="password" fontSize="sm">
                  Password
                </FormLabel>
                <Input
                  fontSize="sm"
                  placeholder="Enter your password"
                  type="password"
                  {...register('password')}
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>

              <Link to={'/forgot-password'}>
                <Text fontSize="sm" fontWeight={600} color="brand.400">
                  Forgot password ?
                </Text>
              </Link>

              <Button
                type="submit"
                w="100%"
                mt={2}
                colorScheme="brand"
                fontSize="sm"
                isLoading={props.isLoading}
              >
                Login
              </Button>
            </Stack>
          </form>

          {/* <Stack direction={'row'} my={2} align={'center'}>
            <Text fontSize="sm">Do not have an account ?</Text>
            <Link to={'/sign-up'}>
              <Text fontSize="sm" color="brand.600">
                Register here
              </Text>
            </Link>
          </Stack> */}
        </Stack>
      </Flex>
    </AuthLayout>
  )
}
