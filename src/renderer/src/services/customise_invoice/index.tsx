const services = window.ZauvijekAPI.services

export async function createCustomiseInvoice(props: any) {
  try {
    const response = await services.customiseInvoice.createCustomiseInvoice({ ...props })
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function getCustomiseInvoices(props: any) {
  try {
    const { business_id, startDate, endDate } = props
    const response = await services.customiseInvoice.getCustomiseInvoices({
      business_id,
      startDate,
      endDate
    })
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function getCustomiseInvoiceById(id: string) {
  try {
    const response = await services.customiseInvoice.getCustomiseInvoiceById(id)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function deleteCustomiseInvoice(id: string) {
  try {
    const response = await services.customiseInvoice.deleteCustomiseInvoice(id)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function updateCustomiseInvoice(id: string, props: any) {
  try {
    const response = await services.customiseInvoice.updateCustomiseInvoice(id, { ...props })
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
