import {
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Switch,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import { Controller } from 'react-hook-form'
import { RiAddLine } from 'react-icons/ri'

import Container from '@renderer/components/container'
import Action from '@renderer/components/container/action'
import useThemeMode from '@renderer/hooks/useThemeMode'
import { parseCurrency } from '@renderer/utils/parse_currency'

export default function ItemTable(props: any) {
  const { mode20, mode30, modeBrand } = useThemeMode()
  return (
    <Container
      title={<Text fontSize="sm">Item Details</Text>}
      action={
        <Stack direction="row" spacing={6}>
          <Controller
            control={props?.control}
            name="enable_low_stock_alert"
            render={({ field: { value, onChange } }) => (
              <Switch size="sm" fontSize="sm" colorScheme="bulb" value={value} onChange={onChange}>
                Enable item scan
              </Switch>
            )}
          />
          <ButtonGroup spacing={4}>
            <Action actionTitle=" Add Multiple Item" actionIcon={<RiAddLine />} />
          </ButtonGroup>
        </Stack>
      }
    >
      <Stack spacing={0}>
        <Table size="sm">
          <Thead>
            <Tr bg={mode20}>
              <Th border="1px" borderColor={mode30} w="36px" py={2} px={1}>
                #
              </Th>
              <Th border="1px" borderColor={mode30} py={2} px={1}>
                Item Description
              </Th>
              <Th border="1px" borderColor={mode30} py={2} px={1}>
                HSN/SAC
              </Th>
              <Th border="1px" borderColor={mode30} w="100px" py={2} px={1}>
                Quantity
              </Th>
              <Th border="1px" borderColor={mode30} w="150px" py={2} px={1}>
                Price
              </Th>
              <Th border="1px" borderColor={mode30} w="150px" py={2} px={1}>
                MRP
              </Th>
              <Th border="1px" borderColor={mode30} w="120px" py={2} px={1}>
                Discount
              </Th>
              <Th border="1px" borderColor={mode30} w="120px" py={2} px={1}>
                Tax
              </Th>
              <Th border="1px" borderColor={mode30} w="150px" py={2} px={1}>
                Amount
              </Th>
              <Th border="1px" borderColor={mode30} w="36px" py={2} px={1}></Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td p={1}>1</Td>
              <Td p={1} border="1px" borderColor={mode30}>
                <Stack spacing={1}>
                  <Controller
                    control={props?.control}
                    name="item_name"
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Input
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder="Enter item name"
                        size="xs"
                      />
                    )}
                  />
                  <Controller
                    control={props?.control}
                    name="item_description"
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Textarea
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        resize="none"
                        rows={2}
                        placeholder="Enter item description"
                        size="xs"
                      />
                    )}
                  />
                </Stack>
              </Td>
              <Td p={1} border="1px" borderColor={mode30}>
                <Text fontSize="xs">23423423</Text>
              </Td>
              <Td p={1} border="1px" borderColor={mode30} alignItems="flex-start">
                <Controller
                  control={props?.control}
                  name="quantity"
                  render={({ field: { value, onChange } }) => (
                    <NumberInput value={value} onChange={onChange} min={1} size="xs">
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  )}
                />
              </Td>
              <Td p={1} border="1px" borderColor={mode30}>
                <Controller
                  control={props?.control}
                  name="price"
                  render={({ field: { value, onChange, onBlur } }) => (
                    <InputGroup size="xs">
                      <InputLeftAddon children={'₹'} />
                      <Input value={value} onChange={onChange} onBlur={onBlur} placeholder="0" />
                    </InputGroup>
                  )}
                />
              </Td>
              <Td p={1} border="1px" borderColor={mode30}>
                <Controller
                  control={props?.control}
                  name="mrp"
                  render={({ field: { value, onChange, onBlur } }) => (
                    <InputGroup size="xs">
                      <InputLeftAddon children={'₹'} />
                      <Input value={value} onChange={onChange} onBlur={onBlur} placeholder="0" />
                    </InputGroup>
                  )}
                />
              </Td>
              <Td p={1} border="1px" borderColor={mode30}>
                <Stack spacing={1}>
                  <Controller
                    control={props?.control}
                    name="discount"
                    render={({ field: { value, onChange, onBlur } }) => (
                      <InputGroup size="xs">
                        <InputLeftAddon children={'₹'} />
                        <Input value={value} onChange={onChange} onBlur={onBlur} placeholder="0" />
                      </InputGroup>
                    )}
                  />
                  <Controller
                    control={props?.control}
                    name="discount"
                    render={({ field: { value, onChange, onBlur } }) => (
                      <InputGroup size="xs">
                        <Input value={value} onChange={onChange} onBlur={onBlur} placeholder="0" />
                        <InputRightAddon children={'%'} />
                      </InputGroup>
                    )}
                  />
                </Stack>
              </Td>
              <Td p={1} border="1px" borderColor={mode30}>
                <Stack spacing={1}>
                  <Controller
                    control={props?.control}
                    name="tax_rate"
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Input
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder="0"
                        size="xs"
                      />
                    )}
                  />
                  <Text fontSize="xs">{parseCurrency(0)}</Text>
                </Stack>
              </Td>
              <Td p={1} border="1px" borderColor={mode30}>
                <Text fontSize="xs">{parseCurrency(0)}</Text>
              </Td>
              <Td></Td>
            </Tr>
          </Tbody>
        </Table>

        <Button m={2} size="sm" rounded={0} color={modeBrand} leftIcon={<RiAddLine />}>
          Add Item
        </Button>

        <Stack direction="row" spacing={0} borderTop="1px solid" borderColor={mode30}>
          <Stack w="50%" minH="300px" borderRight="1px solid" borderColor={mode30}>
            <Table size="sm">
              <Thead>
                <Tr bg={mode20}>
                  <Th border="1px" borderColor={mode30} w="36px" py={2} px={1}>
                    #
                  </Th>
                  <Th border="1px" borderColor={mode30} w="80px" py={2} px={1}>
                    Tax Rate
                  </Th>
                  <Th border="1px" borderColor={mode30} w="80px" py={2} px={1}>
                    Tax Value
                  </Th>
                  <Th border="1px" borderColor={mode30} w="80px" py={2} px={1}>
                    CGST
                  </Th>
                  <Th border="1px" borderColor={mode30} w="80px" py={2} px={1}>
                    SGST
                  </Th>
                  <Th border="1px" borderColor={mode30} w="80px" py={2} px={1}>
                    IGST
                  </Th>
                  <Th border="1px" borderColor={mode30} py={2} px={1}>
                    Amount
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr alignSelf="flex-start">
                  <Td p={1} border="1px" borderColor={mode30}>
                    1
                  </Td>
                  <Td p={1} border="1px" borderColor={mode30}>
                    1
                  </Td>
                  <Td p={1} border="1px" borderColor={mode30}>
                    1
                  </Td>
                  <Td p={1} border="1px" borderColor={mode30}>
                    1
                  </Td>
                  <Td p={1} border="1px" borderColor={mode30}>
                    1
                  </Td>
                  <Td p={1} border="1px" borderColor={mode30}>
                    1
                  </Td>
                  <Td p={1} border="1px" borderColor={mode30}>
                    1
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Stack>

          <Stack p={4} w="50%" spacing={2}>
            <Flex justify="space-between">
              <Text fontSize="sm" fontWeight={600}>
                Taxable Amount
              </Text>
              <Text fontSize="sm">{parseCurrency(2000)}</Text>
            </Flex>

            <Flex justify="space-between">
              <Text fontSize="sm" fontWeight={600}>
                Total Tax
              </Text>
              <Text fontSize="sm">{parseCurrency(500)}</Text>
            </Flex>

            <Flex justify="space-between">
              <Text fontSize="sm" fontWeight={600}>
                Discount (after tax)
              </Text>
              <Text fontSize="sm">{parseCurrency(10)}</Text>
            </Flex>

            <Divider my={2} />
            <Flex justify="space-between">
              <Text fontSize="sm" fontWeight={600}>
                Round Off
              </Text>
              <Text fontSize="sm">{parseCurrency(0)}</Text>
            </Flex>

            <Divider my={2} />
            <Flex justify="space-between">
              <Text fontSize="sm" fontWeight={600}>
                Total Amount
              </Text>
              <Text fontSize="sm">{parseCurrency(600)}</Text>
            </Flex>

            <Divider my={2} />
            <Flex justify="space-between">
              <Text fontSize="sm" fontWeight={600}>
                Amount Received
              </Text>
              <Text fontSize="sm">{parseCurrency(1000)}</Text>
            </Flex>

            <Flex justify="space-between">
              <Text fontSize="sm" fontWeight={600}>
                Balance
              </Text>
              <Text fontSize="sm">{parseCurrency(600)}</Text>
            </Flex>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}
