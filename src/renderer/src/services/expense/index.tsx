const services = window.ZauvijekAPI.services;

export async function createExpense(props: any) {
  try {
    const response = await services.expense.createExpense({ ...props });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getExpenses(props: any) {
  try {
    const { business_id, startDate, endDate } = props;
    startDate.setHours(0, 0, 0, 0); // Set time to midnight (00:00:00)
    endDate.setHours(23, 59, 59, 999); // Set time to end of day (23:59:59.999)
    const response = await services.expense.getExpenses({
      business_id,
      start_date: startDate,
      end_date: endDate,
    });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function getExpenseById(id: string) {
  try {
    const response = await services.expense.getExpenseById(id);
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function deleteExpense(id: string) {
  try {
    const response = await services.expense.deleteExpense(id);
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function updateExpense(id: string, props: any) {
  try {
    const response = await services.expense.updateExpense(id, { ...props });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
