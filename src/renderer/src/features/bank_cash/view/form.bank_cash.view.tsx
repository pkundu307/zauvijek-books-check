import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Text
} from '@chakra-ui/react'
import useThemeMode from '@renderer/hooks/useThemeMode'
import AppLayout from '@renderer/layouts/app'
import {
  RiArrowRightSLine,
  RiCalendar2Line,
  RiCheckboxCircleLine,
  RiSettings3Line
} from 'react-icons/ri'
import { CiBank } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import Container from '@renderer/components/container'
import { Controller } from 'react-hook-form'
import DownshiftSelectString from '@renderer/components/downshift_select_string'
import SelectDate from '@renderer/components/form/select_date'
// import DownshiftSelectString from '@renderer/components/form/downshift_select_string'

const FormBankCashView = (props: any) => {
  /**
   * ----------------------------------------------------------------------
   *  CUSTOM HOOKS START
   *
   */

  const { mode20, modeBrand } = useThemeMode()
  const { control, handleSubmit } = props.form

  /**
   *
   *  CUSTOM HOOKS END
   * ----------------------------------------------------------------------
   */
  return (
    <AppLayout>
      <Flex py={4} justify="space-between" align="center">
        <Stack direction="row" align="center" spacing={2}>
          <CiBank size="18px" />
          <Breadcrumb separator={<RiArrowRightSLine />}>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/bank-cash">
                Bank, Cash & Cheque
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink isCurrentPage>New Account</BreadcrumbLink>
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
        py={4}
        maxH={'82vh'}
      >
        <GridItem colSpan={1}>
          <Container title={<Text fontSize="sm">General Details</Text>}>
            <Stack p={4} spacing={6}>
              <Stack direction="row" spacing={4}>
                <FormControl>
                  <FormLabel fontSize="sm">Account Type</FormLabel>
                  <Controller
                    control={control}
                    name="account_type"
                    render={({ field: { value, onChange } }) => (
                      <DownshiftSelectString
                        items={['Cash', 'Bank', 'Cheque']}
                        value={value}
                        onChange={onChange}
                        size="xs"
                      />
                    )}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="sm">Account Name</FormLabel>
                  <Controller
                    control={control}
                    name="account_name"
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
              </Stack>
              <Stack direction="row" spacing={4}>
                <FormControl>
                  <FormLabel fontSize="sm">Opening Balance</FormLabel>
                  <Controller
                    control={control}
                    name="opening_balance"
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
                  <FormLabel fontSize="sm">Opening Balance Date</FormLabel>
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
            </Stack>
          </Container>
        </GridItem>
        <GridItem colSpan={1}>
          <Container title={<Text fontSize="sm">Bank Details</Text>}>
            <Stack p={4} spacing={6}>
              <Stack direction="row" spacing={4}>
                <FormControl>
                  <FormLabel fontSize="sm">Bank Name</FormLabel>
                  <Controller
                    control={control}
                    name="bank_name"
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
                  <FormLabel fontSize="sm">Bank Account No.</FormLabel>
                  <Controller
                    control={control}
                    name="bank_account_no"
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
              </Stack>
              <Stack direction="row" spacing={4}>
                <FormControl>
                  <FormLabel fontSize="sm">IFSC Code</FormLabel>
                  <Controller
                    control={control}
                    name="bank_ifsc_code"
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
                  <FormLabel fontSize="sm">Account Holder Name</FormLabel>
                  <Controller
                    control={control}
                    name="bank_account_holder_name"
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
              </Stack>
              <Stack direction="row" spacing={4}>
                <FormControl>
                  <FormLabel fontSize="sm">UPI Id</FormLabel>
                  <Controller
                    control={control}
                    name="upi_id"
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
                <FormControl />
              </Stack>
            </Stack>
          </Container>
        </GridItem>
      </Grid>
    </AppLayout>
  )
}

export default FormBankCashView
