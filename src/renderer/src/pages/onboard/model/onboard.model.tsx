import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@chakra-ui/react'

import OnboardController from '../controller/onboard.controller'
import { userOnboarding } from '@renderer/services/onboard'
import { useAuthentication } from '@renderer/hooks/useAuthentication'

export default function OnboardModel() {
  const toast = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { user } = useAuthentication()

  const { mutate } = useMutation({
    mutationFn: (values) => userOnboarding(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getUserById', user?.id] })
      queryClient.invalidateQueries({
        queryKey: ['getBusinessById', user?.business_id]
      })
      toast({
        title: 'Account created !',
        status: 'success',
        duration: 1500,
        position: 'top'
      })
      navigate('/')
    }
  })

  function handleOnboard(values: any) {
    mutate(values)
  }

  return <OnboardController handleOnboard={handleOnboard} />
}
