import { useNavigate } from 'react-router-dom'
import { Avatar, Flex, Menu, MenuButton, MenuItem, MenuList, Stack } from '@chakra-ui/react'
import { RiLogoutBoxLine } from 'react-icons/ri'

import ThemeSwitch from '@renderer/components/theme_switch'
import useThemeMode from '@renderer/hooks/useThemeMode'
import Notification from '@renderer/components/notification'
import Brand from '@renderer/components/brand'
import { useAuthentication } from '@renderer/hooks/useAuthentication'

export default function Header() {
  const navigate = useNavigate()

  const { mode30, mode40 } = useThemeMode()
  const { userSignOut } = useAuthentication()

  function handleSignOut() {
    userSignOut(() => navigate('/sign-in'))
  }

  return (
    <Flex
      minH={'48px'}
      px={4}
      direction="row"
      justify={'space-between'}
      align={'center'}
      borderBottom={'1px solid'}
      borderColor={mode30}
    >
      <Flex px={4}>
        <Brand />
      </Flex>
      <Flex>
        <Stack direction={'row'} spacing={4}>
          <Notification />
          <ThemeSwitch />
          <Menu>
            <MenuButton>
              <Avatar src="" size="sm" bg={mode40} />
            </MenuButton>
            <MenuList>
              <MenuItem
                icon={<RiLogoutBoxLine size={'14px'} />}
                fontSize={'sm'}
                onClick={() => handleSignOut()}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Flex>
    </Flex>
  )
}
