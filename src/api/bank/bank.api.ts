import { _fetchWithAuth, BASE_URL } from "@/services/apiClient";
import type { BankFormDetail } from "@/types/bank.type";

export const getBankByUser = async ({ userId }: { userId: number }) => {
  try{
    const response = await _fetchWithAuth(`${BASE_URL}/banks/user/${userId}`);
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

export const createBankUser = async ({ form }: { form: BankFormDetail }) => {
  try{
    const response = await _fetchWithAuth(`${BASE_URL}/banks/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: form.bank,
        account_name: form.username,
        account_number: form.accountNumber
      })
    });
    const responseJson = await response.json();
    if(response.status === 201){
      return { error: false, message: responseJson.message, data: responseJson.data }
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

export const updateBankUser = async ({ form, bankId }: { form: BankFormDetail; bankId: number }) => {
  try{
    const response = await _fetchWithAuth(`${BASE_URL}/banks/${bankId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: form.bank,
        account_name: form.username,
        account_number: form.accountNumber
      })
    });
    const responseJson = await response.json();
    if(response.status === 200){
      return { error: false, message: responseJson.message, data: responseJson.data }
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

export const deleteUserBank = async ({ bankId }: { bankId: number; }) => {
  try {
    const url = `${BASE_URL}/banks/${bankId}`;
    const response = await _fetchWithAuth(url, {
      method: "DELETE"
    });
    const responseJson = await response.json();
    if (response.status === 200) {
      return { error: false, message: responseJson.message }
    }

    return { error: true, message: responseJson.message };
  } catch (error) {
    console.error(`Failed delete bank. Error: ${error}`);
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`
    }
  }
};
