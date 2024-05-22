const services = window.ZauvijekAPI.services;

export async function createMarketing(props: any) {
  try {
    const response = await services.marketing.createMarketing({
      ...props,
    });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getMarketings(props: any) {
  try {
    const { business_id, startDate, endDate, campaign_type } = props;
    const response = await services.marketing.getMarketings({
      business_id,
      campaign_type,
      start_date: startDate,
      end_date: endDate,
    });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getMarketingById(id: string) {
  try {
    const response = await services.marketing.getMarketingById(id);
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function deleteMarketing(id: string) {
  try {
    const response = await services.marketing.deleteMarketing(id);
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function updateMarketing(id: string, props: any) {
  try {
    const response = await services.marketing.updateMarketing(id, {
      ...props,
    });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
