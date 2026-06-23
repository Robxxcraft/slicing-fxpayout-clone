import { _fetchWithAuth, BASE_URL } from "@/services/apiClient";
import type { CryptoFormDetail } from "@/types/wallet.type";

export const getCryptoByUser = async ({ userId }: { userId: number }) => {
  try{
    const response = await _fetchWithAuth(`${BASE_URL}/cryptos/user/${userId}`);
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

export const createCryptoUser = async ({ form }: { form: CryptoFormDetail }) => {
  try{
    const response = await _fetchWithAuth(`${BASE_URL}/cryptos/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        network: form.network,
        token: form.token,
        wallet_address: form.accountNumber
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

export const updateCryptoUser = async ({ form, cryptoId }: { form: CryptoFormDetail; cryptoId: number }) => {
  try{
    const response = await _fetchWithAuth(`${BASE_URL}/cryptos/${cryptoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        network: form.network,
        token: form.token,
        wallet_address: form.accountNumber
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

export const deleteUserCrypto = async ({ cryptoId }: { cryptoId: number; }) => {
  try {
    const url = `${BASE_URL}/cryptos/${cryptoId}`;
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
