import { Link } from 'react-router-dom'
import {
  Link as ChakraLink,
  Flex,
  Box,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button
} from '@chakra-ui/react'

import AuthLayout from '@renderer/layouts/auth'

export default function SignInEmailView(props: any) {
  const { formState, register, handleSubmit } = props.form
  const { errors } = formState

  return (
    <AuthLayout>
      <Flex direction="column" align="center">
        <Stack direction={'column'} spacing={4} p="1.5rem" width="350px">
          <Text fontWeight={600}>Register and get started.</Text>

          <form onSubmit={handleSubmit(props.handleSignUp)}>
            <Stack spacing={4} align="flex-start">
              <FormControl isInvalid={!!errors.email}>
                <FormLabel htmlFor="name" fontSize="sm">
                  Full Name
                </FormLabel>
                <Input fontSize="sm" placeholder="Enter your name" {...register('name')} />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>

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

              <Box fontSize="sm" my={2}>
                By signing up, you are agreeing with our
                <ChakraLink
                  isExternal
                  href="https://zauvijek.com/policy/terms-of-service"
                  mx="0.3rem"
                  color="brand.400"
                >
                  Terms of Service
                </ChakraLink>
                and
                <ChakraLink
                  isExternal
                  href="https://zauvijek.com/policy/privacy-policy"
                  mx="0.3rem"
                  color="brand.400"
                >
                  Privacy Policy.
                </ChakraLink>
              </Box>

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

          <Stack direction={'row'} my={2} align={'center'}>
            <Text fontSize="sm"> Already have an account ?</Text>
            <Link to={'/sign-in'}>
              <Text fontSize="sm" color="brand.600">
                Login here
              </Text>
            </Link>
          </Stack>
        </Stack>
      </Flex>
    </AuthLayout>
  )
}
