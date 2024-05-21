import { customAlphabet } from 'nanoid'
import { RiQrScan2Line } from 'react-icons/ri'
import { Button } from '@chakra-ui/react'

import useThemeMode from '@renderer/hooks/useThemeMode'

const nanoid = customAlphabet('1234567890', 13)

export function GenerateBarcode({ getBacodeValue }: any) {
  const { modeBrand } = useThemeMode()

  function handleBarcode() {
    const barcode = nanoid()
    getBacodeValue(barcode)
  }

  return (
    <Button
      w={'50%'}
      px={6}
      size={'sm'}
      rounded={0}
      color={modeBrand}
      leftIcon={<RiQrScan2Line />}
      onClick={handleBarcode}
    >
      Generate Barcode
    </Button>
  )
}
