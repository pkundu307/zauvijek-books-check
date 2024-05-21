import { Card, CardBody, Stack, Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react'
import { RiArrowDownLine } from 'react-icons/ri'

import useThemeMode from '@renderer/hooks/useThemeMode'
import { parseCurrency } from '@renderer/utils/parse_currency'

export default function TotalToCollectView() {
  const { mode20 } = useThemeMode()
  return (
    <Card bg={mode20} boxShadow={'none'} rounded={0}>
      <CardBody>
        <Stat>
          <StatLabel>Total to Collect</StatLabel>
          <Stack direction={'row'} spacing={4} align={'end'}>
            <StatNumber>{parseCurrency(0)}</StatNumber>
            <StatHelpText color={'green.500'} fontWeight={600}>
              <RiArrowDownLine size={'18px'} />
            </StatHelpText>
          </Stack>
        </Stat>
      </CardBody>
    </Card>
  )
}
