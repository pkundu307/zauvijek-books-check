import { useForm } from 'react-hook-form'
import FormBankCashView from '../view/form.bank_cash.view'

const NewBankCashController = (props: any) => {
  const form = useForm()

  function handleSave(values: any) {
    const digest = {
      ...values,
      business_id: '1111'
    }
    props.handleNew(digest)
  }
  return <FormBankCashView form={form} handleSave={handleSave} />
}

export default NewBankCashController
