import SingleCustomerView from '../view/single.customer.view'

export default function SingleCustomerController(props: any) {
  return <SingleCustomerView title="View Customer" data={props.data} />
}
