const services = window.ZauvijekAPI.services;

export async function createPayment(props: any) {
  try {
    const response = await services.payment.createPayment({ ...props });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getPayments(props: any) {
  try {
    const { business_id, startDate, endDate, payment_type } = props;
    const response = await services.payment.getPayments({
      business_id,
      start_date: startDate,
      end_date: endDate,
      payment_type,
    });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getPaymentById(id: string) {
  try {
    const response = await services.payment.getPaymentById(id);
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function deletePartyActivity(id: string) {
  try {
    const response = await services.payment.deletePayment(id);
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function updatePayment(id: string, props: any) {
  try {
    const response = await services.payment.updatePayment(id, { ...props });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
