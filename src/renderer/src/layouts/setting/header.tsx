/* eslint-disable no-constant-condition */
import { Link, useNavigate } from 'react-router-dom'
import {
  Avatar,
  Flex,
  FormControl,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack
} from '@chakra-ui/react'
import {
  RiInformationLine,
  RiLogoutBoxLine,
  RiMenuFoldLine,
  RiMenuUnfoldLine,
  RiQuestionLine,
  RiStore2Line,
  RiYoutubeLine
} from 'react-icons/ri'

import ThemeSwitch from '@renderer/components/theme_switch'
import useThemeMode from '@renderer/hooks/useThemeMode'
import Notification from '@renderer/components/notification'
import { useAuthentication } from '@renderer/hooks/useAuthentication'
import DownshiftSelect from '@renderer/components/downshift_select'

type HeaderPropTypes = {
  isLeftbarVisible: boolean
  handleLeftbar: (value: boolean) => void
}

export default function Header(props: HeaderPropTypes) {
  const navigate = useNavigate()

  const { mode30 } = useThemeMode()
  const { userSignOut } = useAuthentication()

  function handleSignOut() {
    userSignOut(() => navigate('/sign-in'))
  }

  return (
    <Flex
      px={4}
      minH={'48px'}
      direction="row"
      justify={'space-between'}
      align={'center'}
      borderBottom={'1px solid'}
      borderColor={mode30}
    >
      <Flex>
        <Stack direction={'row'} align={'center'} spacing={4}>
          <Flex>
            {props?.isLeftbarVisible ? (
              <IconButton
                aria-label={''}
                size={'sm'}
                rounded={0}
                variant={'outline'}
                icon={<RiMenuFoldLine size="20px" />}
                onClick={() => props.handleLeftbar(false)}
              />
            ) : (
              <IconButton
                aria-label={''}
                size={'sm'}
                rounded={0}
                variant={'outline'}
                icon={<RiMenuUnfoldLine size="20px" />}
                onClick={() => props.handleLeftbar(true)}
              />
            )}
          </Flex>
          {false ? (
            <Image src={''} h={'24px'} rounded={'sm'} />
          ) : (
            <Avatar icon={<RiStore2Line />} size="sm" rounded={'sm'} />
          )}

          <FormControl w="220px">
            <DownshiftSelect
              items={[{ title: 'Zauvijek Tech Pvt. Ltd.' }]}
              value={'Gada Electronics'}
            />
          </FormControl>
        </Stack>
      </Flex>

      <Flex>
        <Stack direction={'row'} spacing={4}>
          <Notification />
          <ThemeSwitch />
          <Menu>
            <MenuButton>
              <Avatar
                src="https://st1.bollywoodlife.com/wp-content/uploads/2020/05/Jethalal-Dilip-Joshi-.jpg"
                size="sm"
              />
            </MenuButton>
            <MenuList fontSize={'sm'} rounded={0} zIndex={3}>
              <Link to="/video-tutorial">
                <MenuItem icon={<RiYoutubeLine size="18px" />}>Video Tutorial</MenuItem>
              </Link>
              <Link to="/help">
                <MenuItem icon={<RiQuestionLine size="18px" />}>Help</MenuItem>
              </Link>
              <Link to="/about">
                <MenuItem icon={<RiInformationLine size="18px" />}>About</MenuItem>
              </Link>
              <MenuDivider />
              <MenuItem icon={<RiLogoutBoxLine size={'18px'} />} onClick={() => handleSignOut()}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Flex>
    </Flex>
  )
}
