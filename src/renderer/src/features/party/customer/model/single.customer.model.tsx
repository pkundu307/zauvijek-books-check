import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import Loading from '@renderer/components/loading'
import { getPartyById } from '@renderer/services/party'
import SingleCustomerController from '../controller/single.customer.controller'

export default function SingleCustomerModel() {
  const { id } = useParams()

  const { isLoading, data } = useQuery({
    queryKey: ['getCustomer', id],
    queryFn: () => getPartyById(id as string)
  })

  if (isLoading) {
    return <Loading />
  }

  return <SingleCustomerController data={data} />
}
