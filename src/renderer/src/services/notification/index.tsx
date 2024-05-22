const services = window.ZauvijekAPI.services;

export async function createNotification(props: any) {
  try {
    const response = await services.Notification.createNotification({
      ...props,
    });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getNotifications(props: any) {
  try {
    const { business_id, startDate, endDate, feature_type } = props;
    const response = await services.Notification.getNotifications({
      business_id,
      feature_type,
      start_date: startDate,
      end_date: endDate,
    });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getNotificationById(id: string) {
  try {
    const response = await services.Notification.getNotificationById(id);
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function deleteNotification(id: string) {
  try {
    const response = await services.Notification.deleteNotification(id);
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function updateNotification(id: string, props: any) {
  try {
    const response = await services.Notification.updateNotification(id, {
      ...props,
    });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
