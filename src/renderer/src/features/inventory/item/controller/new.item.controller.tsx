import { useForm } from 'react-hook-form'
import FormItemView from '../view/form.item.view'

export default function NewItemController(props: any) {
  const defaultValues = {
    item_type: 'goods'
  }
  const form = useForm({
    defaultValues
  })
  return <FormItemView title="New Item" form={form} {...props} />
}
