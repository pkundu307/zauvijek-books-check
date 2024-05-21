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
const services = window.ZauvijekAPI.services
import AuthLayout from '@renderer/layouts/auth'
import { useForm } from 'react-hook-form'
import { useState } from 'react'


export default function SignInEmailView() {
  const { formState, register } = useForm({ defaultValues: { email: '', password: ''}})
  const [data,setData]=useState('')
  const { errors } = formState
async function handleClick(){
  const res=await services.item.createItem({
    business_id: '654156455',
    item_type: 'abc',
    Item_batching:[{batch_no:'454'}],
    item_serialisation:[{serial_no:'6'}]
    })
    
  console.log(res);
const res1=await services.item.getAll()

  setData(res1.length+'')
  
  
}
  return (
    <AuthLayout>
      <Button onClick={handleClick}>click{data}</Button>
      <Flex direction="column" align="center">
        <Stack direction={'column'} spacing={4} p="1.5rem" width="350px">
          <Text fontWeight={600}>Welcome ! Login here.</Text>

          <form>
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
