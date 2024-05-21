import { RiCheckboxCircleLine, RiCloseCircleLine } from 'react-icons/ri'
import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'

import useThemeMode from '@renderer/hooks/useThemeMode'

export default function ModalBox(props: any) {
  const { mode10, mode20, mode30 } = useThemeMode()
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered size="lg">
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader
          px={4}
          py={3}
          h="47px"
          bg={mode20}
          fontSize={'sm'}
          border="1px solid"
          alignItems="center"
          borderColor={mode30}
        >
          {props.title}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody p={0} bg={mode10}>
          {props.children}
        </ModalBody>

        <ModalFooter
          px={4}
          h="47px"
          fontSize="sm"
          bg={mode20}
          border="1px solid"
          borderColor={mode30}
        >
          <ButtonGroup size="sm" spacing={4}>
            <Button
              px={4}
              color="red.400"
              colorScheme="gray"
              leftIcon={<RiCloseCircleLine />}
              onClick={props.onClose}
            >
              Cancel
            </Button>
            <Button
              px={4}
              colorScheme="brand"
              leftIcon={<RiCheckboxCircleLine />}
              onClick={props.onDone}
            >
              Done
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
