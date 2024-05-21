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
  RiArrowRightSLine,
  RiCheckboxCircleLine,
  RiCalendar2Line,
  RiBox3Line,
  RiAddLine,
  RiListCheck
} from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { Controller } from 'react-hook-form'

import AppLayout from '@renderer/layouts/app'
import useThemeMode from '@renderer/hooks/useThemeMode'
import Container from '@renderer/components/container'
import DownshiftSelect from '@renderer/components/downshift_select'
import { GenerateBarcode } from '@renderer/components/barcode/generate_barcode'
import UploadImage from '@renderer/components/upload_image'
import SelectDate from '@renderer/components/select_date'
import NoData from '@renderer/components/no_data'
import Action from '@renderer/components/container/action'

export default function FormItemView(props: any) {
  const { mode20, modeBrand } = useThemeMode()

  const { control, watch } = props.form

  const watchField = watch()

  return (
    <AppLayout>
      <Flex py={2} justify="space-between" align="flex-start">
        <Stack direction="row" align="center" spacing={2}>
          <RiBox3Line size="18px" />
          <Breadcrumb separator={<RiArrowRightSLine />}>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Inventory</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/item">
                Items
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
            rounded={0}
            color={modeBrand}
            leftIcon={<RiCheckboxCircleLine />}
          >
            Save
          </Button>
        </ButtonGroup>
      </Flex>

      <Grid templateColumns={'repeat(2, 1fr)'} templateRows={'repeat(1, 1fr)'} gap={4}>
        <GridItem colSpan={1} rowSpan={2}>
          <Container title={<Text fontSize="sm">General Details</Text>}>
            <Stack p={4} spacing={6}>
              <Stack>
                <Text fontSize="sm">Item Images</Text>
                <Stack direction="row" spacing={4}>
                  <UploadImage />
                  <UploadImage />
                  <UploadImage />
                  <UploadImage />
                </Stack>
              </Stack>
              <Stack direction="row" spacing={4}>
                <FormControl>
                  <FormLabel fontSize="sm">Item Type</FormLabel>
                  <Controller
                    control={control}
                    name="item_type"
                    render={({ field: { value, onChange } }) => (
                      <RadioGroup value={value} onChange={onChange} size="sm">
                        <Stack direction="row" spacing={6}>
                          <Radio value="goods">Goods</Radio>
                          <Radio value="services">Services</Radio>
                        </Stack>
                      </RadioGroup>
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
                    name="item_category"
                    render={({ field: { value, onChange } }) => (
                      <DownshiftSelect
                        items={[{ title: 'Automobile' }, { title: 'Pharmacy' }]}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </FormControl>
              </Stack>

              <Stack direction="row" spacing={4}>
                <FormControl>
                  <FormLabel fontSize="sm">
                    Item name <span style={{ color: 'red' }}>*</span>
                  </FormLabel>
                  <Controller
                    control={control}
                    name="item_name"
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Input
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder="Enter item name"
                        size="sm"
                      />
                    )}
                  />
                </FormControl>
              </Stack>

              <Stack direction="row" spacing={4} align="flex-end">
                <FormControl>
                  <FormLabel fontSize="sm">Item Description</FormLabel>
                  <Controller
                    control={control}
                    name="item_description"
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Textarea
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder="Enter item description"
                        size="sm"
                        resize={'none'}
                        rows={2}
                      />
                    )}
                  />
                </FormControl>
              </Stack>

              <Stack direction="row" spacing={4} align="flex-end">
                <FormControl w="50%">
                  <FormLabel fontSize="sm">Item code</FormLabel>
                  <Controller
                    control={control}
                    name="item_code"
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Input
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder="Enter item code"
                        size="sm"
                      />
                    )}
                  />
                </FormControl>
                <GenerateBarcode />
              </Stack>
            </Stack>
          </Container>
        </GridItem>

        <GridItem colSpan={1} rowSpan={1}>
          <Container
            title={<Text fontSize="sm">Pricing Details</Text>}
            action={
              <Stack direction="row" spacing={2}>
                <Controller
                  control={control}
                  name="enable_mrp"
                  render={({ field: { value, onChange } }) => (
                    <Switch
                      size="sm"
                      fontSize="sm"
                      colorScheme="green"
                      value={value}
                      onChange={onChange}
                    >
                      Enable MRP
                    </Switch>
                  )}
                />
                <Controller
                  control={control}
                  name="enable_wholesale"
                  render={({ field: { value, onChange } }) => (
                    <Switch
                      size="sm"
                      fontSize="sm"
                      colorScheme="green"
                      value={value}
                      onChange={onChange}
                    >
                      Enable Wholesale
                    </Switch>
                  )}
                />
              </Stack>
            }
          >
            <Stack p={4} spacing={6}>
              <Stack direction="row" spacing={4}>
                <Stack w="100%" direction="row" align="center" spacing={0}>
                  <FormControl w="50%">
                    <FormLabel fontSize="sm">Selling price</FormLabel>
                    <Controller
                      control={control}
                      name="selling_price"
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
                  <FormControl w="50%">
                    <FormLabel my={7} />
                    <Controller
                      control={control}
                      name="selling_price_type"
                      render={({ field: { value, onChange } }) => (
                        <DownshiftSelect
                          items={[{ title: 'With tax' }, { title: 'Without tax' }]}
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </FormControl>
                </Stack>

                <Stack w="100%" direction="row" align="center" spacing={0}>
                  <FormControl w="50%">
                    <FormLabel fontSize="sm">Purchase price</FormLabel>
                    <Controller
                      control={control}
                      name="purchase_price"
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
                  <FormControl w="50%">
                    <FormLabel my={7} />
                    <Controller
                      control={control}
                      name="purchase_price_type"
                      render={({ field: { value, onChange } }) => (
                        <DownshiftSelect
                          items={[{ title: 'With tax' }, { title: 'Without tax' }]}
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </FormControl>
                </Stack>
              </Stack>

              <Stack direction="row" spacing={4}>
                <Stack w="50%" direction="row" spacing={2}>
                  <FormControl>
                    <FormLabel fontSize="sm">Discount</FormLabel>
                    <Controller
                      control={control}
                      name="discount"
                      render={({ field: { value, onChange, onBlur } }) => (
                        <InputGroup size="sm">
                          {watchField?.discount_type === '₹' && <InputLeftAddon children={'₹'} />}
                          <Input
                            type="number"
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            placeholder="0"
                          />
                          {watchField?.discount_type === '%' && <InputRightAddon children={'%'} />}
                        </InputGroup>
                      )}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="sm">Discount Type</FormLabel>
                    <Controller
                      control={control}
                      name="discount_type"
                      render={({ field: { value, onChange } }) => (
                        <DownshiftSelect
                          items={[{ title: '%' }, { title: '₹' }]}
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </FormControl>
                </Stack>

                {watchField?.enable_mrp === true ? (
                  <FormControl w="50%">
                    <FormLabel fontSize="sm">MRP</FormLabel>
                    <Stack direction="row" spacing={0}>
                      <Controller
                        control={control}
                        name="mrp"
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
                ) : (
                  <FormControl w="50%" />
                )}
              </Stack>

              {watchField?.enable_wholesale === true && (
                <Stack direction="row" spacing={4}>
                  <Stack w="100%" direction="row" align="center" spacing={0}>
                    <FormControl w="50%">
                      <FormLabel fontSize="sm">Wholesale price</FormLabel>
                      <Controller
                        control={control}
                        name="wholesale_price"
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
                    <FormControl w="50%">
                      <FormLabel my={7} />
                      <Controller
                        control={control}
                        name="wholesale_price_type"
                        render={({ field: { value, onChange } }) => (
                          <DownshiftSelect
                            items={[{ title: 'With tax' }, { title: 'Without tax' }]}
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />
                    </FormControl>
                  </Stack>

                  <Stack w="100%" direction="row" align="center" spacing={0}>
                    <FormControl>
                      <FormLabel fontSize="sm">Wholesale quantity</FormLabel>
                      <Controller
                        control={control}
                        name="wholesale_quantity"
                        render={({ field: { value, onChange, onBlur } }) => (
                          <InputGroup size="sm">
                            <Input
                              type="number"
                              value={value}
                              onChange={onChange}
                              onBlur={onBlur}
                              placeholder="0"
                            />
                            <InputRightAddon children={'BOX'} />
                          </InputGroup>
                        )}
                      />
                    </FormControl>
                  </Stack>
                </Stack>
              )}
            </Stack>
          </Container>
        </GridItem>

        <GridItem colSpan={1} rowSpan={1}>
          <Container title={<Text fontSize="sm">Tax Details</Text>}>
            <Stack p={4} spacing={6}>
              <Stack direction="row" spacing={4}>
                {watchField?.item_type === 'goods' ? (
                  <FormControl>
                    <Flex justify="space-between">
                      <FormLabel fontSize="sm">HSC Code</FormLabel>
                      <ButtonGroup spacing={4}>
                        <Action actionTitle="Select" actionIcon={<RiListCheck />} />
                      </ButtonGroup>
                    </Flex>
                    <Controller
                      control={control}
                      name="hsn_code"
                      render={({ field: { value, onChange, onBlur } }) => (
                        <Input
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          placeholder="Enter hsn code"
                          size="sm"
                        />
                      )}
                    />
                  </FormControl>
                ) : (
                  <FormControl>
                    <Flex justify="space-between">
                      <FormLabel fontSize="sm">SAC Code</FormLabel>
                      <ButtonGroup spacing={4}>
                        <Action actionTitle="Select" actionIcon={<RiListCheck />} />
                      </ButtonGroup>
                    </Flex>
                    <Controller
                      control={control}
                      name="sac_code"
                      render={({ field: { value, onChange, onBlur } }) => (
                        <Input
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          placeholder="Enter sac code"
                          size="sm"
                        />
                      )}
                    />
                  </FormControl>
                )}

                <FormControl>
                  <FormLabel fontSize="sm">GST / Tax rates</FormLabel>
                  <Controller
                    control={control}
                    name="tax_rate"
                    render={({ field: { value, onChange } }) => (
                      <DownshiftSelect
                        items={[{ title: '12% @ IGST' }, { title: '12% @ SGST' }]}
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

        {watchField?.item_type === 'goods' && (
          <GridItem colSpan={1} rowSpan={1}>
            <Container
              title={<Text fontSize="sm">Unit Details</Text>}
              action={
                <Controller
                  control={control}
                  name="enabled_secondary_unit"
                  render={({ field: { value, onChange } }) => (
                    <Switch
                      size="sm"
                      fontSize="sm"
                      colorScheme="green"
                      value={value}
                      onChange={onChange}
                    >
                      Enable secondary unit
                    </Switch>
                  )}
                />
              }
            >
              <Stack p={4} spacing={6}>
                <Stack direction="row" spacing={4}>
                  <FormControl>
                    <FormLabel fontSize="sm">Unit</FormLabel>
                    <Controller
                      control={control}
                      name="unit"
                      render={({ field: { value, onChange } }) => (
                        <DownshiftSelect
                          items={[{ title: 'BOX' }, { title: 'PIECES' }]}
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </FormControl>
                  {watchField?.enabled_secondary_unit === true ? (
                    <FormControl>
                      <FormLabel fontSize="sm">Secondary Unit</FormLabel>
                      <Controller
                        control={control}
                        name="secondary_unit"
                        render={({ field: { value, onChange } }) => (
                          <DownshiftSelect
                            items={[{ title: 'BOX' }, { title: 'PIECES' }]}
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />
                    </FormControl>
                  ) : (
                    <FormControl />
                  )}
                </Stack>
                <Stack direction="row" spacing={4}>
                  {watchField?.enabled_secondary_unit === true && (
                    <FormControl>
                      <FormLabel fontSize="sm">Conversion rate</FormLabel>
                      <Stack direction="row" spacing={0}>
                        <Controller
                          control={control}
                          name="conversion_rate"
                          render={({ field: { value, onChange, onBlur } }) => (
                            <InputGroup size="sm">
                              <InputLeftAddon children={'1 BOX ='} />
                              <Input
                                type="number"
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                placeholder="0"
                              />
                              <InputRightAddon children={'PIECES'} />
                            </InputGroup>
                          )}
                        />
                      </Stack>
                    </FormControl>
                  )}
                  <FormControl />
                </Stack>
              </Stack>
            </Container>
          </GridItem>
        )}

        {watchField?.item_type === 'goods' && (
          <GridItem colSpan={1} rowSpan={1}>
            <Container
              title={<Text fontSize="sm">Stock Details</Text>}
              action={
                <Controller
                  control={control}
                  name="enable_low_stock_alert"
                  render={({ field: { value, onChange } }) => (
                    <Switch
                      size="sm"
                      fontSize="sm"
                      colorScheme="green"
                      value={value}
                      onChange={onChange}
                    >
                      Enable low stock alert
                    </Switch>
                  )}
                />
              }
            >
              <Stack p={4} spacing={6}>
                <Stack direction="row" spacing={4}>
                  <FormControl>
                    <FormLabel fontSize="sm">Opening Stock</FormLabel>
                    <Controller
                      control={control}
                      name="opening_stock"
                      render={({ field: { value, onChange, onBlur } }) => (
                        <Input
                          type="number"
                          value={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          placeholder="0"
                          size="sm"
                        />
                      )}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">Opening stock date</FormLabel>
                    <Controller
                      control={control}
                      name="opening_stock_date"
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
                  {watchField?.enable_low_stock_alert === true && (
                    <FormControl>
                      <FormLabel fontSize="sm">Low stock unit</FormLabel>
                      <Stack direction="row" spacing={0}>
                        <Controller
                          control={control}
                          name="low_stock_unit"
                          render={({ field: { value, onChange, onBlur } }) => (
                            <Input
                              type="number"
                              value={value}
                              onChange={onChange}
                              onBlur={onBlur}
                              placeholder="0"
                              size="sm"
                            />
                          )}
                        />
                      </Stack>
                    </FormControl>
                  )}

                  <FormControl />
                </Stack>
              </Stack>
            </Container>
          </GridItem>
        )}

        {watchField?.item_type === 'goods' && (
          <GridItem colSpan={1} rowSpan={1}>
            <Container
              title={<Text fontSize="sm">Batching Details ( e.g. Manufacture & Expiry date )</Text>}
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
        )}

        {watchField?.item_type === 'goods' && (
          <GridItem colSpan={1} rowSpan={1}>
            <Container
              title={
                <Text fontSize="sm">Serialisation Details ( e.g. Serial number, IMEI number )</Text>
              }
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
        )}

        <GridItem colSpan={1} rowSpan={1}>
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
    </AppLayout>
  )
}
