const services = window.ZauvijekAPI.services

export async function createBarcode(props: any) {
  try {
    const response = await services.barcode.createBarcode({ ...props })
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function getBarcodes(props: any) {
  try {
    const { business_id, startDate, endDate } = props
    const response = await services.barcode.getBarcodes({
      business_id,
      startDate,
      endDate
    })
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function getBarcodeById(id: string) {
  try {
    const response = await services.barcode.getBarcodeById(id)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function deleteBarcode(id: string) {
  try {
    const response = await services.barcode.deleteBarcode(id)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function updateBarcode(id: string, props: any) {
  try {
    const response = await services.barcode.updateBarcode(id, { ...props })
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
