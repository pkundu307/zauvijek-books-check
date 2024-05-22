import { useForm } from 'react-hook-form'
import FormItemView from '../view/form.item.view'

export default function NewItemController(props: any) {
  const defaultValues = {
    item_type: 'goods'
  }
  const form = useForm({
    defaultValues
  })

  function handleSave(values: any) {
    const digest = {
      ...values
      // business_id: '1111',
      // sale_type: 'credit_note'
    }
    props.handleNew(digest)
  }
  return <FormItemView title="New Item" form={form} handleSave={handleSave} />
}
