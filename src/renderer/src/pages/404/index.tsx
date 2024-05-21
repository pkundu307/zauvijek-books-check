import { useNavigate } from 'react-router-dom'
import { RiArrowLeftLine } from 'react-icons/ri'
import { Button, Flex, Text } from '@chakra-ui/react'

export function NoMatch() {
  const navigate = useNavigate()

  return (
    <Flex w="100%" h="100vh" direction="column" justify="center" align="center">
      <Text my="2rem" fontSize="2xl">
        <b>Error 404</b> : Page not found.
      </Text>
      <Button
        size="sm"
        variant="link"
        colorScheme="brand"
        leftIcon={<RiArrowLeftLine />}
        onClick={() => navigate(-1)}
      >
        Go back
      </Button>
    </Flex>
  )
}
