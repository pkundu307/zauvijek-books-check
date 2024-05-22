import {
  Alert,
  AlertDescription,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
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
import { RiAddLine, RiCloseCircleLine } from 'react-icons/ri'

import Container from '@renderer/components/container'
import Action from '@renderer/components/container/action'
import DownshiftSearchItem from '@renderer/components/form/downshift_search_item'
import DownshiftSelectString from '@renderer/components/form/downshift_select_string'
import { PAYMENT_MODES } from '@renderer/constants/payment_modes'
import { TAX_RATES } from '@renderer/constants/tax_rates'
import useThemeMode from '@renderer/hooks/useThemeMode'
import { parseCurrency } from '@renderer/utils/parse_currency'

const defaultValues = {
  item_name: '',
  item_description: '',
  hsn_code: '',
  quantity: 1,
  price: 0,
  unit: 'Piece',
  discount_percent: 0,
  discount_amount: 0,
  tax: '',
  tax_amount: 0,
  taxable_amount: 0,
  amount: 0
}

export default function ItemTable(props: any) {
  const { mode20, mode30, modeBrand } = useThemeMode()

  const { control, watch } = props.form
  const { fields, append, remove } = props.saleItem

  const watchFields = watch()

  return (
    <Container
      title={<Text fontSize="sm">Item Details</Text>}
      action={
        <Stack direction="row" spacing={6}>
          <Controller
            control={control}
            name="is_scan_item_enabled"
            render={({ field: { value, onChange } }) => (
              <Switch size="sm" fontSize="sm" colorScheme="bulb" value={value} onChange={onChange}>
                Enable item scan
              </Switch>
            )}
          />
          <ButtonGroup spacing={4}>
            <Action actionTitle="Add Multiple Item" actionIcon={<RiAddLine />} />
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
              <Th border="1px" borderColor={mode30} w="100px" py={2} px={1}>
                HSN/SAC
              </Th>
              <Th border="1px" borderColor={mode30} w="100px" py={2} px={1}>
                Quantity
              </Th>
              <Th border="1px" borderColor={mode30} w="120px" py={2} px={1}>
                Price
              </Th>
              <Th border="1px" borderColor={mode30} w="100px" py={2} px={1}>
                Unit
              </Th>
              <Th border="1px" borderColor={mode30} w="100px" py={2} px={1}>
                Discount
              </Th>
              <Th border="1px" borderColor={mode30} w="120px" py={2} px={1}>
                Taxable Amt.
              </Th>
              <Th border="1px" borderColor={mode30} w="150px" py={2} px={1}>
                Tax
              </Th>
              <Th border="1px" borderColor={mode30} w="130px" py={2} px={1}>
                Amount
              </Th>
              <Th border="1px" borderColor={mode30} w="24px" p={0}></Th>
            </Tr>
          </Thead>
          <Tbody>
            {fields.map((_field: any, index: number) => (
              <Tr key={index}>
                <Td p={1}>{index + 1}</Td>
                <Td
                  p={1}
                  border="1px"
                  borderColor={mode30}
                  onClick={() => props.setRowIndex(index)}
                >
                  <Stack spacing={1}>
                    <FormControl>
                      <Controller
                        control={control}
                        name={`sale_item.${index}.item_name`}
                        render={({ field: { value, onChange } }) => (
                          <DownshiftSearchItem
                            items={props.itemData}
                            value={value}
                            onChange={onChange}
                            placeholder="Enter item name"
                            size="xs"
                          />
                        )}
                      />
                    </FormControl>
                    <Controller
                      control={control}
                      name={`sale_item.${index}.item_description`}
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
                <Td
                  p={1}
                  border="1px"
                  borderColor={mode30}
                  onClick={() => props.setRowIndex(index)}
                >
                  <Controller
                    control={control}
                    name={`sale_item.${index}.hsn_code`}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Input
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder=""
                        size="xs"
                      />
                    )}
                  />
                </Td>
                <Td
                  p={1}
                  border="1px"
                  borderColor={mode30}
                  onClick={() => props.setRowIndex(index)}
                >
                  <Controller
                    control={control}
                    name={`sale_item.${index}.quantity`}
                    render={({ field: { value, onChange } }) => (
                      <NumberInput value={value} onChange={onChange} min={1} size="xs">
                        <NumberInputField type="number" />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    )}
                  />
                </Td>
                <Td
                  p={1}
                  border="1px"
                  borderColor={mode30}
                  onClick={() => props.setRowIndex(index)}
                >
                  <Controller
                    control={control}
                    name={`sale_item.${index}.price`}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <InputGroup size="xs">
                        <InputLeftAddon children={'₹'} />
                        <Input value={value} onChange={onChange} onBlur={onBlur} placeholder="0" />
                      </InputGroup>
                    )}
                  />
                </Td>
                <Td
                  p={1}
                  border="1px"
                  borderColor={mode30}
                  onClick={() => props.setRowIndex(index)}
                >
                  <FormControl>
                    <Controller
                      control={control}
                      name={`sale_item.${index}.unit`}
                      render={({ field: { value, onChange } }) => (
                        <DownshiftSelectString
                          items={['Pieces', 'Box']}
                          value={value}
                          onChange={onChange}
                          size="xs"
                        />
                      )}
                    />
                  </FormControl>
                </Td>
                <Td
                  p={1}
                  border="1px"
                  borderColor={mode30}
                  onClick={() => props.setRowIndex(index)}
                >
                  <Stack spacing={1}>
                    <Controller
                      control={control}
                      name={`sale_item.${index}.discount_amount`}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <InputGroup size="xs">
                          <InputLeftAddon children={'₹'} />
                          <Input
                            type="number"
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            placeholder="0"
                          />
                        </InputGroup>
                      )}
                    />
                    <Controller
                      control={control}
                      name={`sale_item.${index}.discount_percent`}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <InputGroup size="xs">
                          <Input
                            type="number"
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            placeholder="0"
                          />
                          <InputRightAddon children={'%'} />
                        </InputGroup>
                      )}
                    />
                  </Stack>
                </Td>
                <Td
                  p={1}
                  border="1px"
                  borderColor={mode30}
                  onClick={() => props.setRowIndex(index)}
                >
                  <Controller
                    control={control}
                    name={`sale_item.${index}.taxable_amount`}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <InputGroup size="xs">
                        <InputLeftAddon children={'₹'} />
                        <Input
                          type="number"
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          placeholder=""
                          readOnly
                        />
                      </InputGroup>
                    )}
                  />
                </Td>
                <Td
                  p={1}
                  border="1px"
                  borderColor={mode30}
                  onClick={() => props.setRowIndex(index)}
                >
                  <Stack spacing={1}>
                    <FormControl>
                      <Controller
                        control={control}
                        name={`sale_item.${index}.tax`}
                        render={({ field: { value, onChange } }) => (
                          <DownshiftSelectString
                            items={TAX_RATES}
                            value={value}
                            onChange={onChange}
                            size="xs"
                          />
                        )}
                      />
                    </FormControl>
                    <Controller
                      control={control}
                      name={`sale_item.${index}.tax_amount`}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <InputGroup size="xs">
                          <InputLeftAddon children={'₹'} />
                          <Input
                            type="number"
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            placeholder="0"
                            readOnly
                          />
                        </InputGroup>
                      )}
                    />
                  </Stack>
                </Td>
                <Td
                  p={1}
                  border="1px"
                  borderColor={mode30}
                  onClick={() => props.setRowIndex(index)}
                >
                  <Controller
                    control={control}
                    name={`sale_item.${index}.amount`}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <InputGroup size="xs">
                        <InputLeftAddon children={'₹'} />
                        <Input
                          type="number"
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          placeholder="0"
                          readOnly
                        />
                      </InputGroup>
                    )}
                  />
                </Td>
                <Td>
                  <IconButton
                    aria-label={''}
                    color="red"
                    size="xs"
                    icon={<RiCloseCircleLine />}
                    onClick={() => remove(index)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Button
          m={2}
          size="sm"
          rounded={0}
          color={modeBrand}
          leftIcon={<RiAddLine />}
          onClick={() => append(defaultValues)}
        >
          Add Item
        </Button>

        <Stack direction="row" spacing={0} borderTop="1px solid" borderColor={mode30}>
          <Stack w="50%" minH="300px" borderRight="1px solid" borderColor={mode30}>
            <Table size="sm">
              <Thead>
                <Tr bg={mode20}>
                  {/* <Th border="1px" borderColor={mode30} w="36px" py={2} px={1}>
                    #
                  </Th> */}
                  <Th border="1px" borderColor={mode30} w="80px" py={2} px={1} textAlign="right">
                    Tax Rate
                  </Th>
                  <Th border="1px" borderColor={mode30} w="120px" py={2} px={1} textAlign="right">
                    Taxable Amt.
                  </Th>
                  <Th border="1px" borderColor={mode30} w="90px" py={2} px={1} textAlign="right">
                    CGST
                  </Th>
                  <Th border="1px" borderColor={mode30} w="90px" py={2} px={1} textAlign="right">
                    SGST
                  </Th>
                  <Th border="1px" borderColor={mode30} w="90px" py={2} px={1} textAlign="right">
                    IGST
                  </Th>
                  <Th border="1px" borderColor={mode30} py={2} px={1} textAlign="right">
                    Total
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {watchFields?.sale_tax?.map((tax: any, index: number) => (
                  <Tr key={index}>
                    {/* <Td p={1} border="1px" fontSize="xs" borderColor={mode30}>
                      {index + 1}
                    </Td> */}
                    <Td
                      px={1}
                      py={2}
                      border="1px"
                      fontSize="xs"
                      borderColor={mode30}
                      textAlign="right"
                    >
                      {tax?.tax_rate} %
                    </Td>
                    <Td
                      px={1}
                      py={2}
                      border="1px"
                      fontSize="xs"
                      borderColor={mode30}
                      textAlign="right"
                    >
                      {parseCurrency(tax?.taxable_amount || 0)}
                    </Td>
                    <Td
                      px={1}
                      py={2}
                      border="1px"
                      fontSize="xs"
                      borderColor={mode30}
                      textAlign="right"
                    >
                      {parseCurrency(tax?.cgst || 0)}
                    </Td>
                    <Td
                      px={1}
                      py={2}
                      border="1px"
                      fontSize="xs"
                      borderColor={mode30}
                      textAlign="right"
                    >
                      {parseCurrency(tax?.sgst || 0)}
                    </Td>
                    <Td
                      px={1}
                      py={2}
                      border="1px"
                      fontSize="xs"
                      borderColor={mode30}
                      textAlign="right"
                    >
                      {parseCurrency(tax?.igst || 0)}
                    </Td>
                    <Td
                      px={1}
                      py={2}
                      border="1px"
                      fontSize="xs"
                      borderColor={mode30}
                      textAlign="right"
                    >
                      {parseCurrency(tax?.total || 0)}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Stack>

          <Stack p={4} w="50%" spacing={4}>
            <Flex justify="space-between">
              <Text fontSize="sm" fontWeight={600}>
                Total Taxable Amount
              </Text>
              <Text fontSize="sm">{parseCurrency(watchFields?.total_taxable_amount || 0)}</Text>
            </Flex>

            <Flex justify="space-between">
              <Text fontSize="sm" fontWeight={600}>
                Total Tax
              </Text>
              <Text fontSize="sm">{parseCurrency(watchFields?.total_tax_amount || 0)}</Text>
            </Flex>

            <Flex justify="space-between">
              <Text fontSize="sm" fontWeight={600}>
                Discount (after tax)
              </Text>

              <Stack w="53%" direction={'row'} spacing={2} align={'center'}>
                <FormControl>
                  <Controller
                    name="discount_amount"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <InputGroup size="sm">
                        <InputLeftAddon children={'₹'} />
                        <Input value={value} onChange={onChange} />
                      </InputGroup>
                    )}
                  />
                </FormControl>
                <FormControl>
                  <Controller
                    name="discount_percent"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <InputGroup size="sm">
                        <Input value={value} onChange={onChange} />
                        <InputRightAddon children={'%'} />
                      </InputGroup>
                    )}
                  />
                </FormControl>
              </Stack>
            </Flex>

            <Stack spacing={4}>
              <Flex>
                <Button
                  px={6}
                  size={'xs'}
                  rounded={0}
                  color={modeBrand}
                  leftIcon={<RiAddLine />}
                  onClick={() => props?.additionalCharge?.append({ name: '', amount: 0 })}
                >
                  Add Additional Charges
                </Button>
              </Flex>
              {props?.additionalCharge?.fields?.map((_field: any, index: number) => (
                <Stack key={index} direction={'row'} spacing={6} align={'end'}>
                  <FormControl w="50%">
                    <FormLabel fontSize={'sm'}>Name</FormLabel>
                    <Controller
                      control={control}
                      name={`sale_additional_charge.${index}.name`}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <Input
                          type="text"
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          size={'sm'}
                        />
                      )}
                    />
                  </FormControl>
                  <FormControl w="50%">
                    <FormLabel fontSize={'sm'}>Amount</FormLabel>
                    <Controller
                      control={control}
                      name={`sale_additional_charge.${index}.amount`}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <InputGroup size={'sm'}>
                          <InputLeftAddon children={'₹'} />
                          <Input type="number" value={value} onChange={onChange} onBlur={onBlur} />
                        </InputGroup>
                      )}
                    />
                  </FormControl>
                  <IconButton
                    aria-label={''}
                    color="red"
                    size="sm"
                    icon={<RiCloseCircleLine />}
                    onClick={() => props?.additionalCharge?.remove(index)}
                  />
                </Stack>
              ))}
            </Stack>

            <Divider my={2} />
            <Flex justify="space-between" align="center">
              <FormControl w="46%">
                <Controller
                  control={control}
                  name={'is_auto_roundoff_enabled'}
                  render={({ field: { value, onChange } }) => (
                    <Checkbox size={'sm'} isChecked={value} onChange={onChange}>
                      Auto Round Off
                    </Checkbox>
                  )}
                />
              </FormControl>
              <FormControl w="53%">
                <Stack direction={'row'} spacing={0}>
                  <Controller
                    control={control}
                    name={'roundoff_amount'}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <InputGroup size="sm">
                        <InputLeftAddon children={'₹'} />
                        <Input type="number" value={value} onChange={onChange} onBlur={onBlur} />
                      </InputGroup>
                    )}
                  />
                  <FormControl>
                    <Controller
                      control={control}
                      name={'roundoff_type'}
                      render={({ field: { value, onChange } }) => (
                        <DownshiftSelectString
                          items={['Add', 'Reduce']}
                          value={value}
                          onChange={onChange}
                          size="sm"
                        />
                      )}
                    />
                  </FormControl>
                </Stack>
              </FormControl>
            </Flex>

            <Divider my={2} />
            <Flex justify="space-between">
              <Text fontSize="sm" fontWeight={600}>
                Total Amount
              </Text>
              <Text fontSize="sm">{parseCurrency(watchFields?.total_amount || 0)}</Text>
            </Flex>

            <Divider my={2} />

            {props?.isTransactional === true && (
              <Stack spacing={4}>
                <Flex justify="space-between" align="center">
                  <Button
                    px={6}
                    size={'xs'}
                    rounded={0}
                    color={modeBrand}
                    leftIcon={<RiAddLine />}
                    onClick={() =>
                      props?.paymentMode?.append({
                        account_name: '',
                        amount: 0,
                        payment_mode: 'Cash'
                      })
                    }
                  >
                    Add Payment Modes
                  </Button>
                  <FormControl w="53%">
                    <Controller
                      control={control}
                      name="is_settled"
                      render={({ field: { value, onChange } }) => (
                        <Checkbox size="sm" isChecked={value} onChange={onChange}>
                          Mark as fully received
                        </Checkbox>
                      )}
                    />
                  </FormControl>
                </Flex>

                {props?.paymentMode?.fields?.map((_field: any, index: number) => (
                  <Stack key={index} direction="row" spacing={6} alignItems="flex-end">
                    <FormControl w="50%">
                      <FormLabel fontSize="sm">Account Name</FormLabel>
                      <Controller
                        name={`sale_payment_mode.${index}.account_name`}
                        control={control}
                        render={({ field: { value, onChange } }) => {
                          return (
                            <DownshiftSelectString
                              items={[]}
                              value={value}
                              onChange={onChange}
                              size="sm"
                            />
                          )
                        }}
                      />
                    </FormControl>
                    <Stack w="50%" direction="row" spacing={0} alignItems="flex-end">
                      <FormControl w="55%">
                        <FormLabel fontSize="sm"> Amount Received</FormLabel>
                        <Controller
                          name={`sale_payment_mode.${index}.amount`}
                          control={control}
                          render={({ field: { value, onChange, onBlur } }) => {
                            return (
                              <InputGroup size="sm">
                                <InputLeftAddon children={'₹'} />
                                <Input
                                  type="number"
                                  value={value}
                                  onChange={onChange}
                                  onBlur={onBlur}
                                />
                              </InputGroup>
                            )
                          }}
                        />
                      </FormControl>
                      <FormControl w="45%">
                        <Controller
                          name={`sale_payment_mode.${index}.payment_mode`}
                          control={control}
                          render={({ field: { value, onChange } }) => {
                            return (
                              <DownshiftSelectString
                                items={PAYMENT_MODES || []}
                                value={value}
                                onChange={onChange}
                                size="sm"
                              />
                            )
                          }}
                        />
                      </FormControl>
                    </Stack>
                    <IconButton
                      aria-label={''}
                      color="red"
                      size="sm"
                      icon={<RiCloseCircleLine />}
                      onClick={() => props?.paymentMode?.remove(index)}
                    />
                  </Stack>
                ))}

                <Divider my={2} />

                <Flex justify="space-between">
                  <Text fontSize="sm" fontWeight={600}>
                    Balance Amount
                  </Text>
                  <Text fontSize="sm">{parseCurrency(watchFields?.balance_amount || 0)}</Text>
                </Flex>

                <Alert p={1} my={4} size="xs" variant="left-accent" colorScheme="gray">
                  <AlertDescription fontSize="xs">
                    Note: Payment in will be recorded for received amount.
                  </AlertDescription>
                </Alert>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}

// import {
//   Alert,
//   AlertDescription,
//   Button,
//   ButtonGroup,
//   Checkbox,
//   Divider,
//   Flex,
//   FormControl,
//   FormLabel,
//   IconButton,
//   Input,
//   InputGroup,
//   InputLeftAddon,
//   InputRightAddon,
//   NumberDecrementStepper,
//   NumberIncrementStepper,
//   NumberInput,
//   NumberInputField,
//   NumberInputStepper,
//   Stack,
//   Switch,
//   Table,
//   Tbody,
//   Td,
//   Text,
//   Textarea,
//   Th,
//   Thead,
//   Tr
// } from '@chakra-ui/react'
// import { Controller } from 'react-hook-form'
// import { RiAddLine, RiCloseCircleLine } from 'react-icons/ri'

// import Container from '@renderer/components/container'
// import Action from '@renderer/components/container/action'
// import DownshiftSearchItem from '@renderer/components/form/downshift_search_item'
// import DownshiftSelectString from '@renderer/components/form/downshift_select_string'
// import { PAYMENT_MODES } from '@renderer/constants/payment_modes'
// import { TAX_RATES } from '@renderer/constants/tax_rates'
// import useThemeMode from '@renderer/hooks/useThemeMode'
// import { parseCurrency } from '@renderer/utils/parse_currency'

// const defaultValues = {
//   item_name: '',
//   item_description: '',
//   hsn_code: '',
//   quantity: 1,
//   price: 0,
//   unit: 'Piece',
//   discount_percent: 0,
//   discount_amount: 0,
//   tax: '',
//   tax_amount: 0,
//   taxable_amount: 0,
//   amount: 0
// }

// export default function ItemTable(props: any) {
//   const { mode20, mode30, modeBrand } = useThemeMode()

//   const { control, watch } = props.form
//   const { fields, append, remove } = props.saleItem

//   const watchFields = watch()

//   return (
//     <Container
//       title={<Text fontSize="sm">Item Details</Text>}
//       action={
//         <Stack direction="row" spacing={6}>
//           <Controller
//             control={control}
//             name="is_scan_item_enabled"
//             render={({ field: { value, onChange } }) => (
//               <Switch size="sm" fontSize="sm" colorScheme="bulb" value={value} onChange={onChange}>
//                 Enable item scan
//               </Switch>
//             )}
//           />
//           <ButtonGroup spacing={4}>
//             <Action actionTitle="Add Multiple Item" actionIcon={<RiAddLine />} />
//           </ButtonGroup>
//         </Stack>
//       }
//     >
//       <Stack spacing={0}>
//         <Table size="sm">
//           <Thead>
//             <Tr bg={mode20}>
//               <Th border="1px" borderColor={mode30} w="36px" py={2} px={1}>
//                 #
//               </Th>
//               <Th border="1px" borderColor={mode30} py={2} px={1}>
//                 Item Description
//               </Th>
//               <Th border="1px" borderColor={mode30} w="100px" py={2} px={1}>
//                 HSN/SAC
//               </Th>
//               <Th border="1px" borderColor={mode30} w="100px" py={2} px={1}>
//                 Quantity
//               </Th>
//               <Th border="1px" borderColor={mode30} w="120px" py={2} px={1}>
//                 Price
//               </Th>
//               <Th border="1px" borderColor={mode30} w="100px" py={2} px={1}>
//                 Unit
//               </Th>
//               <Th border="1px" borderColor={mode30} w="100px" py={2} px={1}>
//                 Discount
//               </Th>
//               <Th border="1px" borderColor={mode30} w="120px" py={2} px={1}>
//                 Taxable Amt.
//               </Th>
//               <Th border="1px" borderColor={mode30} w="150px" py={2} px={1}>
//                 Tax
//               </Th>
//               <Th border="1px" borderColor={mode30} w="130px" py={2} px={1}>
//                 Amount
//               </Th>
//               <Th border="1px" borderColor={mode30} w="24px" p={0}></Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {fields.map((field: any, index: number) => (
//               <Tr key={index}>
//                 <Td p={1}>{index + 1}</Td>
//                 <Td
//                   p={1}
//                   border="1px"
//                   borderColor={mode30}
//                   onClick={() => props.setRowIndex(index)}
//                 >
//                   <Stack spacing={1}>
//                     <FormControl>
//                       <Controller
//                         control={control}
//                         name={`sale_item.${index}.item_name`}
//                         render={({ field: { value, onChange } }) => (
//                           <DownshiftSearchItem
//                             items={props.itemData}
//                             value={value}
//                             onChange={onChange}
//                             placeholder="Enter item name"
//                             size="xs"
//                           />
//                         )}
//                       />
//                     </FormControl>
//                     <Controller
//                       control={control}
//                       name={`sale_item.${index}.item_description`}
//                       render={({ field: { value, onChange, onBlur } }) => (
//                         <Textarea
//                           value={value}
//                           onChange={onChange}
//                           onBlur={onBlur}
//                           resize="none"
//                           rows={2}
//                           placeholder="Enter item description"
//                           size="xs"
//                         />
//                       )}
//                     />
//                   </Stack>
//                 </Td>
//                 <Td
//                   p={1}
//                   border="1px"
//                   borderColor={mode30}
//                   onClick={() => props.setRowIndex(index)}
//                 >
//                   <Controller
//                     control={control}
//                     name={`sale_item.${index}.hsn_code`}
//                     render={({ field: { value, onChange, onBlur } }) => (
//                       <Input
//                         value={value}
//                         onChange={onChange}
//                         onBlur={onBlur}
//                         placeholder=""
//                         size="xs"
//                       />
//                     )}
//                   />
//                 </Td>
//                 <Td
//                   p={1}
//                   border="1px"
//                   borderColor={mode30}
//                   onClick={() => props.setRowIndex(index)}
//                 >
//                   <Controller
//                     control={control}
//                     name={`sale_item.${index}.quantity`}
//                     render={({ field: { value, onChange } }) => (
//                       <NumberInput value={value} onChange={onChange} min={1} size="xs">
//                         <NumberInputField type="number" />
//                         <NumberInputStepper>
//                           <NumberIncrementStepper />
//                           <NumberDecrementStepper />
//                         </NumberInputStepper>
//                       </NumberInput>
//                     )}
//                   />
//                 </Td>
//                 <Td
//                   p={1}
//                   border="1px"
//                   borderColor={mode30}
//                   onClick={() => props.setRowIndex(index)}
//                 >
//                   <Controller
//                     control={control}
//                     name={`sale_item.${index}.price`}
//                     render={({ field: { value, onChange, onBlur } }) => (
//                       <InputGroup size="xs">
//                         <InputLeftAddon children={'₹'} />
//                         <Input value={value} onChange={onChange} onBlur={onBlur} placeholder="0" />
//                       </InputGroup>
//                     )}
//                   />
//                 </Td>
//                 <Td
//                   p={1}
//                   border="1px"
//                   borderColor={mode30}
//                   onClick={() => props.setRowIndex(index)}
//                 >
//                   <FormControl>
//                     <Controller
//                       control={control}
//                       name={`sale_item.${index}.unit`}
//                       render={({ field: { value, onChange } }) => (
//                         <DownshiftSelectString
//                           items={['Pieces', 'Box']}
//                           value={value}
//                           onChange={onChange}
//                           size="xs"
//                         />
//                       )}
//                     />
//                   </FormControl>
//                 </Td>
//                 <Td
//                   p={1}
//                   border="1px"
//                   borderColor={mode30}
//                   onClick={() => props.setRowIndex(index)}
//                 >
//                   <Stack spacing={1}>
//                     <Controller
//                       control={control}
//                       name={`sale_item.${index}.discount_amount`}
//                       render={({ field: { value, onChange, onBlur } }) => (
//                         <InputGroup size="xs">
//                           <InputLeftAddon children={'₹'} />
//                           <Input
//                             type="number"
//                             value={value}
//                             onChange={onChange}
//                             onBlur={onBlur}
//                             placeholder="0"
//                           />
//                         </InputGroup>
//                       )}
//                     />
//                     <Controller
//                       control={control}
//                       name={`sale_item.${index}.discount_percent`}
//                       render={({ field: { value, onChange, onBlur } }) => (
//                         <InputGroup size="xs">
//                           <Input
//                             type="number"
//                             value={value}
//                             onChange={onChange}
//                             onBlur={onBlur}
//                             placeholder="0"
//                           />
//                           <InputRightAddon children={'%'} />
//                         </InputGroup>
//                       )}
//                     />
//                   </Stack>
//                 </Td>
//                 <Td
//                   p={1}
//                   border="1px"
//                   borderColor={mode30}
//                   onClick={() => props.setRowIndex(index)}
//                 >
//                   <Controller
//                     control={control}
//                     name={`sale_item.${index}.taxable_amount`}
//                     render={({ field: { value, onChange, onBlur } }) => (
//                       <InputGroup size="xs">
//                         <InputLeftAddon children={'₹'} />
//                         <Input
//                           type="number"
//                           value={value}
//                           onChange={onChange}
//                           onBlur={onBlur}
//                           placeholder=""
//                           readOnly
//                         />
//                       </InputGroup>
//                     )}
//                   />
//                 </Td>
//                 <Td
//                   p={1}
//                   border="1px"
//                   borderColor={mode30}
//                   onClick={() => props.setRowIndex(index)}
//                 >
//                   <Stack spacing={1}>
//                     <FormControl>
//                       <Controller
//                         control={control}
//                         name={`sale_item.${index}.tax`}
//                         render={({ field: { value, onChange } }) => (
//                           <DownshiftSelectString
//                             items={TAX_RATES}
//                             value={value}
//                             onChange={onChange}
//                             size="xs"
//                           />
//                         )}
//                       />
//                     </FormControl>
//                     <Controller
//                       control={control}
//                       name={`sale_item.${index}.tax_amount`}
//                       render={({ field: { value, onChange, onBlur } }) => (
//                         <InputGroup size="xs">
//                           <InputLeftAddon children={'₹'} />
//                           <Input
//                             type="number"
//                             value={value}
//                             onChange={onChange}
//                             onBlur={onBlur}
//                             placeholder="0"
//                             readOnly
//                           />
//                         </InputGroup>
//                       )}
//                     />
//                   </Stack>
//                 </Td>
//                 <Td
//                   p={1}
//                   border="1px"
//                   borderColor={mode30}
//                   onClick={() => props.setRowIndex(index)}
//                 >
//                   <Controller
//                     control={control}
//                     name={`sale_item.${index}.amount`}
//                     render={({ field: { value, onChange, onBlur } }) => (
//                       <InputGroup size="xs">
//                         <InputLeftAddon children={'₹'} />
//                         <Input
//                           type="number"
//                           value={value}
//                           onChange={onChange}
//                           onBlur={onBlur}
//                           placeholder="0"
//                           readOnly
//                         />
//                       </InputGroup>
//                     )}
//                   />
//                 </Td>
//                 <Td>
//                   <IconButton
//                     aria-label={''}
//                     color="red"
//                     size="xs"
//                     icon={<RiCloseCircleLine />}
//                     onClick={() => remove(index)}
//                   />
//                 </Td>
//               </Tr>
//             ))}
//           </Tbody>
//         </Table>

//         <Button
//           m={2}
//           size="sm"
//           rounded={0}
//           color={modeBrand}
//           leftIcon={<RiAddLine />}
//           onClick={() => append(defaultValues)}
//         >
//           Add Item
//         </Button>

//         <Stack direction="row" spacing={0} borderTop="1px solid" borderColor={mode30}>
//           <Stack w="50%" minH="300px" borderRight="1px solid" borderColor={mode30}>
//             <Table size="sm">
//               <Thead>
//                 <Tr bg={mode20}>
//                   {/* <Th border="1px" borderColor={mode30} w="36px" py={2} px={1}>
//                     #
//                   </Th> */}
//                   <Th border="1px" borderColor={mode30} w="80px" py={2} px={1} textAlign="right">
//                     Tax Rate
//                   </Th>
//                   <Th border="1px" borderColor={mode30} w="120px" py={2} px={1} textAlign="right">
//                     Taxable Amt.
//                   </Th>
//                   <Th border="1px" borderColor={mode30} w="90px" py={2} px={1} textAlign="right">
//                     CGST
//                   </Th>
//                   <Th border="1px" borderColor={mode30} w="90px" py={2} px={1} textAlign="right">
//                     SGST
//                   </Th>
//                   <Th border="1px" borderColor={mode30} w="90px" py={2} px={1} textAlign="right">
//                     IGST
//                   </Th>
//                   <Th border="1px" borderColor={mode30} py={2} px={1} textAlign="right">
//                     Total
//                   </Th>
//                 </Tr>
//               </Thead>
//               <Tbody>
//                 {watchFields?.sale_tax?.map((tax: any, index: number) => (
//                   <Tr key={index}>
//                     {/* <Td p={1} border="1px" fontSize="xs" borderColor={mode30}>
//                       {index + 1}
//                     </Td> */}
//                     <Td
//                       px={1}
//                       py={2}
//                       border="1px"
//                       fontSize="xs"
//                       borderColor={mode30}
//                       textAlign="right"
//                     >
//                       {tax?.tax_rate} %
//                     </Td>
//                     <Td
//                       px={1}
//                       py={2}
//                       border="1px"
//                       fontSize="xs"
//                       borderColor={mode30}
//                       textAlign="right"
//                     >
//                       {parseCurrency(tax?.taxable_amount || 0)}
//                     </Td>
//                     <Td
//                       px={1}
//                       py={2}
//                       border="1px"
//                       fontSize="xs"
//                       borderColor={mode30}
//                       textAlign="right"
//                     >
//                       {parseCurrency(tax?.cgst || 0)}
//                     </Td>
//                     <Td
//                       px={1}
//                       py={2}
//                       border="1px"
//                       fontSize="xs"
//                       borderColor={mode30}
//                       textAlign="right"
//                     >
//                       {parseCurrency(tax?.sgst || 0)}
//                     </Td>
//                     <Td
//                       px={1}
//                       py={2}
//                       border="1px"
//                       fontSize="xs"
//                       borderColor={mode30}
//                       textAlign="right"
//                     >
//                       {parseCurrency(tax?.igst || 0)}
//                     </Td>
//                     <Td
//                       px={1}
//                       py={2}
//                       border="1px"
//                       fontSize="xs"
//                       borderColor={mode30}
//                       textAlign="right"
//                     >
//                       {parseCurrency(tax?.total || 0)}
//                     </Td>
//                   </Tr>
//                 ))}
//               </Tbody>
//             </Table>
//           </Stack>

//           <Stack p={4} w="50%" spacing={4}>
//             <Flex justify="space-between">
//               <Text fontSize="sm" fontWeight={600}>
//                 Total Taxable Amount
//               </Text>
//               <Text fontSize="sm">{parseCurrency(watchFields?.total_taxable_amount || 0)}</Text>
//             </Flex>

//             <Flex justify="space-between">
//               <Text fontSize="sm" fontWeight={600}>
//                 Total Tax
//               </Text>
//               <Text fontSize="sm">{parseCurrency(watchFields?.total_tax_amount || 0)}</Text>
//             </Flex>

//             <Flex justify="space-between">
//               <Text fontSize="sm" fontWeight={600}>
//                 Discount (after tax)
//               </Text>

//               <Stack w="53%" direction={'row'} spacing={2} align={'center'}>
//                 <FormControl>
//                   <Controller
//                     name="discount_amount"
//                     control={control}
//                     render={({ field: { value, onChange } }) => (
//                       <InputGroup size="sm">
//                         <InputLeftAddon children={'₹'} />
//                         <Input value={value} onChange={onChange} />
//                       </InputGroup>
//                     )}
//                   />
//                 </FormControl>
//                 <FormControl>
//                   <Controller
//                     name="discount_percent"
//                     control={control}
//                     render={({ field: { value, onChange } }) => (
//                       <InputGroup size="sm">
//                         <Input value={value} onChange={onChange} />
//                         <InputRightAddon children={'%'} />
//                       </InputGroup>
//                     )}
//                   />
//                 </FormControl>
//               </Stack>
//             </Flex>

//             <Stack spacing={4}>
//               <Flex>
//                 <Button
//                   px={6}
//                   size={'xs'}
//                   rounded={0}
//                   color={modeBrand}
//                   leftIcon={<RiAddLine />}
//                   onClick={() => props?.additionalCharge?.append({ name: '', amount: 0 })}
//                 >
//                   Add Additional Charges
//                 </Button>
//               </Flex>
//               {props?.additionalCharge?.fields?.map((field: any, index: number) => (
//                 <Stack key={index} direction={'row'} spacing={6} align={'end'}>
//                   <FormControl w="50%">
//                     <FormLabel fontSize={'sm'}>Name</FormLabel>
//                     <Controller
//                       control={control}
//                       name={`sale_additional_charge.${index}.name`}
//                       render={({ field: { value, onChange, onBlur } }) => (
//                         <Input
//                           type="text"
//                           value={value}
//                           onChange={onChange}
//                           onBlur={onBlur}
//                           size={'sm'}
//                         />
//                       )}
//                     />
//                   </FormControl>
//                   <FormControl w="50%">
//                     <FormLabel fontSize={'sm'}>Amount</FormLabel>
//                     <Controller
//                       control={control}
//                       name={`sale_additional_charge.${index}.amount`}
//                       render={({ field: { value, onChange, onBlur } }) => (
//                         <InputGroup size={'sm'}>
//                           <InputLeftAddon children={'₹'} />
//                           <Input type="number" value={value} onChange={onChange} onBlur={onBlur} />
//                         </InputGroup>
//                       )}
//                     />
//                   </FormControl>
//                   <IconButton
//                     aria-label={''}
//                     color="red"
//                     size="sm"
//                     icon={<RiCloseCircleLine />}
//                     onClick={() => props?.additionalCharge?.remove(index)}
//                   />
//                 </Stack>
//               ))}
//             </Stack>

//             <Divider my={2} />
//             <Flex justify="space-between" align="center">
//               <FormControl w="46%">
//                 <Controller
//                   control={control}
//                   name={'is_auto_roundoff_enabled'}
//                   render={({ field: { value, onChange } }) => (
//                     <Checkbox size={'sm'} isChecked={value} onChange={onChange}>
//                       Auto Round Off
//                     </Checkbox>
//                   )}
//                 />
//               </FormControl>
//               <FormControl w="53%">
//                 <Stack direction={'row'} spacing={0}>
//                   <Controller
//                     control={control}
//                     name={'roundoff_amount'}
//                     render={({ field: { value, onChange, onBlur } }) => (
//                       <InputGroup size="sm">
//                         <InputLeftAddon children={'₹'} />
//                         <Input type="number" value={value} onChange={onChange} onBlur={onBlur} />
//                       </InputGroup>
//                     )}
//                   />
//                   <FormControl>
//                     <Controller
//                       control={control}
//                       name={'roundoff_type'}
//                       render={({ field: { value, onChange } }) => (
//                         <DownshiftSelectString
//                           items={['Add', 'Reduce']}
//                           value={value}
//                           onChange={onChange}
//                           size="sm"
//                         />
//                       )}
//                     />
//                   </FormControl>
//                 </Stack>
//               </FormControl>
//             </Flex>

//             <Divider my={2} />
//             <Flex justify="space-between">
//               <Text fontSize="sm" fontWeight={600}>
//                 Total Amount
//               </Text>
//               <Text fontSize="sm">{parseCurrency(watchFields?.total_amount || 0)}</Text>
//             </Flex>

//             <Divider my={2} />

//             {props?.isTransactional === true && (
//               <Stack spacing={4}>
//                 <Flex justify="space-between" align="center">
//                   <Button
//                     px={6}
//                     size={'xs'}
//                     rounded={0}
//                     color={modeBrand}
//                     leftIcon={<RiAddLine />}
//                     onClick={() =>
//                       props?.paymentMode?.append({
//                         account_name: '',
//                         amount: 0,
//                         payment_type: 'Cash'
//                       })
//                     }
//                   >
//                     Add Payment Modes
//                   </Button>
//                   {/* <FormControl w="53%">
//                     <Controller
//                       control={control}
//                       name="is_fully_received"
//                       render={({ field: { value, onChange } }) => (
//                         <Checkbox size="sm" isChecked={value} onChange={onChange}>
//                           Mark as fully received
//                         </Checkbox>
//                       )}
//                     />
//                   </FormControl> */}
//                 </Flex>

//                 {props?.paymentMode?.fields?.map((field: any, index: number) => (
//                   <Stack key={index} direction="row" spacing={6} alignItems="flex-end">
//                     <FormControl w="50%">
//                       <FormLabel fontSize="sm">Account Name</FormLabel>
//                       <Controller
//                         name={`sale_payment_mode.${index}.account_name`}
//                         control={control}
//                         render={({ field: { value, onChange } }) => {
//                           return (
//                             <DownshiftSelectString
//                               items={[]}
//                               value={value}
//                               onChange={onChange}
//                               size="sm"
//                             />
//                           )
//                         }}
//                       />
//                     </FormControl>
//                     <Stack w="50%" direction="row" spacing={0} alignItems="flex-end">
//                       <FormControl w="55%">
//                         <FormLabel fontSize="sm"> Amount Received</FormLabel>
//                         <Controller
//                           name={`sale_payment_mode.${index}.amount`}
//                           control={control}
//                           render={({ field: { value, onChange, onBlur } }) => {
//                             return (
//                               <InputGroup size="sm">
//                                 <InputLeftAddon children={'₹'} />
//                                 <Input
//                                   type="number"
//                                   value={value}
//                                   onChange={onChange}
//                                   onBlur={onBlur}
//                                 />
//                               </InputGroup>
//                             )
//                           }}
//                         />
//                       </FormControl>
//                       <FormControl w="45%">
//                         <Controller
//                           name={`sale_payment_mode.${index}.payment_type`}
//                           control={control}
//                           render={({ field: { value, onChange } }) => {
//                             return (
//                               <DownshiftSelectString
//                                 items={PAYMENT_MODES || []}
//                                 value={value}
//                                 onChange={onChange}
//                                 size="sm"
//                               />
//                             )
//                           }}
//                         />
//                       </FormControl>
//                     </Stack>
//                     <IconButton
//                       aria-label={''}
//                       color="red"
//                       size="sm"
//                       icon={<RiCloseCircleLine />}
//                       onClick={() => props?.paymentMode?.remove(index)}
//                     />
//                   </Stack>
//                 ))}

//                 <Divider my={2} />

//                 <Flex justify="space-between">
//                   <Text fontSize="sm" fontWeight={600}>
//                     Balance Amount
//                   </Text>
//                   <Text fontSize="sm">{parseCurrency(watchFields?.balance_amount || 0)}</Text>
//                 </Flex>

//                 <Alert p={1} my={4} size="xs" variant="left-accent" colorScheme="gray">
//                   <AlertDescription fontSize="xs">
//                     Note: Payment in will be recorded for received amount.
//                   </AlertDescription>
//                 </Alert>
//               </Stack>
//             )}
//           </Stack>
//         </Stack>
//       </Stack>
//     </Container>
//   )
// }
