import { Flex, Heading, List, ListIcon, ListItem, Stack, Text } from '@chakra-ui/react'
import { RiCheckboxCircleLine } from 'react-icons/ri'

import Brand from '@renderer/components/brand'
import useThemeMode from '@renderer/hooks/useThemeMode'

type AuthLayoutPropTypes = {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutPropTypes) {
  const { mode10, mode20, modeBrand } = useThemeMode()
  return (
    <Flex
      w={'100%'}
      minH="100vh"
      direction={{ base: 'column', md: 'row' }}
      justify="center"
      align="center"
      bg={mode10}
    >
      <Stack
        direction={'column'}
        justify="center"
        w={{ base: '100%', md: '50%' }}
        minH={'100vh'}
        bg={mode20}
        roundedRight={'50%'}
        p={12}
        spacing={8}
      >
        <Brand />
        <Heading
          as={'h1'}
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="4xl"
          fontWeight="extrabold"
        >
          Inventory, Billing & GST Software
        </Heading>
        <Text>
          Manage inventory, generate invoices, process payments, automate reports, run online stores
          & simplify GST filings.
        </Text>
        <List px={4} spacing={2}>
          <ListItem>
            <Stack direction={'row'} spacing={1} align={'center'}>
              <ListIcon as={RiCheckboxCircleLine} color={modeBrand} fontSize={'18px'} />
              <Text>AI powered software.</Text>
            </Stack>
          </ListItem>
          <ListItem>
            <Stack direction={'row'} spacing={1} align={'center'}>
              <ListIcon as={RiCheckboxCircleLine} color={modeBrand} fontSize={'18px'} />
              <Text>100% secure data storage.</Text>
            </Stack>
          </ListItem>
          <ListItem>
            <Stack direction={'row'} spacing={1} align={'center'}>
              <ListIcon as={RiCheckboxCircleLine} color={modeBrand} fontSize={'18px'} />
              <Text>Customisation options.</Text>
            </Stack>
          </ListItem>

          <ListItem>
            <Stack direction={'row'} spacing={1} align={'center'}>
              <ListIcon as={RiCheckboxCircleLine} color={modeBrand} fontSize={'18px'} />
              <Text>Export your data in CSV or JSON.</Text>
            </Stack>
          </ListItem>
          <ListItem>
            <Stack direction={'row'} spacing={1} align={'center'}>
              <ListIcon as={RiCheckboxCircleLine} color={modeBrand} fontSize={'18px'} />
              <Text>Take online orders.</Text>
            </Stack>
          </ListItem>
        </List>

        <Stack direction={'row'} spacing={12}>
          <Stack spacing={0}>
            <Text fontSize={'sm'} textTransform={'uppercase'}>
              Contact us
            </Text>
            <Text fontWeight={600}>+91-9304887263</Text>
          </Stack>

          <Stack spacing={0}>
            <Text fontSize={'sm'} textTransform={'uppercase'}>
              Email us
            </Text>
            <Text fontWeight={600}>sales@zauvijek.com</Text>
          </Stack>
        </Stack>
        {/* <ButtonGroup spacing={2}>
          <Button px={4} colorScheme={"green"} leftIcon={<RiPhoneLine />}>
            +91-9304887263
          </Button>
        </ButtonGroup> */}
      </Stack>
      <Flex w={'50%'} justify={'center'}>
        {children}
      </Flex>
    </Flex>
  )
}
