import {
  Flex,
  Stack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem,
  Text,
  List,
  ListItem,
  Divider
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { RiArrowRightSLine, RiStackLine } from 'react-icons/ri'

import Container from '@renderer/components/container'
import useThemeMode from '@renderer/hooks/useThemeMode'
import AppLayout from '@renderer/layouts/app'

export function Report() {
  const { modeBrand } = useThemeMode()
  return (
    <AppLayout>
      <Flex py={2} justify={'space-between'} align="flex-start">
        <Stack direction={'row'} align={'center'} spacing={2}>
          <RiStackLine size={'18px'} />
          <Breadcrumb separator={<RiArrowRightSLine />}>
            <BreadcrumbItem>
              <BreadcrumbLink href={'#'}>Reports</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Stack>
      </Flex>

      <Grid templateColumns={'repeat(4, 1fr)'} templateRows={'repeat(2, 1fr)'} gap={4}>
        <GridItem colSpan={1}>
          <Container title={<Text fontSize="sm">GST reports</Text>}>
            <Stack spacing={6}>
              <List>
                <Link to="/">
                  <ListItem p={3} fontSize="sm" color={modeBrand}>
                    GSTR 1
                  </ListItem>
                </Link>
                <Divider />
                <Link to="/">
                  <ListItem p={3} fontSize="sm" color={modeBrand}>
                    GSTR 2
                  </ListItem>
                </Link>
                <Divider />
                <Link to="/">
                  <ListItem p={3} fontSize="sm" color={modeBrand}>
                    GSTR 3B
                  </ListItem>
                </Link>
                <Divider />
                <Link to="/">
                  <ListItem p={3} fontSize="sm" color={modeBrand}>
                    GSTR 9
                  </ListItem>
                </Link>
              </List>
            </Stack>
          </Container>
        </GridItem>

        <GridItem colSpan={1} rowSpan={2}>
          <Container title={<Text fontSize="sm">Transaction reports</Text>}>
            <Stack spacing={6}>
              <List>
                <Link to="/">
                  <ListItem p={3} fontSize="sm" color={modeBrand}>
                    Balance sheet
                  </ListItem>
                </Link>
                <Divider />
                <Link to="/">
                  <ListItem p={3} fontSize="sm" color={modeBrand}>
                    Bill wise profit
                  </ListItem>
                </Link>
                <Divider />
                <Link to="/">
                  <ListItem p={3} fontSize="sm" color={modeBrand}>
                    Cash flow
                  </ListItem>
                </Link>
                <Divider />
                <Link to="/">
                  <ListItem p={3} fontSize="sm" color={modeBrand}>
                    Profit loss
                  </ListItem>
                </Link>
                <Divider />
                <Link to="/">
                  <ListItem p={3} fontSize="sm" color={modeBrand}>
                    Purchase statement
                  </ListItem>
                </Link>
                <Divider />
                <Link to="/">
                  <ListItem p={3} fontSize="sm" color={modeBrand}>
                    Sale statement
                  </ListItem>
                </Link>
                <Divider />
                <Link to="/">
                  <ListItem p={3} fontSize="sm" color={modeBrand}>
                    Transaction statement
                  </ListItem>
                </Link>
              </List>
            </Stack>
          </Container>
        </GridItem>

        <GridItem colSpan={1} rowSpan={2}>
          <Container title={<Text fontSize="sm">Stock reports</Text>}>
            <Stack spacing={6}>
              <List>
                <Link to="/">
                  <ListItem p={3} fontSize="sm" color={modeBrand}>
                    Item category wise sale purchase
                  </ListItem>
                </Link>
                <Divider />
                <Link to="/">
                  <ListItem p={3} fontSize="sm" color={modeBrand}>
                    Item wise discount
                  </ListItem>
                </Link>
                <Divider />
                <Link to="/">
                  <ListItem p={3} fontSize="sm" color={modeBrand}>
                    Item wise profit
                  </ListItem>
                </Link>
                <Divider />
                <Link to="/">
                  <ListItem p={3} fontSize="sm" color={modeBrand}>
                    Low stock summary
                  </ListItem>
                </Link>
                <Divider />
                <Link to="/">
                  <ListItem p={3} fontSize="sm" color={modeBrand}>
                    Stock activity
                  </ListItem>
                </Link>
                <Divider />
                <Link to="/">
                  <ListItem p={3} fontSize="sm" color={modeBrand}>
                    Stock summary
                  </ListItem>
                </Link>
                <Divider />
                <Link to="/">
                  <ListItem p={3} fontSize="sm" color={modeBrand}>
                    Stock summary by item category
                  </ListItem>
                </Link>
              </List>
            </Stack>
          </Container>
        </GridItem>

        <GridItem colSpan={1} rowSpan={2}>
          <Container title={<Text fontSize="sm">Party reports</Text>}>
            <Stack spacing={6}>
              <List>
                <Link to="/">
                  <ListItem p={3} fontSize="sm" color={modeBrand}>
                    Party category wise sale purchase
                  </ListItem>
                </Link>
                <Divider />
                <Link to="/">
                  <ListItem p={3} fontSize="sm" color={modeBrand}>
                    Party statement
                  </ListItem>
                </Link>
                <Divider />
                <Link to="/">
                  <ListItem p={3} fontSize="sm" color={modeBrand}>
                    Party wise item
                  </ListItem>
                </Link>
                <Divider />
                <Link to="/">
                  <ListItem p={3} fontSize="sm" color={modeBrand}>
                    Party wise outstanding
                  </ListItem>
                </Link>
                <Divider />
                <Link to="/">
                  <ListItem p={3} fontSize="sm" color={modeBrand}>
                    Party wise profit loss
                  </ListItem>
                </Link>
                <Divider />
                <Link to="/">
                  <ListItem p={3} fontSize="sm" color={modeBrand}>
                    Party wise sale purchase
                  </ListItem>
                </Link>
                <Divider />
              </List>
            </Stack>
          </Container>
        </GridItem>

        <GridItem colSpan={1}>
          <Container title={<Text fontSize="sm">Expense reports</Text>}>
            <Stack spacing={6}>
              <List>
                <Link to="/">
                  <ListItem p={3} fontSize="sm" color={modeBrand}>
                    Expense by category
                  </ListItem>
                </Link>
                <Divider />
                <Link to="/">
                  <ListItem p={3} fontSize="sm" color={modeBrand}>
                    Expense by item
                  </ListItem>
                </Link>
                <Divider />
                <Link to="/">
                  <ListItem p={3} fontSize="sm" color={modeBrand}>
                    Expense statement
                  </ListItem>
                </Link>
              </List>
            </Stack>
          </Container>
        </GridItem>
      </Grid>
    </AppLayout>
  )
}
