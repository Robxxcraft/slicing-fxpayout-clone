import type { FormWithdrawalRequest } from "@/pages/dashboard/common/WithdrawalRequestPage";
import { _fetchWithAuth, BASE_URL } from "@/services/apiClient";

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
