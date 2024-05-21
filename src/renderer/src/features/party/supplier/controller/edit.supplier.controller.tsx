import { useForm } from 'react-hook-form'
import FormSupplierView from '../view/form.supplier.view'

export default function EditSupplierController(props: any) {
  const form = useForm()
  return <FormSupplierView title="Edit Supplier" form={form} {...props} />
}
