import { useForm } from 'react-hook-form'
import FormSupplierView from '../view/form.supplier.view'

export default function NewSupplierController(props: any) {
  const form = useForm()
  return <FormSupplierView title="New Supplier" form={form} {...props} />
}
