import { useColorMode, Image } from '@chakra-ui/react'

import Logo from '@renderer/assets/image/zauvijek-books-logo.svg'
import LogoAlt from '@renderer/assets/image/zauvijek-books-logo-alt.svg'

export default function Brand() {
  const { colorMode } = useColorMode()
  return <Image src={colorMode === 'light' ? Logo : LogoAlt} w={160} alt="Zauvijek Books" />
}
