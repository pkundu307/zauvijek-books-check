import axios from "axios";
import { API_URL } from "../../";
import { cookies } from "@renderer/utils/cookie";

export async function getTransactions(props: any) {
  try {
    const { business_id, start_date, end_date, page, take } = props;
    const response = await axios.get(
      `${API_URL}/bank-cash-transaction?business_id=${business_id}&start_date=${start_date}&end_date=${end_date}&page=${page}&take=${take}`,
      { headers: { Authorization: `Bearer ${cookies.get("access_token")}` } }
    );
    return response?.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
