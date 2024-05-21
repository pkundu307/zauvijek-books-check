import { Flex, Spinner, Stack, Text } from '@chakra-ui/react'
import useThemeMode from '@renderer/hooks/useThemeMode'

type LoadingPropTypes = {
  title?: string
  subtitle?: string
}

export default function Loading({ title, subtitle }: LoadingPropTypes) {
  const { modeBrand } = useThemeMode()
  return (
    <Flex m={6} h="100vh" justify="center" align="center">
      <Stack direction="column" spacing={4} align="center">
        <Spinner size={'lg'} color={modeBrand} />
        <Text fontSize={'md'}>{title || 'Zauvijek Books: No.1 Business Software'}</Text>
        <Text fontSize={'sm'}>{subtitle}</Text>
      </Stack>
    </Flex>
  )
}
