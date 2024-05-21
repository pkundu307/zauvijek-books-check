import { useForm } from 'react-hook-form'

import { useAuthentication } from '@renderer/hooks/useAuthentication'
import FormSaleInvoiceView from '../view/form.sale_invoice.view'

export default function NewSaleInvoiceController(props: any) {
  const form = useForm()
  const { user } = useAuthentication()

  function handleSave(values: any) {
    const digest = {
      ...values,
      business_id: user?.business_id
    }
    props.handleNew(digest)
  }

  return <FormSaleInvoiceView title="New Sale Invoice" form={form} handleSave={handleSave} />
}
