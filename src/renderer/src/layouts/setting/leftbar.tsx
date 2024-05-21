import * as React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Badge, Box, Button, Divider, Flex, Stack, Text } from '@chakra-ui/react'
import {
  RiArrowLeftLine,
  RiBankCardLine,
  RiBarcodeBoxLine,
  RiBuildingLine,
  RiFileSettingsLine,
  RiGiftLine,
  RiListSettingsLine,
  RiLock2Line,
  RiNotification2Line,
  RiTeamLine,
  RiUser3Line,
  RiVipCrown2Line
} from 'react-icons/ri'

import useThemeMode from '@renderer/hooks/useThemeMode'
import Brand from '@renderer/components/brand'

type CustomMenuPropTypes = {
  title: string
  path: string
  badgeTitle?: string
  isActive?: boolean
  icon?: React.ReactNode
}

export default function Leftbar() {
  const { pathname } = useLocation()
  const { mode20, mode30, modeBrand } = useThemeMode()

  return (
    <Flex direction={'column'} justify={'space-between'} maxH={'100vh'} overflowY={'scroll'}>
      <Flex flex={1} direction={'column'}>
        <Flex h={'48px'} px={4}>
          <Brand />
        </Flex>

        <Box color={modeBrand} borderBottom="1px solid" borderColor={mode30}>
          <CustomMenu title="Go to Dashboard" path="/" icon={<RiArrowLeftLine />} />
        </Box>
        <CustomMenu
          title="Account"
          path="/setting/account"
          icon={<RiUser3Line />}
          isActive={pathname === '/setting/account'}
        />
        <CustomMenu
          title="Billing"
          path="/setting/billing"
          icon={<RiBankCardLine />}
          isActive={pathname === '/setting/billing'}
        />
        <CustomMenu
          title="Security"
          path="/setting/security"
          icon={<RiLock2Line />}
          isActive={pathname === '/setting/security'}
        />
        <Divider my={1} />
        <CustomMenu
          title="Manage Business"
          path="/setting/businesses"
          icon={<RiBuildingLine />}
          isActive={pathname === '/setting/businesses'}
        />
        <CustomMenu
          title="Manage Employee"
          path="/setting/employees"
          icon={<RiTeamLine />}
          isActive={pathname === '/setting/employees'}
        />
        <Divider my={1} />
        <CustomMenu
          title="General"
          path="/setting/general"
          icon={<RiListSettingsLine />}
          isActive={pathname === '/setting/general'}
        />
        <CustomMenu
          title="Barcode"
          path="/setting/barcode"
          icon={<RiBarcodeBoxLine />}
          isActive={pathname === '/setting/barcode'}
        />
        <CustomMenu
          title="Customise Invoice"
          path="/setting/invoice"
          icon={<RiFileSettingsLine />}
          isActive={pathname === '/setting/invoice'}
        />
        <CustomMenu
          title="Manage Notification"
          path="/setting/notification"
          icon={<RiNotification2Line />}
          isActive={pathname === '/setting/notification'}
        />
        <Divider my={1} />

        <CustomMenu
          title="Refer & Earn"
          path="/setting/refer-earn"
          icon={<RiGiftLine />}
          isActive={pathname === '/setting/refer-earn'}
        />
      </Flex>
      <Flex position={'absolute'} bottom={0} w={220} direction={'column'}>
        <Stack spacing={0}>
          <Flex
            px={4}
            minH={'36px'}
            fontSize={'sm'}
            align={'center'}
            justify={'space-between'}
            bg={mode20}
          >
            <Text fontSize={'sm'}>Trial period:</Text>
            <Text fontWeight={600} color={'#EE4B2B'}>
              5 days Left
            </Text>
          </Flex>
          <Flex minH={'36px'} align={'center'}>
            <Button
              px={4}
              w={'100%'}
              size={'sm'}
              rounded={0}
              minH={'36px'}
              colorScheme={'yellow'}
              leftIcon={<RiVipCrown2Line />}
            >
              Buy Premium Plan
            </Button>
          </Flex>
        </Stack>
      </Flex>
    </Flex>
  )
}

function CustomMenu({ title, path, badgeTitle, isActive, icon }: CustomMenuPropTypes) {
  const { mode30, mode80 } = useThemeMode()
  return (
    <Link to={path}>
      <Flex
        flex={1}
        px={4}
        minH={'36px'}
        align={'center'}
        bg={isActive ? mode30 : 'none'}
        borderRight={isActive ? '2px solid' : 'none'}
        borderColor={isActive ? 'brand.400' : 'none'}
        _hover={{
          bg: mode30,
          color: mode80
        }}
      >
        <Flex color={'brand.400'}>{icon}</Flex>
        <Flex w={'100%'} justify={'space-between'} align={'center'}>
          <Text mx={2} fontSize="sm">
            {title}
          </Text>
          {badgeTitle && (
            <Badge colorScheme={'orange'} fontSize={'xx-small'}>
              {badgeTitle}
            </Badge>
          )}
        </Flex>
      </Flex>
    </Link>
  )
}
