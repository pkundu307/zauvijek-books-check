import { Controller } from 'react-hook-form'
import {
  Stack,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Flex
} from '@chakra-ui/react'

import { BUSINESS_TYPES } from '@renderer/constants/business_types'
import { INDUSTRY_TYPES } from '@renderer/constants/industry_types'
import { INCORPORATION_TYPES } from '@renderer/constants/incorporation_types'

import useThemeMode from '@renderer/hooks/useThemeMode'
import Layout from '@renderer/layouts/default'
import DownshiftSelectString from '@renderer/components/downshift_select_string'

export default function OnboardView(props: any) {
  const { mode60 } = useThemeMode()

  const { formState, control, handleSubmit } = props.form
  const { errors } = formState

  return (
    <Layout>
      <Flex p={6} w={'100%'} maxH={'90vh'} justify={'center'} align={'center'} overflowY={'scroll'}>
        <form onSubmit={handleSubmit(props.handleOnboard)}>
          <Stack w="300px" spacing={8}>
            <Text fontSize={'lg'} fontWeight={'bold'}>
              Create a business
            </Text>

            <FormControl isInvalid={!!errors.referral_code}>
              <FormLabel fontSize="sm">
                Business Name <span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <Controller
                control={control}
                name="business_name"
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input
                    type="text"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder="Enter your business name"
                    size="sm"
                  />
                )}
              />
              <FormErrorMessage>{errors.business_name?.message}</FormErrorMessage>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="business_type" fontSize="sm" fontWeight={600} color={mode60}>
                Business Type <span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <Controller
                name="business_type"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <DownshiftSelectString
                      items={BUSINESS_TYPES}
                      value={value}
                      onChange={onChange}
                    />
                  )
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="incorporation_type" fontSize="sm" fontWeight={600} color={mode60}>
                Business Incorporation Type <span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <Controller
                name="incorporation_type"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <DownshiftSelectString
                      items={INCORPORATION_TYPES}
                      value={value}
                      onChange={onChange}
                    />
                  )
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="industry_type" fontSize="sm" fontWeight={600} color={mode60}>
                Business Industry Type <span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <Controller
                name="industry_type"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <DownshiftSelectString
                      items={INDUSTRY_TYPES}
                      value={value}
                      onChange={onChange}
                    />
                  )
                }}
              />
            </FormControl>

            <FormControl isInvalid={!!errors.referral_code}>
              <FormLabel fontSize="sm">Referral Code</FormLabel>
              <Controller
                control={control}
                name="referral_code"
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input
                    type="text"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder="Enter referral code"
                    size="sm"
                  />
                )}
              />
              <FormErrorMessage>{errors.referral_code?.message}</FormErrorMessage>
            </FormControl>

            <Button mt={4} colorScheme="brand" fontSize="sm" type="submit">
              Submit
            </Button>
          </Stack>
        </form>
      </Flex>
    </Layout>
  )
}
