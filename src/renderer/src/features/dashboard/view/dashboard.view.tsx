import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Grid,
  GridItem,
  InputGroup,
  InputLeftAddon,
  Stack
} from '@chakra-ui/react'
import { RiArrowRightSLine, RiCalendar2Line, RiDashboardLine } from 'react-icons/ri'

import type { DashboardPropTypes } from '../types'

import AppLayout from '@renderer/layouts/app'
import useThemeMode from '@renderer/hooks/useThemeMode'
import SelectDateRange from '@renderer/components/select_date_range'
import TotalSaleView from '../components/view/total_sale/total_sale.view'
import TotalPurchaseView from '../components/view/total_purchase/total_purchase.view'
import TotalToCollectView from '../components/view/total_to_collect/total_to_collect.view'
import TotalToPayView from '../components/view/total_to_pay/total_to_pay.view'
import TotalSaleGraphView from '../components/view/total_sale_graph/total_sale_graph.view'
import ListTransactionView from '../components/view/transaction/list.transaction.view'
import TotalBankCashView from '../components/view/total_bank_cash_cheque/total_bank_cash_cheque.view'
import BookDemo from '@renderer/pages/book_demo'

export default function DashboardView(props: DashboardPropTypes) {
  const { mode20 } = useThemeMode()

  return (
    <AppLayout>
      <Stack spacing={6}>
        <Flex py={2} justify={'space-between'} align="flex-start">
          <Stack direction={'row'} align={'center'} spacing={2}>
            <RiDashboardLine size={'18px'} />
            <Breadcrumb separator={<RiArrowRightSLine />}>
              <BreadcrumbItem>
                <BreadcrumbLink href={'#'}>Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Stack>

          <Stack direction={'row'} spacing={2}>
            <InputGroup size={'sm'} zIndex={2}>
              <InputLeftAddon children={<RiCalendar2Line />} bg={mode20} />
              <Flex w="220px">
                <SelectDateRange
                  selectedDates={props.selectedDates}
                  setSelectedDates={props.handleSelectedDates}
                />
              </Flex>
            </InputGroup>
            \ <BookDemo />
          </Stack>
        </Flex>

        <Grid templateColumns={'repeat(4, 1fr)'} gap={6}>
          <GridItem colSpan={1}>
            <TotalSaleView />
          </GridItem>
          <GridItem colSpan={1}>
            <TotalPurchaseView />
          </GridItem>
          <GridItem colSpan={1}>
            <TotalToCollectView />
          </GridItem>
          <GridItem colSpan={1}>
            <TotalToPayView />
          </GridItem>
        </Grid>

        <TotalSaleGraphView />

        <Grid templateColumns={'repeat(3, 1fr)'} gap={6}>
          <GridItem colSpan={2}>
            <ListTransactionView />
          </GridItem>
          <GridItem colSpan={1}>
            <TotalBankCashView />
          </GridItem>
        </Grid>
      </Stack>
    </AppLayout>
  )
}
