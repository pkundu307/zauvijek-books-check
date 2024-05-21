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
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button
} from '@chakra-ui/react'
import {
  RiAddLine,
  RiArrowRightSLine,
  RiCalendar2Line,
  RiCheckboxCircleLine,
  RiFundsLine,
  RiListCheck,
  RiStore2Line
} from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { Controller } from 'react-hook-form'

import Action from '@renderer/components/container/action'
import Container from '@renderer/components/container'
import ItemTable from '@renderer/components/table/item_table'
import AppLayout from '@renderer/layouts/app'
import SelectDate from '@renderer/components/select_date'
import useThemeMode from '@renderer/hooks/useThemeMode'
import NoData from '@renderer/components/no_data'

export default function FormSaleInvoiceView(props: any) {
  const { mode20, modeBrand } = useThemeMode()
  const { control, handleSubmit } = props.form

  return (
    <AppLayout>
      <Flex py={2} justify="space-between" align="flex-start">
        <Stack direction="row" align="center" spacing={2}>
          <RiFundsLine size="18px" />
          <Breadcrumb separator={<RiArrowRightSLine />}>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Sales</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/sale-invoice">
                Sale Invoices
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
            colorScheme="gray"
            leftIcon={<RiCheckboxCircleLine />}
            onClick={handleSubmit(props.handleSave)}
          >
            Save
          </Button>
        </ButtonGroup>
      </Flex>

      <Grid templateColumns={'repeat(2, 1fr)'} templateRows={'repeat(1, 1fr)'} gap={4}>
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
                <Stack spacing={1}>
                  <Text fontWeight={600}>Zauvijek Tech Pvt. Ltd.</Text>
                  <Text fontSize="sm">Software Technology Parks of India</Text>
                  <Text fontSize="sm">Phone: 987234234</Text>
                  <Text fontSize="sm">Email: contact@zauvijek.com</Text>
                  <Text fontSize="sm">GST: -</Text>
                  <Text fontSize="sm">PAN: -</Text>
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
                name="enable_due_date"
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
                  <FormLabel fontSize="sm">Sale Invoice Prefix</FormLabel>
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
                  <FormLabel fontSize="sm">Sale Invoice No.</FormLabel>
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
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="sm">Sale Invoice Date</FormLabel>
                  <Controller
                    control={control}
                    name="sale_invoice_date"
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
                    name="payment_terms"
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
            </Stack>
          </Container>
        </GridItem>

        <GridItem colSpan={2}>
          <Container
            title={<Text fontSize="sm">Party Details</Text>}
            action={
              <ButtonGroup spacing={4}>
                <Action actionTitle="Select Party" actionIcon={<RiListCheck />} />
                <Action actionTitle="Add Party" actionIcon={<RiAddLine />} />
              </ButtonGroup>
            }
          >
            <Stack p={4} spacing={6}>
              <NoData title="No party selected" />
            </Stack>
          </Container>
        </GridItem>

        <GridItem colSpan={2}>
          <ItemTable control={control} />
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
                  name="terms"
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

        <GridItem colSpan={2}>
          <Alert status="info" variant="left-accent" fontSize="sm">
            <AlertIcon />
            <AlertTitle>Your browser is outdated!</AlertTitle>
            <AlertDescription>Your Chakra experience may be degraded.</AlertDescription>
          </Alert>
        </GridItem>
      </Grid>
    </AppLayout>
  )
}
