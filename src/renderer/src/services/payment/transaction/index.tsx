const services = window.ZauvijekAPI.services;

export async function createBankCashChequeTransaction(props: any) {
  try {
    const response =
      await services.bankCashChequeTransaction.createBankCashChequeTransaction({
        ...props,
      });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getBankCashChequeTransactions(props: any) {
  try {
    const { business_id, startDate, endDate, transaction_type } = props;
    const response =
      await services.bankCashChequeTransaction.getBankCashChequeTransactions({
        business_id,
        transaction_type,
        start_date: startDate,
        end_date: endDate,
      });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getBankCashChequeTransactionById(id: string) {
  try {
    const response =
      await services.bankCashChequeTransaction.getBankCashChequeTransactionById(
        id
      );
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function deleteBankCashChequeTransaction(id: string) {
  try {
    const response =
      await services.bankCashChequeTransaction.deleteBankCashChequeTransaction(
        id
      );
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function updateBankCashChequeTransaction(id: string, props: any) {
  try {
    const response =
      await services.bankCashChequeTransaction.updateBankCashChequeTransaction(
        id,
        {
          ...props,
        }
      );
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
