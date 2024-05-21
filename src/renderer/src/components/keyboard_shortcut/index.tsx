import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Kbd,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { FaKeyboard } from 'react-icons/fa'

import useThemeMode from '@renderer/hooks/useThemeMode'

export default function KeyboardShortcuts() {
  const { modeBrand } = useThemeMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button
        size={'xs'}
        variant={'link'}
        color={modeBrand}
        leftIcon={<FaKeyboard fontSize={'14px'} />}
        onClick={onOpen}
      >
        Keyboard Shortcuts
      </Button>

      <Drawer onClose={onClose} isOpen={isOpen} size={'xs'}>
        <DrawerOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Keyboard Shortcuts</DrawerHeader>
          <DrawerBody>
            <Stack my={2} direction={'column'} spacing={4}>
              <Flex justify={'space-between'} align={'center'}>
                <Text fontSize={'sm'}>Create Sales Invoice</Text>
                <Stack direction={'row'}>
                  <Kbd>Alt</Kbd> + <Kbd>q</Kbd>
                </Stack>
              </Flex>
              <Flex justify={'space-between'} align={'center'}>
                <Text fontSize={'sm'}>Create Payment In</Text>
                <Stack direction={'row'}>
                  <Kbd>Alt</Kbd> + <Kbd>a</Kbd>
                </Stack>
              </Flex>
              <Flex justify={'space-between'} align={'center'}>
                <Text fontSize={'sm'}>Create Sales Return</Text>
                <Stack direction={'row'}>
                  <Kbd>Alt</Kbd> + <Kbd>z</Kbd>
                </Stack>
              </Flex>
              <Flex justify={'space-between'} align={'center'}>
                <Text fontSize={'sm'}>Create Quotation</Text>
                <Stack direction={'row'}>
                  <Kbd>Alt</Kbd> + <Kbd>w</Kbd>
                </Stack>
              </Flex>
              <Flex justify={'space-between'} align={'center'}>
                <Text fontSize={'sm'}>Create Proforma Invoice</Text>
                <Stack direction={'row'}>
                  <Kbd>Alt</Kbd> + <Kbd>s</Kbd>
                </Stack>
              </Flex>
              <Flex justify={'space-between'} align={'center'}>
                <Text fontSize={'sm'}>Create Delivery Challan</Text>
                <Stack direction={'row'}>
                  <Kbd>Alt</Kbd> + <Kbd>x</Kbd>
                </Stack>
              </Flex>
              <Flex justify={'space-between'} align={'center'}>
                <Text fontSize={'sm'}>Create Credit Notes</Text>
                <Stack direction={'row'}>
                  <Kbd>Alt</Kbd> + <Kbd>e</Kbd>
                </Stack>
              </Flex>
              <Flex justify={'space-between'} align={'center'}>
                <Text fontSize={'sm'}>Create Sales Order</Text>
                <Stack direction={'row'}>
                  <Kbd>Alt</Kbd> + <Kbd>d</Kbd>
                </Stack>
              </Flex>
            </Stack>
            <Divider my={4} />
            <Stack my={2} direction={'column'} spacing={4}>
              <Flex justify={'space-between'} align={'center'}>
                <Text fontSize={'sm'}>Create Purchase Invoice</Text>
                <Stack direction={'row'}>
                  <Kbd>Alt</Kbd> + <Kbd>c</Kbd>
                </Stack>
              </Flex>
              <Flex justify={'space-between'} align={'center'}>
                <Text fontSize={'sm'}>Create Payment Out</Text>
                <Stack direction={'row'}>
                  <Kbd>Alt</Kbd> + <Kbd>p</Kbd>
                </Stack>
              </Flex>
              <Flex justify={'space-between'} align={'center'}>
                <Text fontSize={'sm'}>Create Purchase Return</Text>
                <Stack direction={'row'}>
                  <Kbd>Alt</Kbd> + <Kbd>l</Kbd>
                </Stack>
              </Flex>
              <Flex justify={'space-between'} align={'center'}>
                <Text fontSize={'sm'}>Create Debit Note</Text>
                <Stack direction={'row'}>
                  <Kbd>Alt</Kbd> + <Kbd>o</Kbd>
                </Stack>
              </Flex>
              <Flex justify={'space-between'} align={'center'}>
                <Text fontSize={'sm'}>Create Purchase Order</Text>
                <Stack direction={'row'}>
                  <Kbd>Alt</Kbd> + <Kbd>k</Kbd>
                </Stack>
              </Flex>
            </Stack>
            <Divider my={4} />
            <Stack my={2} direction={'column'} spacing={4}>
              <Flex justify={'space-between'} align={'center'}>
                <Text fontSize={'sm'}>Save</Text>
                <Stack direction={'row'}>
                  <Kbd>Alt</Kbd> + <Kbd>m</Kbd>
                </Stack>
              </Flex>
              <Flex justify={'space-between'} align={'center'}>
                <Text fontSize={'sm'}>Save & Print</Text>
                <Stack direction={'row'}>
                  <Kbd>Alt</Kbd> + <Kbd>n</Kbd>
                </Stack>
              </Flex>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
