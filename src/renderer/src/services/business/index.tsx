const services = window.ZauvijekAPI.services;

export async function createBusiness(props: any) {
  try {
    const response = await services.Business.createBusiness({ ...props });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getBusinesss(props: any) {
  try {
    const { business_id, startDate, endDate, business_type } = props;
    const response = await services.Business.getBusinesss({
      business_id,
      business_type,
      start_date: startDate,
      end_date: endDate,
    });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getBusinessById(id: string) {
  try {
    const response = await services.Business.getBusinessById(id);
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function deleteBusiness(id: string) {
  try {
    const response = await services.Business.deleteBusiness(id);
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function updateBusiness(id: string, props: any) {
  try {
    const response = await services.Business.updateBusiness(id, { ...props });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
