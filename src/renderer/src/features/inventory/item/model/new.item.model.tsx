import NewItemController from '../controller/new.item.controller'

export default function NewItemModel() {
  function handleNew(values: any) {
    console.log(values)
  }
  return <NewItemController handleNew={handleNew} />
}
