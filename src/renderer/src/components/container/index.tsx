import { Card, CardBody, CardHeader, Flex } from '@chakra-ui/react'

import useThemeMode from '@renderer/hooks/useThemeMode'

type ContainerPropsType = {
  title?: React.ReactNode
  action?: React.ReactNode
  children?: React.ReactNode
}

export default function Container({ children, title, action }: ContainerPropsType) {
  const { mode10, mode30 } = useThemeMode()

  return (
    <Card border="1px solid" borderColor={mode30} rounded={0} boxShadow={'none'}>
      <CardHeader p={2} px={4} bg="brand.500" color="#fff">
        <Flex justify={'space-between'} align={'center'}>
          {title}
          {action}
        </Flex>
      </CardHeader>
      <CardBody p={0} bg={mode10}>
        {children}
      </CardBody>
    </Card>
  )
}
