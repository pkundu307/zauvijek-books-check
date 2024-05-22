import { useForm } from 'react-hook-form'

import FormCustomerView from '../view/form.customer.view'

export default function NewCustomerController(props: any) {
  const form = useForm()

  function handleSave(values: any) {
    const digest = {
      ...values,
      business_id: '1111',
      party_type: 'customer'
    }
    props.handleNew(digest)
  }

  return <FormCustomerView title="New Customer" form={form} handleSave={handleSave} />
}
