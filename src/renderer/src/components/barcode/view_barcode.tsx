import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Text,
  Stack
} from '@chakra-ui/react'
import { RiQrScan2Line } from 'react-icons/ri'

import useThemeMode from '@renderer/hooks/useThemeMode'
import Barcode from './'
import GenrateImage from '../generate_image'
import { parseCurrency } from '@renderer/utils/parse_currency'

export function ViewBarcode({ selling_price, mrp, item_code }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { modeBrand, mode10, mode30, mode20 } = useThemeMode()

  return (
    <>
      <Button
        w={'50%'}
        px={6}
        size={'sm'}
        rounded={0}
        color={modeBrand}
        leftIcon={<RiQrScan2Line />}
        onClick={onOpen}
      >
        View Barcode
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader
            px={4}
            py={3}
            h={'47px'}
            alignItems={'center'}
            fontSize={'sm'}
            bg={mode20}
            border="1px solid"
            borderColor={mode30}
          >
            Barcode
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody p={4} bg={mode10}>
            <GenrateImage>
              <Flex direction={'column'} p={4} align={'center'} bg={'#fff'} color={'#000'}>
                {item_code && <Barcode value={item_code} />}
                <Stack direction={'row'} spacing={4}>
                  {selling_price && selling_price !== 0 && (
                    <Text fontWeight={600} fontSize={'xs'}>
                      Selling Price: {parseCurrency(selling_price)}
                    </Text>
                  )}
                  {mrp && mrp !== 0 && (
                    <Text fontWeight={600} fontSize={'xs'}>
                      MRP: {parseCurrency(mrp)}
                    </Text>
                  )}
                </Stack>
              </Flex>
            </GenrateImage>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
