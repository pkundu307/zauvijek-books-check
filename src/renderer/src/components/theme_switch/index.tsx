import { useColorMode, Flex, IconButton } from '@chakra-ui/react'
import { RiMoonLine, RiSunLine } from 'react-icons/ri'

export default function ThemeSwitch() {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  return (
    <Flex as="button" onClick={toggleColorMode}>
      {isDark ? (
        <IconButton
          aria-label={'Dark'}
          size={'sm'}
          variant={'ghost'}
          icon={<RiMoonLine size="18px" />}
        />
      ) : (
        <IconButton
          aria-label={'Light'}
          size={'sm'}
          variant={'ghost'}
          icon={<RiSunLine size="18px" />}
        />
      )}
    </Flex>
  )
}
