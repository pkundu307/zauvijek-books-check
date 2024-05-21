export type PartyType = {
  id?: string
  business_id?: string
  party_type?: string
  party_category?: string
  party_name: string
  party_form?: string
  business_name?: string
  email?: string
  phone_no?: string
  gst_no?: string
  pan_no?: string
  place_of_supply: string
  is_billing_shipping_same?: boolean
  billing_address?: string
  billing_street?: string
  billing_city?: string
  billing_state?: string
  billing_pincode?: string
  shipping_address?: string
  shipping_street?: string
  shipping_city?: string
  shipping_state?: string
  shipping_pincode?: string
  opening_balance?: number
  opening_balance_type?: string
  credit_period?: number
  credit_limit?: number
  closing_balance?: number
  birthday?: Date
  custom_fields?: CustomFieldType[]
  notes?: string
  created_at?: Date
  updated_at?: Date
}

export type CustomFieldType = {
  id?: string
  field_type?: string
  field_form_type?: string
  field_label?: string
  field_value?: string
  field_categories?: string[]
  created_at?: Date
  updated_at?: Date
}

export type PartyPropType = {
  type?: string
  partyData?: PartyType
  onSave: (value: any) => void
}
