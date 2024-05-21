import { Link } from 'react-router-dom'
import { Button, Link as ChakraLink, Flex, Stack, Text } from '@chakra-ui/react'
import { RiHeadphoneLine, RiShieldLine, RiWhatsappLine } from 'react-icons/ri'

import KeyboardShortcuts from '@renderer/components/keyboard_shortcut'
import useThemeMode from '@renderer/hooks/useThemeMode'

export default function Footer() {
  const date = new Date()
  const { mode30, modeBrand } = useThemeMode()
  return (
    <Flex
      minH={'36px'}
      px={4}
      direction="row"
      justify={'space-between'}
      align={'center'}
      borderTop={'1px solid'}
      borderColor={mode30}
    >
      <Stack direction={'row'} spacing={4}>
        <Text fontSize="xs">
          &copy; 2023-{date.getFullYear()} Zauvijek Tech Pvt. Ltd. All Rights Reserved
        </Text>
        <Text fontSize={'xs'}>|</Text>
        <Stack direction={'row'} spacing={1} align={'center'}>
          <RiShieldLine color="#21C35E" />
          <Text fontSize={'xs'}>100% Secure</Text>
        </Stack>
      </Stack>

      <Stack direction={'row'} spacing={4} align={'center'}>
        <ChakraLink href={'https://wa.me/9304887263'} target={'_blank'}>
          <Button
            size={'xs'}
            variant={'link'}
            colorScheme={'whatsapp'}
            leftIcon={<RiWhatsappLine />}
          >
            +91-9304887263
          </Button>
        </ChakraLink>
        <Text fontSize={'xs'}>|</Text>
        <Link to={'/chat-support'}>
          <Button size={'xs'} variant={'link'} color={modeBrand} leftIcon={<RiHeadphoneLine />}>
            Help and Support
          </Button>
        </Link>
        <Text fontSize={'xs'}>|</Text>
        <KeyboardShortcuts />
      </Stack>
    </Flex>
  )
}
