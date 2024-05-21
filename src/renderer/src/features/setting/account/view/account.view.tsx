import {
  Flex,
  Stack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem,
  Text,
  Button,
  ButtonGroup,
  Avatar,
  Badge
} from '@chakra-ui/react'
import { RiArrowRightSLine, RiEdit2Line, RiUser3Line, RiVipCrown2Line } from 'react-icons/ri'

import Container from '@renderer/components/container'
import useThemeMode from '@renderer/hooks/useThemeMode'
import SettingLayout from '@renderer/layouts/setting'

export default function AccountView(props: any) {
  const { mode60 } = useThemeMode()
  return (
    <SettingLayout>
      <Flex my={2} justify={'space-between'} align="flex-start">
        <Stack direction={'row'} align={'center'} spacing={2}>
          <RiUser3Line size={'18px'} />
          <Breadcrumb separator={<RiArrowRightSLine />}>
            <BreadcrumbItem>
              <BreadcrumbLink href={'#'}>Account</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Stack>
      </Flex>

      <Grid templateColumns={'repeat(2, 1fr)'} templateRows={'repeat(1, 1fr)'} gap={4}>
        <GridItem colSpan={1}>
          <Container
            title={<Text fontSize="sm">Profile details</Text>}
            action={
              <ButtonGroup spacing={4}>
                <Button px={2} h={5} size={'xs'} rounded={0} leftIcon={<RiEdit2Line />}>
                  Update
                </Button>
              </ButtonGroup>
            }
          >
            <Stack>
              <Stack w="100%" p={4} direction="row">
                <Stack w="50%" spacing={0}>
                  <Avatar
                    src="https://st1.bollywoodlife.com/wp-content/uploads/2020/05/Jethalal-Dilip-Joshi-.jpg"
                    size="lg"
                  />
                </Stack>
                <Stack w="50%" spacing={0}>
                  <Text fontSize="sm" color={mode60}>
                    Name
                  </Text>
                  <Text fontSize="sm" fontWeight={600}>
                    Jetha Lal Gada
                  </Text>
                </Stack>
              </Stack>

              <Stack w="100%" p={4} direction="row">
                <Stack w="50%" spacing={0}>
                  <Stack direction="row" spacing={2} align="center">
                    <Text fontSize="sm" color={mode60}>
                      Phone
                    </Text>
                    <Badge colorScheme={props.user?.is_phone_verified ? 'green' : 'orange'}>
                      <Text fontSize={'smaller'}>
                        {props.user?.is_phone_verified ? 'Verified' : 'Not Verified'}
                      </Text>
                    </Badge>
                  </Stack>
                  <Text fontSize="sm" fontWeight={600}>
                    987654321
                  </Text>
                </Stack>
                <Stack w="50%" spacing={0}>
                  <Stack direction="row" spacing={2} align="center">
                    <Text fontSize="sm" color={mode60}>
                      Email
                    </Text>
                    <Badge colorScheme={props.user?.is_email_verified ? 'green' : 'orange'}>
                      <Text fontSize={'smaller'}>
                        {props.user?.is_phone_verified ? 'Verified' : 'Not Verified'}
                      </Text>
                    </Badge>
                  </Stack>
                  <Text fontSize="sm" fontWeight={600}>
                    demo@demo.com
                  </Text>
                </Stack>
              </Stack>

              <Stack w="100%" p={4} direction="row">
                <Stack w="50%" spacing={0}>
                  <Text fontSize="sm" color={mode60}>
                    Role
                  </Text>
                  <Text fontSize="sm" fontWeight={600}>
                    Admin
                  </Text>
                </Stack>
                <Stack w="50%" spacing={0}>
                  <Text fontSize="sm" color={mode60}>
                    Referal code
                  </Text>
                  <Text fontSize="sm" fontWeight={600}>
                    ASDASDDAS
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Container>
        </GridItem>

        <GridItem colSpan={1}>
          <Container
            title={<Text fontSize="sm">Subscription plan details</Text>}
            action={
              <ButtonGroup spacing={4}>
                <Button
                  px={2}
                  h={5}
                  size={'xs'}
                  colorScheme="yellow"
                  rounded={0}
                  leftIcon={<RiVipCrown2Line />}
                >
                  Upgrade plan
                </Button>
              </ButtonGroup>
            }
          >
            <Stack>
              <Stack w="100%" p={4} direction="row">
                <Stack w="50%" spacing={0}>
                  <Text fontSize="sm" color={mode60}>
                    Active plan
                  </Text>
                  <Text
                    my={0}
                    bgGradient="linear(to-l, #7928CA, #FF0080)"
                    bgClip="text"
                    fontSize={'3xl'}
                    fontWeight={'extrabold'}
                  >
                    Silver
                  </Text>
                </Stack>
              </Stack>
              <Stack w="100%" p={4} direction="row">
                <Stack w="50%" spacing={0}>
                  <Text fontSize="sm" color={mode60}>
                    Plan expiry date
                  </Text>
                  <Text fontSize="sm" fontWeight={600}>
                    12 Jan 2025
                  </Text>
                </Stack>
                <Stack w="50%" spacing={0}>
                  <Text fontSize="sm" color={mode60}>
                    Email usage
                  </Text>
                  <Text fontSize="sm" fontWeight={600}>
                    50/1000
                  </Text>
                </Stack>
              </Stack>

              <Stack w="100%" p={4} direction="row">
                <Stack w="50%" spacing={0}>
                  <Text fontSize="sm" color={mode60}>
                    SMS usage
                  </Text>
                  <Text fontSize="sm" fontWeight={600}>
                    45/100
                  </Text>
                </Stack>
                <Stack w="50%" spacing={0}>
                  <Text fontSize="sm" color={mode60}>
                    Whatsapp usage
                  </Text>
                  <Text fontSize="sm" fontWeight={600}>
                    25/100
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Container>
        </GridItem>

        <GridItem colSpan={1}>
          <Container
            title={<Text fontSize="sm">Addons plans details</Text>}
            action={
              <ButtonGroup spacing={4}>
                <Button
                  px={2}
                  h={5}
                  size={'xs'}
                  colorScheme="yellow"
                  rounded={0}
                  leftIcon={<RiVipCrown2Line />}
                >
                  Buy plan
                </Button>
              </ButtonGroup>
            }
          >
            <Stack>
              <Stack w="100%" p={4} direction="row">
                <Stack w="50%" spacing={0}>
                  <Text fontSize="sm" color={mode60}>
                    Email usage
                  </Text>
                  <Text fontSize="sm" fontWeight={600}>
                    50/1000
                  </Text>
                </Stack>
                <Stack w="50%" spacing={0}>
                  <Text fontSize="sm" color={mode60}>
                    SMS usage
                  </Text>
                  <Text fontSize="sm" fontWeight={600}>
                    45/100
                  </Text>
                </Stack>
              </Stack>

              <Stack w="100%" p={4} direction="row">
                <Stack w="50%" spacing={0}>
                  <Text fontSize="sm" color={mode60}>
                    Whatsapp usage
                  </Text>
                  <Text fontSize="sm" fontWeight={600}>
                    No active plan
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Container>
        </GridItem>
      </Grid>
    </SettingLayout>
  )
}
