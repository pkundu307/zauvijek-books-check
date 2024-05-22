const services = window.ZauvijekAPI.services;

export async function createCreditUsage(props: any) {
  try {
    const response = await services.creditUsage.createCreditUsage({ ...props });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getCreditUsages(props: any) {
  try {
    const { business_id, credit_type, startDate, endDate } = props;
    const response = await services.creditUsage.getCreditUsages({
      business_id,
      credit_type,
      start_date: startDate,
      end_date: endDate,
    });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getCreditUsageById(id: string) {
  try {
    const response = await services.creditUsage.getCreditUsageById(id);
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function deleteCreditUsage(id: string) {
  try {
    const response = await services.creditUsage.deleteCreditUsage(id);
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function updateCreditUsage(id: string, props: any) {
  try {
    const response = await services.creditUsage.updateCreditUsage(id, {
      ...props,
    });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
