import * as React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Button,
  Divider,
  Flex,
  Menu,
  MenuItem,
  Stack,
  Text
} from '@chakra-ui/react'
import {
  RiBankCardLine,
  RiBankLine,
  RiBarChart2Line,
  RiBox3Line,
  RiCheckboxBlankCircleLine,
  RiDashboardLine,
  RiExchangeFundsLine,
  RiFundsLine,
  RiGroup2Line,
  RiSettings4Line,
  RiShieldFlashLine,
  RiShoppingCart2Line,
  RiStackLine,
  RiStore2Line,
  RiTruckLine,
  RiVipCrown2Line
} from 'react-icons/ri'

import useThemeMode from '@renderer/hooks/useThemeMode'
import Brand from '@renderer/components/brand'

type CustomMenuPropTypes = {
  title: string
  path: string
  badgeTitle?: string
  isActive: boolean
  icon?: React.ReactNode
}

type CustomMenuItemPropTypes = {
  title: string
  path: string
  isActive: boolean
}

export default function Leftbar() {
  const { pathname } = useLocation()

  const { mode20, mode30, mode80 } = useThemeMode()
  const [cookies, setCookie] = useCookies(['index'])

  const path = pathname.split('/')

  function onAccordianExpand(index: number) {
    setCookie('index', index, { path: '/' })
  }

  return (
    <Flex direction={'column'} justify={'space-between'} maxH={'100vh'} overflowY={'scroll'}>
      <Flex direction={'column'} py={46}>
        <Flex h={'46px'} px={4} position={'absolute'} top={0} w={'220px'} bg={mode20} zIndex={2}>
          <Brand />
        </Flex>

        <CustomMenu
          title="Dashboard"
          path="/"
          icon={<RiDashboardLine size={'16px'} />}
          isActive={path[1] === ''}
        />

        <Accordion
          allowToggle
          flex={1}
          fontSize="sm"
          index={parseInt(cookies?.index)}
          onChange={onAccordianExpand}
        >
          <AccordionItem border={'0px'}>
            <AccordionButton
              py={0}
              _hover={{
                bg: mode30,
                color: mode80
              }}
            >
              <Flex flex={1} minH={'36px'} align={'center'}>
                <Flex mr={2} color={'brand.500'}>
                  <RiGroup2Line size={'16px'} />
                </Flex>
                <Text fontSize={'sm'}>Parties</Text>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel p={0} pl={3}>
              <Menu>
                <CustomMenuItem
                  title="Customers"
                  path="/customer"
                  isActive={path[1] === 'customer'}
                />
                <CustomMenuItem
                  title="Suppliers"
                  path="/supplier"
                  isActive={path[1] === 'supplier'}
                />
              </Menu>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem border={'0px'}>
            <AccordionButton
              py={0}
              _hover={{
                bg: mode30,
                color: mode80
              }}
            >
              <Flex flex={1} minH={'36px'} align={'center'}>
                <Flex mr={2} color={'brand.500'}>
                  <RiBox3Line size={'16px'} />
                </Flex>
                <Text fontSize={'sm'}>Inventory</Text>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel p={0} pl={3}>
              <Menu>
                <CustomMenuItem title="Items" path="/item" isActive={path[1] === 'item'} />
                <CustomMenuItem
                  title="Godown | Warehouse"
                  path="/godown-warehouse"
                  isActive={path[1] === 'godown-warehouse'}
                />
              </Menu>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem border={'0px'}>
            <AccordionButton
              py={0}
              _hover={{
                bg: mode30,
                color: mode80
              }}
            >
              <Flex flex={1} minH={'36px'} align={'center'}>
                <Flex mr={2} color={'brand.500'}>
                  <RiFundsLine size={'16px'} />
                </Flex>
                <Text fontSize={'sm'}>Sales</Text>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel p={0} pl={3}>
              <Menu>
                <CustomMenuItem
                  title="Sales Invoices"
                  path="/sale-invoice"
                  isActive={path[1] === 'sale-invoice'}
                />
                <CustomMenuItem
                  title="Payments In"
                  path="/payment-in"
                  isActive={path[1] === 'payment-in'}
                />
                <CustomMenuItem
                  title="Quotations"
                  path="/quotation"
                  isActive={path[1] === 'quotation'}
                />
                <CustomMenuItem
                  title="Proforma Invoices"
                  path="/proforma-invoice"
                  isActive={path[1] === 'proforma-invoice'}
                />
                <CustomMenuItem
                  title="Delivery Challans"
                  path="/delivery-challan"
                  isActive={path[1] === 'delivery-challan'}
                />
                <CustomMenuItem
                  title="Sales Returns"
                  path="/sale-return"
                  isActive={path[1] === 'sale-return'}
                />
                <CustomMenuItem
                  title="Credit Notes"
                  path="/credit-note"
                  isActive={path[1] === 'credit-note'}
                />
                <CustomMenuItem
                  title="Sales Orders"
                  path="/sale-order"
                  isActive={path[1] === 'sale-order'}
                />
              </Menu>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem border={'0px'}>
            <AccordionButton
              py={0}
              _hover={{
                bg: mode30,
                color: mode80
              }}
            >
              <Flex flex={1} minH={'36px'} align={'center'}>
                <Flex mr={2} color={'brand.500'}>
                  <RiShoppingCart2Line size={'16px'} />
                </Flex>
                <Text fontSize={'sm'}>Purchases</Text>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel p={0} pl={3}>
              <Menu>
                <CustomMenuItem
                  title="Purchase Invoices"
                  path="/purchase-invoice"
                  isActive={path[1] === 'purchase-invoice'}
                />
                <CustomMenuItem
                  title="Payments Out"
                  path="/payment-out"
                  isActive={path[1] === 'payment-out'}
                />
                <CustomMenuItem
                  title="Purchase Returns"
                  path="/purchase-return"
                  isActive={path[1] === 'purchase-return'}
                />
                <CustomMenuItem
                  title="Debit Notes"
                  path="/debit-note"
                  isActive={path[1] === 'debit-note'}
                />
                <CustomMenuItem
                  title="Purchase Orders"
                  path="/purchase-order"
                  isActive={path[1] === 'purchase-order'}
                />
              </Menu>
            </AccordionPanel>
          </AccordionItem>

          <CustomMenu
            title="Expenses"
            path="/expense"
            icon={<RiBankCardLine size={'16px'} />}
            isActive={path[1] === 'expense'}
          />
          <CustomMenu
            title="Bank | Cash | Cheque"
            path="/bank-cash"
            icon={<RiBankLine size={'16px'} />}
            isActive={path[1] === 'bank-cash'}
          />

          <CustomMenu
            title="Marketing"
            path="/marketing"
            icon={<RiBarChart2Line size={'16px'} />}
            isActive={path[1] === 'marketing'}
          />

          <CustomMenu
            title="Online Store"
            path="/online-store"
            icon={<RiStore2Line size={'16px'} />}
            isActive={path[1] === 'online-store'}
          />

          <CustomMenu
            title="E-Invoice | E-Way Bill"
            path="/"
            icon={<RiTruckLine size={'16px'} />}
            isActive={path[1] === '/e-invoicing'}
          />

          <Divider />

          <CustomMenu
            title="Loans"
            path="/loans"
            icon={<RiExchangeFundsLine size={'16px'} />}
            // badge={'Coming soon'}
            isActive={path[1] === 'loans'}
          />

          <CustomMenu
            title="Insurances"
            path="/insurances"
            icon={<RiShieldFlashLine size={'16px'} />}
            // badge={'Coming soon'}
            isActive={path[1] === 'insurance'}
          />

          <Divider />

          <CustomMenu
            title="Reports"
            path="/report"
            icon={<RiStackLine size={'16px'} />}
            isActive={path[1] === 'report'}
          />

          <CustomMenu
            title="Settings"
            path="/setting/account"
            icon={<RiSettings4Line size={'16px'} />}
            isActive={path[1] === 'account'}
          />
        </Accordion>
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
        borderRight={isActive ? '3px solid' : 'none'}
        borderColor={isActive ? 'brand.500' : 'none'}
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

function CustomMenuItem({ title, path, isActive }: CustomMenuItemPropTypes) {
  const { mode30, mode80 } = useThemeMode()
  return (
    <Link to={path}>
      <MenuItem
        minH={'36px'}
        icon={<RiCheckboxBlankCircleLine />}
        bg={isActive ? mode30 : 'none'}
        borderRight={isActive ? '3px solid' : 'none'}
        borderColor={isActive ? 'brand.500' : 'none'}
        _hover={{
          bg: mode30,
          color: mode80
        }}
      >
        <Text fontSize="sm">{title}</Text>
      </MenuItem>
    </Link>
  )
}
