import { useForm } from 'react-hook-form'
import FormSupplierView from '../view/form.supplier.view'

export default function EditSupplierController(props: any) {
  const form = useForm({
    defaultValues: props.data
  })

  function handleSave(values: any) {
    props.handleUpdate(values)
  }
  return <FormSupplierView title="Edit Supplier" form={form} handleSave={handleSave} />
}
