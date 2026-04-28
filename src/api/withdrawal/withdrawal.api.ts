import type { FormWithdrawalRequest } from "@/pages/dashboard/common/WithdrawalRequestPage";
import { _fetchWithAuth, BASE_URL } from "@/services/apiClient";
import type { OrderStatus, StatusType } from "@/types/status.type";

export const createBankUser = async ({ 
  form,
  bankId,
  amountIdr,
  currency
}: { 
  form: FormWithdrawalRequest;
  bankId?: number;
  amountIdr: string;
  currency: "USD" | "IDR";
}) => {
  try{
    const response = await _fetchWithAuth(`${BASE_URL}/withdrawals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        bank_id: bankId,
        wallet_address: form.walletAddress,
        amount_idr: amountIdr,
        amount_usd: form.amount,
        currency: currency
      })
    });
    const responseJson = await response.json();
    if(response.status === 201){
      return { error: false, message: responseJson.message }
    }
    return { error: true, message: responseJson.message }
  } catch(error){
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`,
    }
  }
};

export const getWithdrawalUser = async ({
  role,
  status,
  limit,
  page,
  sortBy,
  orderBy
}: {
  role: "trader" | "affiliate";
  status?: StatusType;
  limit?: number;
  page?: number;
  sortBy?: string;
  orderBy?: OrderStatus;
}) => {
  try {
    let url = `${BASE_URL}/${role}/withdrawals?`;
    if (status) url += `status=${status}&`;
    if (sortBy) url += `sort_by=${sortBy}&`;
    if (orderBy) url += `sort_order=${orderBy}&`;
    if (page) url += `page=${page}&`;
    if (limit) url += `limit=${limit}&`;
    
    const response = await _fetchWithAuth(url);
    const responseJson = await response.json();
    if(response.status === 200){
      return { error: false, message: responseJson.message, data: responseJson.result }
    }
    return { error: true, message: responseJson.message, data: null }
  } catch(error){
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`,
      data: null
    }
  }
};

