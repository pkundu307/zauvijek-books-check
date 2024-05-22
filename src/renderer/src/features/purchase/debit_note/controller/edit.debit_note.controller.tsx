/**
 * ----------------------------------------------------------------------
 *  NPM MODULES START
 *
 */

import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import ceil from 'lodash/ceil'
import toNumber from 'lodash/toNumber'

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

import {
  getTaxableAmount,
  getTaxRate,
  handleBalanceAmount,
  handleTaxes,
  handleTotalAmount
} from '@renderer/utils/calculation_purchase'
import FormDebitNoteView from '../view/form.debit_note.view'

/**
 *
 *  CUSTOM MODULES END
 * ----------------------------------------------------------------------
 */

const partyData = [
  {
    party_name: 'Ratan',
    business_name: 'Tata',
    billing_address: 'Mumbai, Maharashtra',
    shipping_address: 'Mumbai, Maharashtra',
    phone_no: 9876543210,
    gst_no: 'ZW2312SSSAD',
    pan_no: 'EWEE22FD',
    place_of_supply: 'Mumbai, Maharashtra'
  },
  {
    party_name: 'Aditya',
    business_name: 'Birla',
    billing_address: 'Mumbai, Maharashtra',
    shipping_address: 'Mumbai, Maharashtra',
    phone_no: 9876543210,
    gst_no: 'ZW2312SSSAD',
    pan_no: 'EWEE22FD',
    place_of_supply: 'Mumbai, Maharashtra'
  }
]

const itemData = [
  {
    item_name: 'Nike',
    item_description: 'Color: Blue',
    hsn_code: '3242342',
    quantity: 1,
    price: 1200,
    unit: 'Box',
    discount_percent: 0,
    discount_amount: 0,
    tax: '12% @ IGST',
    tax_amount: 0,
    taxable_amount: 0,
    amount: 0
  },
  {
    item_name: 'Reebok',
    item_description: 'Color: Red',
    hsn_code: '45645',
    quantity: 1,
    price: 700,
    unit: 'Piece',
    discount_percent: 0,
    discount_amount: 0,
    tax: '18% @ CGST/SGST',
    tax_amount: 0,
    taxable_amount: 0,
    amount: 0
  }
]

const EditDebitNoteController = (props: any) => {
  /**
   * ----------------------------------------------------------------------
   *  LIBRARY HOOKS START
   *
   */

  const form = useForm({
    defaultValues: props.data
  })

  const { control, watch, setValue } = form

  const saleItem = useFieldArray({
    control,
    name: 'purchase_item'
  })

  const additionalCharge = useFieldArray({
    control,
    name: 'purchase_additional_charge'
  })

  const paymentMode = useFieldArray({
    control,
    name: 'purchase_payment_mode'
  })

  /**
   *
   *  LIBRARY HOOKS END
   * ----------------------------------------------------------------------
   */

  /**
   * ----------------------------------------------------------------------
   *  LOCAL STATES START
   *
   */

  const [rowIndex, setRowIndex] = React.useState<number>(0)

  /**
   *
   *  LOCAL STATES END
   * ----------------------------------------------------------------------
   */

  /**
   * ----------------------------------------------------------------------
   *  WATCH START
   *
   */

  const party_name = watch('party_name')
  const purchase_item = watch('purchase_item')
  const taxes = watch('purchase_tax')
  const discount_rate_after_tax = watch('discount_percent')
  const discount_value_after_tax = watch('discount_amount')
  const additional_charge = watch('purchase_additional_charge')
  const is_auto_round_off = watch('is_auto_roundoff_enabled')
  const round_off_type = watch('roundoff_type')
  const round_off_value = watch('roundoff_amount')
  const is_fully_received = watch('is_settled')
  const purchase_payment_mode = watch('purchase_payment_mode')

  const item_name = watch(`purchase_item.${rowIndex}.item_name`)
  const quantity = watch(`purchase_item.${rowIndex}.quantity`)
  const price = watch(`purchase_item.${rowIndex}.price`)
  const discount_rate = watch(`purchase_item.${rowIndex}.discount_percent`)
  const discount_value = watch(`purchase_item.${rowIndex}.discount_amount`)
  const tax = watch(`purchase_item.${rowIndex}.tax`)

  /**
   *
   *  WATCH END
   * ----------------------------------------------------------------------
   */

  /**
   * ----------------------------------------------------------------------
   *  LOCAL EFFECTS START
   *
   */

  React.useEffect(() => {
    if (party_name) {
      const party = partyData.filter((party) => party.party_name === party_name)

      if (party.length === 0) {
        return
      } else {
        setValue('party_name', party[0]?.party_name)
        setValue('business_name', party[0]?.business_name)
        setValue('billing_address', party[0]?.billing_address)
        setValue('shipping_address', party[0]?.shipping_address)
        setValue('phone_no', party[0]?.phone_no)
        setValue('tax_id', party[0]?.gst_no)
        setValue('pan_no', party[0]?.pan_no)
        setValue('place_of_supply', party[0]?.place_of_supply)
      }
    }
  }, [rowIndex, party_name, setValue])

  React.useEffect(() => {
    if (item_name) {
      const item = itemData.filter((item) => item.item_name === item_name)

      if (item.length === 0) {
        return
      } else {
        setValue(`purchase_item.${rowIndex}`, item[0])
      }
    }
  }, [rowIndex, item_name, setValue])

  React.useEffect(() => {
    if (item_name) {
      const taxable_amount = getTaxableAmount(purchase_item[rowIndex]) || 0

      const tax_rate = getTaxRate(purchase_item[rowIndex]) || 0

      const tax_value = (ceil(toNumber(tax_rate), 2) / 100) * ceil(taxable_amount, 2) || 0

      const amount = ceil(taxable_amount, 2) + ceil(tax_value, 2) || 0

      setValue(`purchase_item.${rowIndex}.taxable_amount`, taxable_amount)
      setValue(`purchase_item.${rowIndex}.tax_amount`, tax_value)
      setValue(`purchase_item.${rowIndex}.amount`, amount)
    }
  }, [
    rowIndex,
    quantity,
    price,
    discount_rate,
    discount_value,
    tax,
    item_name,
    purchase_item,
    setValue
  ])

  React.useEffect(() => {
    const total = handleTotalAmount({
      items: purchase_item,
      discount_rate_after_tax,
      discount_value_after_tax,
      additional_charge,
      is_auto_round_off,
      round_off_type,
      round_off_value
    })

    const taxes = handleTaxes({ items: purchase_item })

    const balance_amount = handleBalanceAmount({
      total_amount: total?.total_amount,
      is_fully_received,
      payment_mode: purchase_payment_mode
    })

    setValue('purchase_tax', taxes)
    setValue('total_taxable_amount', total?.total_taxable_amount)
    setValue('total_tax_amount', total?.total_tax_amount)
    setValue('total_amount', total?.total_amount)
    setValue('balance_amount', balance_amount)
  }, [
    item_name,
    quantity,
    price,
    discount_rate,
    discount_value,
    tax,
    purchase_item,
    discount_rate_after_tax,
    discount_value_after_tax,
    additional_charge,
    JSON.stringify(additional_charge),
    is_auto_round_off,
    round_off_type,
    round_off_value,
    purchase_payment_mode,
    JSON.stringify(purchase_payment_mode),
    is_fully_received,
    setValue
  ])

  /**
   *
   *  LOCAL EFFECTS END
   * ----------------------------------------------------------------------
   */

  /**
   * ----------------------------------------------------------------------
   *  HANDLER FUNCTIONS START
   *
   */

  function handleSave(values: any) {
    const digest = {
      ...values
    }
    props.handleEdit(digest)
  }

  /**
   *
   *  HANDLER FUNCTIONS END
   * ----------------------------------------------------------------------
   */

  /**
   * ----------------------------------------------------------------------
   *  RENDERING START
   *
   */
  return (
    <FormDebitNoteView
      title="Edit Debit Note"
      partyData={partyData}
      itemData={itemData}
      form={form}
      saleItem={saleItem}
      rowIndex={rowIndex}
      setRowIndex={setRowIndex}
      taxes={taxes}
      additionalCharge={additionalCharge}
      paymentMode={paymentMode}
      handleSave={handleSave}
    />
  )

  /**
   *
   *  RENDERING END
   * ----------------------------------------------------------------------
   */
}

export default EditDebitNoteController
