import { Card, CardBody, Stack, Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react'
import { RiArrowUpLine } from 'react-icons/ri'

import useThemeMode from '@renderer/hooks/useThemeMode'
import { parseCurrency } from '@renderer/utils/parse_currency'

export default function TotalToPayView() {
  const { mode20 } = useThemeMode()
  return (
    <Card bg={mode20} boxShadow={'none'} rounded={0}>
      <CardBody>
        <Stat>
          <StatLabel>Total to Pay</StatLabel>
          <Stack direction={'row'} spacing={4} align={'end'}>
            <StatNumber>{parseCurrency(0)}</StatNumber>
            <StatHelpText color={'red.500'} fontWeight={600}>
              <RiArrowUpLine size={'18px'} />
            </StatHelpText>
          </Stack>
        </Stat>
      </CardBody>
    </Card>
  )
}
