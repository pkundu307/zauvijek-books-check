/**
 * ----------------------------------------------------------------------
 *  LIBRARIES
 * ----------------------------------------------------------------------
 */

import {
  Flex,
  Stack,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  ButtonGroup,
  Button,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  Textarea,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Switch
} from '@chakra-ui/react'
import {
  RiGroup2Line,
  RiArrowRightSLine,
  RiCheckboxCircleLine,
  RiAddLine,
  RiListCheck,
  RiCalendar2Line
} from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { Controller } from 'react-hook-form'

/**
 * ----------------------------------------------------------------------
 *  MODULES
 * ----------------------------------------------------------------------
 */
import AppLayout from '@renderer/layouts/app'
import useThemeMode from '@renderer/hooks/useThemeMode'
import Container from '@renderer/components/container'
import DownshiftSelect from '@renderer/components/downshift_select'
import NoData from '@renderer/components/no_data'
import Action from '@renderer/components/container/action'
import SelectDate from '@renderer/components/select_date'

export default function FormCustomerView(props: any) {
  /**
   * ----------------------------------------------------------------------
   *  CUSTOM HOOKS START
   *
   */

  const { control, handleSubmit } = props.form

  /**
   *
   *  CUSTOM HOOKS END
   * ----------------------------------------------------------------------
   */

  /**
   * ----------------------------------------------------------------------
   *  CUSTOM HOOKS START
   *
   */

  const { mode20, modeBrand } = useThemeMode()

  /**
   *
   *  CUSTOM HOOKS END
   * ----------------------------------------------------------------------
   */

  return (
    <AppLayout>
      <Flex py={2} justify="space-between" align="flex-start">
        <Stack direction="row" align="center" spacing={2}>
          <RiGroup2Line size="18px" />
          <Breadcrumb separator={<RiArrowRightSLine />}>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Parties</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/customer">
                Customers
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink isCurrentPage>{props.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Stack>

        <ButtonGroup spacing={2}>
          <Button
            px={4}
            size={'sm'}
            color={modeBrand}
            rounded={0}
            colorScheme={'gray'}
            leftIcon={<RiCheckboxCircleLine />}
            onClick={handleSubmit(props.handleSave)}
          >
            Save
          </Button>
        </ButtonGroup>
      </Flex>

      <form>
        <Grid templateColumns={'repeat(2, 1fr)'} templateRows={'repeat(1, 1fr)'} gap={4}>
          <GridItem colSpan={1}>
            <Container title={<Text fontSize="sm">General Details</Text>}>
              <Stack p={4} spacing={6}>
                <Stack direction="row" spacing={4}>
                  <FormControl>
                    <FormLabel fontSize="sm">Customer Type</FormLabel>
                    <Controller
                      control={control}
                      name="is_business"
                      render={({ field: { value, onChange } }) => {
                        const party_form = value ? 'business' : 'individual'
                        return (
                          <RadioGroup
                            value={party_form}
                            onChange={(value) => {
                              onChange(value === 'business' ? true : false)
                            }}
                            size="sm"
                          >
                            <Stack direction="row" spacing={6}>
                              <Radio value={'business'}>Business</Radio>
                              <Radio value={'individual'}>Individual</Radio>
                            </Stack>
                          </RadioGroup>
                        )
                      }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="sm">Business name</FormLabel>
                    <Controller
                      control={control}
                      name="business_name"
                      render={({ field: { value, onChange, onBlur } }) => (
                        <Input
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          placeholder="Enter business name"
                          size="sm"
                        />
                      )}
                    />
                  </FormControl>
                </Stack>

                <Stack direction="row" spacing={4}>
                  <FormControl>
                    <FormLabel fontSize="sm">
                      Customer name <span style={{ color: 'red' }}>*</span>
                    </FormLabel>
                    <Controller
                      control={control}
                      name="party_name"
                      render={({ field: { value, onChange, onBlur } }) => (
                        <Input
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          placeholder="Enter customer name"
                          size="sm"
                        />
                      )}
                    />
                  </FormControl>
                  <FormControl>
                    <Flex justify="space-between">
                      <FormLabel fontSize="sm">Category</FormLabel>
                      <ButtonGroup spacing={4}>
                        <Action actionTitle="Create" actionIcon={<RiAddLine />} />
                      </ButtonGroup>
                    </Flex>
                    <Controller
                      control={control}
                      name="party_category"
                      render={({ field: { value, onChange } }) => (
                        <DownshiftSelect
                          items={[{ title: 'Wholeseller' }, { title: 'Retailer' }]}
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </FormControl>
                </Stack>

                <Stack direction="row" spacing={4}>
                  <FormControl>
                    <FormLabel fontSize="sm">Phone number</FormLabel>
                    <Controller
                      control={control}
                      name="phone_no"
                      render={({ field: { value, onChange, onBlur } }) => (
                        <InputGroup size="sm">
                          <InputLeftAddon children={'+91'} />
                          <Input
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            placeholder="Enter phone number"
                            size="sm"
                          />
                        </InputGroup>
                      )}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="sm">Alternate Phone Number</FormLabel>
                    <Controller
                      control={control}
                      name="phone_no_alt"
                      render={({ field: { value, onChange, onBlur } }) => (
                        <InputGroup size="sm">
                          <InputLeftAddon children={'+91'} />
                          <Input
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            placeholder="Enter phone number"
                            size="sm"
                          />
                        </InputGroup>
                      )}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="sm">Email</FormLabel>
                    <Controller
                      control={control}
                      name="email"
                      render={({ field: { value, onChange, onBlur } }) => (
                        <Input
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          placeholder="Enter email"
                          size="sm"
                        />
                      )}
                    />
                  </FormControl>
                </Stack>
              </Stack>
            </Container>
          </GridItem>

          <GridItem colSpan={1}>
            <Container
              title={<Text fontSize="sm">Address Details</Text>}
              action={
                <Controller
                  control={control}
                  name="is_billing_shipping_same"
                  render={({ field: { value, onChange } }) => (
                    <Switch
                      size="sm"
                      fontSize="sm"
                      colorScheme="green"
                      value={value}
                      onChange={onChange}
                    >
                      Shipping & blling address is same
                    </Switch>
                  )}
                />
              }
            >
              <Stack p={4} spacing={6}>
                <Stack spacing={4}>
                  <FormControl>
                    <Flex justify="space-between">
                      <FormLabel fontSize="sm">Billing Address</FormLabel>
                      <ButtonGroup spacing={4}>
                        <Action actionTitle="Create" actionIcon={<RiAddLine />} />
                      </ButtonGroup>
                    </Flex>
                    <Controller
                      control={control}
                      name="billing_address"
                      render={({ field: { value, onChange, onBlur } }) => (
                        <Textarea
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          rows={3}
                          size="sm"
                          resize="none"
                        />
                      )}
                    />
                  </FormControl>
                  <FormControl>
                    <Flex justify="space-between">
                      <FormLabel fontSize="sm">Shipping Address</FormLabel>
                      <ButtonGroup spacing={4}>
                        <Action actionTitle="Select" actionIcon={<RiListCheck />} />
                        <Action actionTitle="Create" actionIcon={<RiAddLine />} />
                      </ButtonGroup>
                    </Flex>
                    <Controller
                      control={control}
                      name="shipping_address"
                      render={({ field: { value, onChange, onBlur } }) => (
                        <Textarea
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          rows={3}
                          size="sm"
                          resize="none"
                        />
                      )}
                    />
                  </FormControl>
                </Stack>
              </Stack>
            </Container>
          </GridItem>

          <GridItem colSpan={1}>
            <Container title={<Text fontSize="sm">Payment Details</Text>}>
              <Stack p={4} spacing={6}>
                <Stack direction="row" spacing={4}>
                  <Stack w="100%" direction="row" align="center" spacing={0}>
                    <FormControl w="60%">
                      <FormLabel fontSize="sm">Opening balance</FormLabel>
                      <Controller
                        control={control}
                        name="opening_balance"
                        render={({ field: { value, onChange, onBlur } }) => (
                          <InputGroup size="sm">
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
                    </FormControl>
                    <FormControl w="40%">
                      <FormLabel my={7} />
                      <Controller
                        control={control}
                        name="opening_balance_type"
                        render={({ field: { value, onChange } }) => (
                          <DownshiftSelect
                            items={[{ title: 'To collect' }, { title: 'To pay' }]}
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />
                    </FormControl>
                  </Stack>
                  <FormControl>
                    <FormLabel fontSize="sm">Opening balance date</FormLabel>
                    <Controller
                      control={control}
                      name="opening_balance_date"
                      render={({ field: { value, onChange } }) => (
                        <InputGroup size="sm" zIndex={2}>
                          <InputLeftAddon children={<RiCalendar2Line />} bg={mode20} />
                          <SelectDate value={value} onChange={onChange} />
                        </InputGroup>
                      )}
                    />
                  </FormControl>
                </Stack>

                <Stack direction="row" spacing={4}>
                  <FormControl>
                    <FormLabel fontSize="sm">Credit Period</FormLabel>
                    <Controller
                      control={control}
                      name="credit_period"
                      render={({ field: { value, onChange, onBlur } }) => (
                        <InputGroup size="sm">
                          <Input
                            type="number"
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            placeholder="0"
                          />
                          <InputRightAddon children={'Days'} />
                        </InputGroup>
                      )}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="sm">Credit Limit</FormLabel>
                    <Stack direction="row" spacing={0}>
                      <Controller
                        control={control}
                        name="credit_limit"
                        render={({ field: { value, onChange, onBlur } }) => (
                          <InputGroup size="sm">
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
                    </Stack>
                  </FormControl>
                </Stack>
              </Stack>
            </Container>
          </GridItem>

          <GridItem colSpan={1}>
            <Container title={<Text fontSize="sm">Tax Details</Text>}>
              <Stack p={4} spacing={6}>
                <Stack direction="row" spacing={4}>
                  <FormControl>
                    <FormLabel fontSize="sm">Tax ID / GST Number</FormLabel>
                    <Controller
                      control={control}
                      name="tax_id"
                      render={({ field: { value, onChange, onBlur } }) => (
                        <Input
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          placeholder="Enter tax id or GST number"
                          size="sm"
                        />
                      )}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="sm">PAN Number</FormLabel>
                    <Controller
                      control={control}
                      name="pan_no"
                      render={({ field: { value, onChange, onBlur } }) => (
                        <Input
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          placeholder="Enter pan number"
                          size="sm"
                        />
                      )}
                    />
                  </FormControl>
                </Stack>

                <Stack direction="row" spacing={4}>
                  <FormControl>
                    <FormLabel fontSize="sm">TAN Number</FormLabel>
                    <Controller
                      control={control}
                      name="tan_no"
                      render={({ field: { value, onChange, onBlur } }) => (
                        <Input
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          placeholder="Enter tan number"
                          size="sm"
                        />
                      )}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="sm">Place of supply</FormLabel>
                    <Controller
                      control={control}
                      name="place_of_supply"
                      render={({ field: { value, onChange } }) => (
                        <DownshiftSelect
                          items={[{ title: 'Bihar' }, { title: 'Delhi' }]}
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </FormControl>
                </Stack>
              </Stack>
            </Container>
          </GridItem>

          <GridItem colSpan={1}>
            <Container title={<Text fontSize="sm">Notes</Text>}>
              <Stack>
                <FormControl>
                  <Controller
                    control={control}
                    name="notes"
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Textarea
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder="Enter notes"
                        resize="none"
                        rows={5}
                        size="sm"
                        style={{ border: 'none', borderRadius: 0 }}
                      />
                    )}
                  />
                </FormControl>
              </Stack>
            </Container>
          </GridItem>

          <GridItem colSpan={1}>
            <Container
              title={<Text fontSize="sm">Custom Field Details</Text>}
              action={
                <ButtonGroup spacing={4}>
                  <Action actionTitle="Create" actionIcon={<RiAddLine />} />
                </ButtonGroup>
              }
            >
              <Stack p={4} spacing={6}>
                <NoData />
              </Stack>
            </Container>
          </GridItem>
        </Grid>
      </form>
    </AppLayout>
  )
}
