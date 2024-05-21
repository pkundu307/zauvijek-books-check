import {
  Flex,
  Stack,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { RiGroup2Line, RiArrowRightSLine } from 'react-icons/ri'

import AppLayout from '@renderer/layouts/app'
import Container from '@renderer/components/container'
import useThemeMode from '@renderer/hooks/useThemeMode'

export default function SingleSupplierView(props: any) {
  const { mode60 } = useThemeMode()
  return (
    <AppLayout>
      <Flex py={2} justify="space-between" align="flex-start">
        <Stack direction="row" align="center" spacing={2}>
          <RiGroup2Line size="18px" />
          <Breadcrumb separator={<RiArrowRightSLine />}>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Parties</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/supplier">
                Suppliers
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink isCurrentPage>{props.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Stack>
      </Flex>

      <Grid templateColumns={'repeat(2, 1fr)'} templateRows={'repeat(2, 1fr)'} gap={4}>
        <GridItem colSpan={1}>
          <Container title={<Text fontSize="sm">General Details</Text>}>
            <Stack p={4} spacing={6}>
              <Stack direction="row" spacing={6}>
                <Stack w="50%">
                  <Text fontSize="sm" color={mode60}>
                    Supplier type
                  </Text>
                  <Text fontSize="sm" fontWeight={600}>
                    {props.party_form || '-'}
                  </Text>
                </Stack>
                <Stack w="50%">
                  <Text fontSize="sm" color={mode60}>
                    Business name
                  </Text>
                  <Text fontSize="sm" fontWeight={600}>
                    {props.business_name || '-'}
                  </Text>
                </Stack>
              </Stack>

              <Stack direction="row" spacing={6}>
                <Stack w="50%">
                  <Text fontSize="sm" color={mode60}>
                    Supplier name
                  </Text>
                  <Text fontSize="sm" fontWeight={600}>
                    {props.party_name || '-'}
                  </Text>
                </Stack>
                <Stack w="50%">
                  <Text fontSize="sm" color={mode60}>
                    Category
                  </Text>
                  <Text fontSize="sm" fontWeight={600}>
                    {props.party_category || '-'}
                  </Text>
                </Stack>
              </Stack>

              <Stack direction="row" spacing={6}>
                <Stack w="50%">
                  <Text fontSize="sm" color={mode60}>
                    Phone number
                  </Text>
                  <Text fontSize="sm" fontWeight={600}>
                    {props.phone_no || '-'}
                  </Text>
                </Stack>
                <Stack w="50%">
                  <Text fontSize="sm" color={mode60}>
                    Email
                  </Text>
                  <Text fontSize="sm" fontWeight={600}>
                    {props.email || '-'}
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Container>
        </GridItem>

        <GridItem colSpan={1}>
          <Container title={<Text fontSize="sm">Address Details</Text>}>
            <Stack p={4} spacing={6}>
              <Stack spacing={6}>
                <Stack w="50%">
                  <Text fontSize="sm" color={mode60}>
                    Billing Address
                  </Text>
                  <Text fontSize="sm" fontWeight={600}>
                    {props.billing_address || '-'}
                  </Text>
                </Stack>
                <Stack w="50%">
                  <Text fontSize="sm" color={mode60}>
                    Shipping Address
                  </Text>
                  <Text fontSize="sm" fontWeight={600}>
                    {props.shipping_address || '-'}
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Container>
        </GridItem>

        <GridItem colSpan={1}>
          <Container title={<Text fontSize="sm">Payment Details</Text>}>
            <Stack p={4} spacing={6}>
              <Stack direction="row" spacing={6}>
                <Stack w="50%">
                  <Text fontSize="sm" color={mode60}>
                    Opening balance
                  </Text>
                  <Text fontSize="sm" fontWeight={600}>
                    {props.opening_balance || '-'}
                  </Text>
                </Stack>
                <Stack w="50%">
                  <Text fontSize="sm" color={mode60}>
                    Opening balance date
                  </Text>
                  <Text fontSize="sm" fontWeight={600}>
                    {props.opening_balance_date || '-'}
                  </Text>
                </Stack>
              </Stack>

              <Stack direction="row" spacing={6}>
                <Stack w="50%">
                  <Text fontSize="sm" color={mode60}>
                    Credit period
                  </Text>
                  <Text fontSize="sm" fontWeight={600}>
                    {props.credit_period || '-'}
                  </Text>
                </Stack>
                <Stack w="50%">
                  <Text fontSize="sm" color={mode60}>
                    Credit limit
                  </Text>
                  <Text fontSize="sm" fontWeight={600}>
                    {props.credit_limit || '-'}
                  </Text>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={6}>
                <Stack w="50%">
                  <Text fontSize="sm" color={mode60}>
                    Closing balance
                  </Text>
                  <Text fontSize="sm" fontWeight={600}>
                    {props.closing_balance || '-'}
                  </Text>
                </Stack>
                <Stack w="50%" />
              </Stack>
            </Stack>
          </Container>
        </GridItem>

        <GridItem colSpan={1}>
          <Container title={<Text fontSize="sm">Tax Details</Text>}>
            <Stack p={4} spacing={6}>
              <Stack direction="row" spacing={6}>
                <Stack w="50%">
                  <Text fontSize="sm" color={mode60}>
                    Tax Id / GST number
                  </Text>
                  <Text fontSize="sm" fontWeight={600}>
                    {props.tax_id || '-'}
                  </Text>
                </Stack>
                <Stack w="50%">
                  <Text fontSize="sm" color={mode60}>
                    PAN number
                  </Text>
                  <Text fontSize="sm" fontWeight={600}>
                    {props.pan_no || '-'}
                  </Text>
                </Stack>
              </Stack>

              <Stack direction="row" spacing={6}>
                <Stack w="50%">
                  <Text fontSize="sm" color={mode60}>
                    Place of supply
                  </Text>
                  <Text fontSize="sm" fontWeight={600}>
                    {props.place_of_supply || '-'}
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Container>
        </GridItem>
      </Grid>
    </AppLayout>
  )
}
