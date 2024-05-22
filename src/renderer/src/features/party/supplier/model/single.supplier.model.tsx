import { useQuery } from '@tanstack/react-query'
import SingleSupplierController from '../controller/single.supplier.controller'
import { useParams } from 'react-router-dom'
import { getPartyById } from '@renderer/services/party'
import Loading from '@renderer/components/loading'

export default function SingleSupplierModel() {
  const { id } = useParams()

  const { isLoading, data } = useQuery({
    queryKey: ['getCustomer', id],
    queryFn: () => getPartyById(id as string)
  })

  if (isLoading) {
    return <Loading />
  }

  return <SingleSupplierController data={data} />
}
