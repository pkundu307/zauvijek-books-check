import { useForm } from 'react-hook-form'
import FormSupplierView from '../view/form.supplier.view'

export default function NewSupplierController(props: any) {
  const form = useForm()

  function handleSave(values: any) {
    const digest = {
      ...values,
      business_id: '1111',
      party_type: 'customer'
    }
    props.handleNew(digest)
  }

  return <FormSupplierView title="New Supplier" form={form} handleSave={handleSave} />
}
