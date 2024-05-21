import { Card, CardBody, Stat, StatLabel, StatNumber } from '@chakra-ui/react'

import useThemeMode from '@renderer/hooks/useThemeMode'
import { parseCurrency } from '@renderer/utils/parse_currency'

export default function TotalPurchaseView() {
  const { mode20 } = useThemeMode()
  return (
    <Card bg={mode20} boxShadow={'none'} rounded={0}>
      <CardBody>
        <Stat>
          <StatLabel>Total Purchases</StatLabel>
          <StatNumber>{parseCurrency(0)}</StatNumber>
        </Stat>
      </CardBody>
    </Card>
  )
}
