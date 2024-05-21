import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { Flex, Text, useColorMode } from '@chakra-ui/react'

import Container from '@renderer/components/container'
import { getInnerWidth } from '@renderer/utils/inner_width'

const graph = [
  { name: 'Jan', sales: 0, purchase: 0, amt: 0 },
  { name: 'Feb', sales: 0, purchase: 0, amt: 0 },
  { name: 'Mar', sales: 0, purchase: 0, amt: 0 },
  { name: 'Apr', sales: 0, purchase: 0, amt: 0 },
  { name: 'May', sales: 0, purchase: 0, amt: 0 },
  { name: 'Jun', sales: 0, purchase: 0, amt: 0 },
  { name: 'Jul', sales: 0, purchase: 0, amt: 0 },
  { name: 'Aug', sales: 0, purchase: 0, amt: 0 },
  { name: 'Sep', sales: 0, purchase: 0, amt: 0 },
  { name: 'Oct', sales: 0, purchase: 0, amt: 0 },
  { name: 'Nov', sales: 0, purchase: 0, amt: 0 },
  { name: 'Dec', sales: 0, purchase: 0, amt: 0 }
]

export default function TotalSaleGraphView() {
  const { colorMode } = useColorMode()
  return (
    <Container title={<Text fontSize="sm">Yearly Sales</Text>}>
      <Flex py={6}>
        <LineChart width={getInnerWidth(95)} height={380} data={graph || []}>
          <Line type="monotone" dataKey="sales" stroke="#66B487" strokeWidth={3} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis
            dataKey="name"
            fontSize={'14px'}
            stroke={colorMode === 'light' ? '#000' : '#fff'}
          />
          <YAxis fontSize={'14px'} stroke={colorMode === 'light' ? '#000' : '#fff'} />
          <Tooltip contentStyle={{ color: '#000' }} />
          <Legend />
        </LineChart>
      </Flex>
    </Container>
  )
}
