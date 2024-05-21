import { Flex, Image, Text } from '@chakra-ui/react'

import useThemeMode from '@renderer/hooks/useThemeMode'
import NoDataImage from '@renderer/assets/image/no-data.png'

export default function NoData({ title = 'No records found' }: { title?: string }) {
  const { mode50 } = useThemeMode()
  return (
    <Flex minH={200} direction={'column'} justify={'center'} align={'center'} color={mode50}>
      <Image src={NoDataImage} width={120} opacity={0.5} />
      <Text>{title}</Text>
    </Flex>
  )
}
