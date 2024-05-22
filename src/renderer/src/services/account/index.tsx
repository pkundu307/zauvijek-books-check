const services = window.ZauvijekAPI.services

export async function createAccount(props: any) {
  try {
    const response = await services.account.createAccount({ ...props })
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function getAccounts(props: any) {
  try {
    const { business_id } = props
    const response = await services.account.getAccounts({
      business_id
    })
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function getAccountById(id: string) {
  try {
    const response = await services.account.getAccountById(id)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function deleteAccount(id: string) {
  try {
    const response = await services.account.deleteAccount(id)
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}

export async function updateAccount(id: string, props: any) {
  try {
    const response = await services.account.updateAccount(id, { ...props })
    return response
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
