const services = window.ZauvijekAPI.services

export async function createPurchase(props: any) {
  try {
    const response = await services.purchase.createPurchase({ ...props })
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function getPurchases(props: any) {
  try {
    const { business_id, startDate, endDate, purchase_type } = props
    const response = await services.purchase.getPurchases({
      business_id,
      start_date: startDate,
      end_date: endDate,
      purchase_type
    })
    return response
  } catch (error: any) {
    console.log(error)

    throw new Error(error.response.data.message)
  }
}

export async function getPurchaseById(id: string) {
  try {
    const response = await services.purchase.getPurchaseById(id)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function deletePurchase(id: string) {
  try {
    const response = await services.purchase.deletePurchase(id)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function updatePurchase(props: any) {
  try {
    const { id, obj } = props
    const response = await services.purchase.updatePurchase(id, { ...obj })
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
