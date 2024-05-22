const services = window.ZauvijekAPI.services

export async function createManageNotification(props: any) {
  try {
    const response = await services.manageNotification.createManageNotification({ ...props })
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function getManageNotifications(props: any) {
  try {
    const { business_id, startDate, endDate } = props
    const response = await services.manageNotification.getManageNotifications({
      business_id,
      startDate,
      endDate
    })
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function getManageNotificationById(id: string) {
  try {
    const response = await services.manageNotification.getManageNotificationById(id)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function deleteManageNotification(id: string) {
  try {
    const response = await services.manageNotification.deleteManageNotification(id)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function updateManageNotification(id: string, props: any) {
  try {
    const response = await services.manageNotification.updateManageNotification(id, { ...props })
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
