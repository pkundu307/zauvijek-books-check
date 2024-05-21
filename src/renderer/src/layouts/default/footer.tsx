import { Flex, Text } from '@chakra-ui/react'
import useThemeMode from '@renderer/hooks/useThemeMode'

export default function Footer() {
  const date = new Date()
  const { mode30 } = useThemeMode()
  return (
    <Flex
      minH={'36px'}
      px={4}
      direction="row"
      justify={'center'}
      align={'center'}
      borderTop={'1px solid'}
      borderColor={mode30}
    >
      <Text fontSize="xs">
        &copy; 2023-{date.getFullYear()} Zauvijek Tech Pvt. Ltd. All Rights Reserved
      </Text>
    </Flex>
  )
}
