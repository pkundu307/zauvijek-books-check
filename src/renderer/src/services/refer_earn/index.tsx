const services = window.ZauvijekAPI.services;

export async function createReferEarn(props: any) {
  try {
    const response = await services.referEarn.createReferEarn({ ...props });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getReferEarns(props: any) {
  try {
    const { business_id, startDate, endDate } = props;
    const response = await services.referEarn.getReferEarns({
      business_id,
      start_date: startDate,
      end_date: endDate,
    });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getReferEarnById(id: string) {
  try {
    const response = await services.referEarn.getReferEarnById(id);
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function deleteReferEarn(id: string) {
  try {
    const response = await services.referEarn.deleteReferEarn(id);
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function updateReferEarn(id: string, props: any) {
  try {
    const response = await services.referEarn.updateReferEarn(id, { ...props });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
