import { Flex, Grid, GridItem } from '@chakra-ui/react'

import Header from './header'
import Footer from './footer'

type LayoutPropTypes = {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutPropTypes) {
  return (
    <Flex flex={1}>
      <Grid
        w="100%"
        h="100vh"
        templateAreas={`
            "header"
            "body"
            "footer"`}
        gridTemplateRows={'48px 1fr 48px'}
        gridTemplateColumns={'1fr'}
      >
        <GridItem area={'header'} alignSelf={'center'}>
          <Header />
        </GridItem>
        <GridItem area={'body'} px={4} py={2} maxH={'90vh'} overflowY={'scroll'}>
          {children}
        </GridItem>
        <GridItem area={'footer'} alignSelf={'center'}>
          <Footer />
        </GridItem>
      </Grid>
    </Flex>
  )
}
