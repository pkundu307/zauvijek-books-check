import { useForm } from 'react-hook-form'

import { useAuthentication } from '@renderer/hooks/useAuthentication'
import FormCustomerView from '../view/form.customer.view'

export default function NewCustomerController(props: any) {
  const form = useForm()
  const { user } = useAuthentication()

  function handleSave(values: any) {
    const digest = {
      ...values,
      business_id: user?.business_id,
      party_type: 'customer'
    }
    props.handleNew(digest)
  }

  return <FormCustomerView title="New Customer" form={form} handleSave={handleSave} />
}
