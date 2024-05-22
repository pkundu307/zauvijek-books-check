const services = window.ZauvijekAPI.services;

export async function createBilling(props: any) {
  try {
    const response = await services.billing.createBilling({ ...props });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getBillings(props: any) {
  try {
    const { business_id, startDate, endDate } = props;
    const response = await services.billing.getBillings({
      business_id,
      start_date: startDate,
      end_date: endDate,
    });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getBillingById(id: string) {
  try {
    const response = await services.billing.getBillingById(id);
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function deleteBilling(id: string) {
  try {
    const response = await services.billing.deleteBilling(id);
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function updateBilling(id: string, props: any) {
  try {
    const response = await services.billing.updateBilling(id, { ...props });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
