const services = window.ZauvijekAPI.services;

export async function createBankCashCheque(props: any) {
  try {
    const response = await services.bankCashCheque.createBankCashCheque({
      ...props,
    });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getBankCashCheques(props: any) {
  try {
    const { business_id, account_type } = props;
    const response = await services.bankCashCheque.getBankCashCheques({
      business_id,
      account_type,
    });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getBankCashChequeById(id: string) {
  try {
    const response = await services.bankCashCheque.getBankCashChequeById(id);
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function deleteBankCashCheque(id: string) {
  try {
    const response = await services.bankCashCheque.deleteBankCashCheque(id);
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function updateBankCashCheque(id: string, props: any) {
  try {
    const response = await services.bankCashCheque.updateBankCashCheque(id, {
      ...props,
    });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
