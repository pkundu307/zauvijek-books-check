import * as React from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import OnboardView from '../view/onboard.view'
import { useAuthentication } from '@renderer/hooks/useAuthentication'

const schema = yup.object().shape({
  business_name: yup.string().required('Business name is required.'),
  business_type: yup.string().required('Business type is required.'),
  incorporation_type: yup.string().required('Incororation type is required.'),
  industry_type: yup.string().required('Industry type is required.')
})

export default function OnboardController(props: any) {
  const { user } = useAuthentication()

  const form = useForm<any>({
    resolver: yupResolver(schema)
  })

  const getSelectedBusinessType = React.useCallback((value: string) => {
    form.setValue('business_type', value)
  }, [])

  const getSelectedIncorporationType = React.useCallback((value: string) => {
    form.setValue('incorporation_type', value)
  }, [])

  const getSelectedIndustryType = React.useCallback((value: string) => {
    form.setValue('industry_type', value)
  }, [])

  function handleOnboard(values: any) {
    const digest = {
      ...values,
      user_id: user?.id
    }

    props.handleOnboard(digest)
  }

  return (
    <OnboardView
      form={form}
      handleOnboard={handleOnboard}
      getSelectedBusinessType={getSelectedBusinessType}
      getSelectedIncorporationType={getSelectedIncorporationType}
      getSelectedIndustryType={getSelectedIndustryType}
    />
  )
}
