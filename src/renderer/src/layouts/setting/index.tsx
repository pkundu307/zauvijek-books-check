import * as React from 'react'
import { Flex, Grid, GridItem } from '@chakra-ui/react'

import useThemeMode from '@renderer/hooks/useThemeMode'
import Header from './header'
import Leftbar from './leftbar'
import Footer from './footer'

type AppLayoutPropTypes = {
  children?: React.ReactNode
}

export default function SettingLayout({ children }: AppLayoutPropTypes) {
  const { mode20 } = useThemeMode()

  const [isLeftbarVisible, setLeftbarVisible] = React.useState(true)

  const templateAreas = isLeftbarVisible
    ? `
    "leftbar header"
    "leftbar body"
    "leftbar footer"`
    : `
    "header"
    "body"
    "footer"
    `
  const gridTemplateRows = '46px 1fr 36px'
  const gridTemplateColumns = isLeftbarVisible ? '220px 1fr' : '1fr'

  const handleLeftbar = React.useCallback((value: boolean) => {
    setLeftbarVisible(value)
  }, [])

  return (
    <Flex flex={1}>
      <Grid
        w="100%"
        h="100vh"
        templateAreas={templateAreas}
        gridTemplateRows={gridTemplateRows}
        gridTemplateColumns={gridTemplateColumns}
      >
        <GridItem area={'header'} alignSelf={'center'}>
          <Header isLeftbarVisible={isLeftbarVisible} handleLeftbar={handleLeftbar} />
        </GridItem>
        {isLeftbarVisible && (
          <GridItem area={'leftbar'} bg={mode20}>
            <Leftbar />
          </GridItem>
        )}
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
