import { useForm } from 'react-hook-form'
import FormCustomerView from '../view/form.customer.view'

export default function EditCustomerController(props: any) {
  const form = useForm({
    defaultValues: props.data
  })

  function handleSave(values: any) {
    props.handleUpdate(values)
  }

  return <FormCustomerView title="Edit Customer" form={form} handleSave={handleSave} />
}
