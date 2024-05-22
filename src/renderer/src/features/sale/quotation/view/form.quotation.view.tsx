/**
 * ----------------------------------------------------------------------
 *  NPM MODULES START
 *
 */

import {
  Flex,
  Stack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  Grid,
  GridItem,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Switch,
  InputRightAddon,
  Image,
  Avatar,
  Textarea,
  Button,
  Divider
} from '@chakra-ui/react'
import {
  RiAddLine,
  RiArrowRightSLine,
  RiCalendar2Line,
  RiCheckboxCircleLine,
  RiFundsLine,
  RiListCheck,
  RiSettings3Line,
  RiStore2Line
} from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { Controller } from 'react-hook-form'

/**
 *
 *  NPM MODULES END
 * ----------------------------------------------------------------------
 */

/**
 * ----------------------------------------------------------------------
 *  CUSTOM MODULES START
 *
 */

import AppLayout from '@renderer/layouts/app'
import useThemeMode from '@renderer/hooks/useThemeMode'
import Container from '@renderer/components/container'
import NoData from '@renderer/components/no_data'
import Action from '@renderer/components/container/action'
import ItemTable from '@renderer/components/table/item_table'
import SelectDate from '@renderer/components/form/select_date'
import DownshiftSearchParty from '@renderer/components/form/downshift_search_party'

/**
 *
 *  CUSTOM MODULES END
 * ----------------------------------------------------------------------
 */

export default function FormQuotationView(props: any) {
  /**
   * ----------------------------------------------------------------------
   *  LIBRARY HOOKS START
   *
   */

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    formState: { errors }
  } = props.form
  const enable_due_date = watch('is_due_date_enabled')
  const party_name = watch('party_name')
  /**
   *
   *  LIBRARY HOOKS END
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

  /**
   * ----------------------------------------------------------------------
   *  RENDERING START
   *
   */

  return (
    <AppLayout>
      <Flex p={4} justify="space-between" align="center">
        <Stack direction="row" align="center" spacing={2}>
          <RiFundsLine size="18px" />
          <Breadcrumb separator={<RiArrowRightSLine />}>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Sales</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/quotation">
                Quotation
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
            size="sm"
            rounded={0}
            color={modeBrand}
            colorScheme="gray"
            leftIcon={<RiSettings3Line />}
          >
            Settings
          </Button>
          <Button
            px={4}
            size={'sm'}
            color={modeBrand}
            rounded={0}
            colorScheme="gray"
            leftIcon={<RiCheckboxCircleLine />}
            onClick={handleSubmit(props.handleSave)}
          >
            Save
          </Button>
        </ButtonGroup>
      </Flex>

      <Grid
        templateColumns={'repeat(2, 1fr)'}
        templateRows={'repeat(1, 1fr)'}
        gap={4}
        px={4}
        maxH={'82vh'}
        overflowY={'scroll'}
      >
        <GridItem colSpan={1}>
          <Container title={<Text fontSize="sm">Compnay Details</Text>}>
            <Stack p={4} spacing={6} minH="178px">
              <Stack direction="row" spacing={4}>
                {props?.business_logo_url ? (
                  <Image src={props?.business_logo_url?.url} h={'30px'} />
                ) : (
                  <Avatar icon={<RiStore2Line />} size={'xl'} rounded={'sm'} />
                )}
                <Image />

                <Stack direction="row" spacing={12}>
                  <Stack spacing={1}>
                    <Text fontSize="sm">Business Name:</Text>
                    <Text fontSize="sm">Address:</Text>
                    <Text fontSize="sm">Phone No.:</Text>
                    <Text fontSize="sm">GST No.:</Text>
                    <Text fontSize="sm">PAN No:</Text>
                  </Stack>
                  <Stack spacing={1}>
                    <Text fontWeight={600}>Zauvijek Tech Pvt. Ltd.</Text>
                    <Text fontSize="sm">{getValues('billing_address') || '-'}</Text>
                    <Text fontSize="sm">{getValues('phone_no') || '-'}</Text>
                    <Text fontSize="sm">{getValues('tax_id') || '-'}</Text>
                    <Text fontSize="sm">{getValues('pan_no') || '-'}</Text>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Container>
        </GridItem>

        <GridItem colSpan={1}>
          <Container
            title={<Text fontSize="sm">Invoice Details</Text>}
            action={
              <Controller
                control={control}
                name="is_due_date_enabled"
                render={({ field: { value, onChange } }) => (
                  <Switch
                    size="sm"
                    fontSize="sm"
                    colorScheme="bulb"
                    value={value}
                    onChange={onChange}
                  >
                    Enable due date
                  </Switch>
                )}
              />
            }
          >
            <Stack p={4} spacing={6}>
              <Stack direction="row" spacing={4}>
                <FormControl>
                  <FormLabel fontSize="sm">Quotation Prefix</FormLabel>
                  <Controller
                    control={control}
                    name="invoice_prefix"
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Input
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder=""
                        size="sm"
                      />
                    )}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm">Quotation No.</FormLabel>
                  <Controller
                    control={control}
                    name="invoice_no"
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Input
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder=""
                        size="sm"
                      />
                    )}
                    rules={{ required: true }}
                  />
                  {errors.invoice_no && <Text color={'red'}>Invoice No. Requeired</Text>}
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm">Quotation Date</FormLabel>
                  <Controller
                    control={control}
                    name="invoice_date"
                    render={({ field: { value, onChange } }) => (
                      <InputGroup size="sm" zIndex={2}>
                        <InputLeftAddon children={<RiCalendar2Line />} bg={mode20} />
                        <SelectDate value={value} onChange={onChange} />
                      </InputGroup>
                    )}
                  />
                </FormControl>
              </Stack>

              {enable_due_date && (
                <Stack direction="row" spacing={4}>
                  <FormControl>
                    <FormLabel fontSize="sm">Due Date</FormLabel>
                    <Controller
                      control={control}
                      name="due_date"
                      render={({ field: { value, onChange } }) => (
                        <InputGroup size="sm" zIndex={2}>
                          <InputLeftAddon children={<RiCalendar2Line />} bg={mode20} />
                          <SelectDate value={value} onChange={onChange} />
                        </InputGroup>
                      )}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="sm">Payment Terms</FormLabel>
                    <Controller
                      control={control}
                      name="payment_term"
                      render={({ field: { value, onChange, onBlur } }) => (
                        <InputGroup size="sm">
                          <Input
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            placeholder=""
                            size="sm"
                          />
                          <InputRightAddon children={'Days'} />
                        </InputGroup>
                      )}
                    />
                  </FormControl>
                  <FormControl />
                </Stack>
              )}
            </Stack>
          </Container>
        </GridItem>

        <GridItem colSpan={2}>
          <Container
            title={<Text fontSize="sm">Party Details</Text>}
            action={
              <ButtonGroup spacing={4}>
                <Action actionTitle="Add Party" actionIcon={<RiAddLine />} />
              </ButtonGroup>
            }
          >
            <Stack direction="row" p={4} spacing={4}>
              <FormControl w="33%">
                <FormLabel fontSize="sm">Party Name</FormLabel>
                <Controller
                  control={control}
                  name="party_name"
                  render={({ field: { value, onChange } }) => (
                    <DownshiftSearchParty
                      items={props.partyData || []}
                      value={value}
                      onChange={onChange}
                      placeholder="Enter party name"
                      size="sm"
                    />
                  )}
                  rules={{ required: true }}
                />
                {errors.party_name && <Text color={'red'}>Party Name Requeired</Text>}
              </FormControl>
              <Divider orientation="vertical" h="200px" />
              {!party_name && (
                <Flex w="67%" justify="center">
                  <NoData title="No party selected." />
                </Flex>
              )}
              {party_name && (
                <Stack w="33%">
                  <Text fontSize="sm" fontWeight={600}>
                    Bill To
                  </Text>
                  <Stack direction="row" spacing={6}>
                    <Stack spacing={1}>
                      <Text fontSize="sm">Party Name:</Text>
                      <Text fontSize="sm">Business Name:</Text>
                      <Text fontSize="sm">Billing Address:</Text>
                      <Text fontSize="sm">Phone No.:</Text>
                      <Text fontSize="sm">GST No.:</Text>
                      <Text fontSize="sm">PAN No:</Text>
                      <Text fontSize="sm">Place of Supply:</Text>
                    </Stack>
                    <Stack spacing={1}>
                      <Text fontSize="sm">{getValues('party_name') || '-'}</Text>
                      <Text fontSize="sm">{getValues('business_name') || '-'}</Text>
                      <Text fontSize="sm">{getValues('billing_address') || '-'}</Text>
                      <Text fontSize="sm">{getValues('phone_no') || '-'}</Text>
                      <Text fontSize="sm">{getValues('tax_id') || '-'}</Text>
                      <Text fontSize="sm">{getValues('pan_no') || '-'}</Text>
                      <Text fontSize="sm">{getValues('place_of_supply') || '-'}</Text>
                    </Stack>
                  </Stack>
                </Stack>
              )}
              {party_name && (
                <Stack w="33%">
                  <Text fontSize="sm" fontWeight={600}>
                    Ship To
                  </Text>
                  <Stack direction="row" spacing={6}>
                    <Stack spacing={1}>
                      <Text fontSize="sm">Party Name:</Text>
                      <Text fontSize="sm">Business Name:</Text>
                      <Text fontSize="sm">Shipping Address:</Text>
                      <Text fontSize="sm">Phone No.:</Text>
                      <Text fontSize="sm">GST No.:</Text>
                      <Text fontSize="sm">PAN No:</Text>
                      <Text fontSize="sm">Place of Supply:</Text>
                    </Stack>
                    <Stack spacing={1}>
                      <Text fontSize="sm">{getValues('party_name') || '-'}</Text>
                      <Text fontSize="sm">{getValues('business_name') || '-'}</Text>
                      <Text fontSize="sm">{getValues('shipping_address') || '-'}</Text>
                      <Text fontSize="sm">{getValues('phone_no') || '-'}</Text>
                      <Text fontSize="sm">{getValues('tax_id') || '-'}</Text>
                      <Text fontSize="sm">{getValues('pan_no') || '-'}</Text>
                      <Text fontSize="sm">{getValues('place_of_supply') || '-'}</Text>
                    </Stack>
                  </Stack>
                </Stack>
              )}
            </Stack>
          </Container>
        </GridItem>

        <GridItem colSpan={2}>
          <ItemTable isTransactional={true} {...props} />
        </GridItem>

        <GridItem rowSpan={2} colSpan={1}>
          <Container
            title={<Text fontSize="sm">Terms & Conditions</Text>}
            action={
              <ButtonGroup spacing={4}>
                <Action actionTitle="Select Terms" actionIcon={<RiListCheck />} />
              </ButtonGroup>
            }
          >
            <Stack>
              <FormControl>
                <Controller
                  control={control}
                  name="term_condition"
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Textarea
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      placeholder="Enter terms and conditions"
                      resize="none"
                      rows={19}
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
          <Container title={<Text fontSize="sm">Custom Field Details</Text>}>
            <Stack p={2} spacing={4}>
              <NoData title="No custom fields found" />
            </Stack>
          </Container>
        </GridItem>

        <GridItem colSpan={2}></GridItem>
      </Grid>
    </AppLayout>
  )

  /**
   *
   *  RENDERING END
   * ----------------------------------------------------------------------
   */
}
