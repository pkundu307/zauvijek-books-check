import { Grid, GridItem, Stat, StatLabel, StatNumber, Text } from '@chakra-ui/react'
import Container from '@renderer/components/container'
import { parseCurrency } from '@renderer/utils/parse_currency'

export default function TotalBankCashChequeView() {
  return (
    <Container title={<Text fontSize="sm">Bank, Cash & Cheque</Text>}>
      <Grid templateColumns={'repeat(2, 1fr)'} templateRows={'repeat(3, 1fr)'} gap={4} p={6}>
        <GridItem colSpan={1}>
          <Stat>
            <StatLabel>Total Cash Amount</StatLabel>
            <StatNumber fontSize="lg">{parseCurrency(0)}</StatNumber>
          </Stat>
        </GridItem>
        <GridItem colSpan={1}>
          <Stat>
            <StatLabel>Total Cheque Amount</StatLabel>
            <StatNumber fontSize="lg">{parseCurrency(0)}</StatNumber>
          </Stat>
        </GridItem>
        <GridItem colSpan={1}>
          <Stat>
            <StatLabel>Total Bank Amount</StatLabel>
            <StatNumber fontSize="lg">{parseCurrency(0)}</StatNumber>
          </Stat>
        </GridItem>
        <GridItem colSpan={2}>
          <Stat>
            <StatLabel>Total Bank + Cash + Cheque Amount</StatLabel>
            <StatNumber fontSize="lg">{parseCurrency(0)}</StatNumber>
          </Stat>
        </GridItem>
      </Grid>
    </Container>
  )
}
