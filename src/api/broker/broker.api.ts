import { _fetchWithAuth, BASE_URL } from "@/services/apiClient";

type ConnectBrokerForm = {
  brokerId: number;
  accountNumber: string;
  platform: "MT4" | "MT5"
}

export const getBrokersList = async () => {
  try {
    const response = await _fetchWithAuth(`${BASE_URL}/brokers/list`);
    const responseJson = await response.json();
    if (response.status === 200) {
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
}

export const getBrokerByUser = async ({ userId }: { userId: number }) => {
  try{
    const response = await _fetchWithAuth(`${BASE_URL}/brokers/user/${userId}`);
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

export const connectBrokerUser = async ({ form }: { form: ConnectBrokerForm }) => {
  try{
    const response = await _fetchWithAuth(`${BASE_URL}/brokers/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        broker_id: form.brokerId,
        platform: form.platform,
        account_number: form.accountNumber
      })
    });
    const responseJson = await response.json();
    if(response.status === 201){
      return { error: false, message: responseJson.message }
    }
    return { error: true, message: responseJson.error || responseJson.errors[0] || responseJson.message }
  } catch(error){
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`,
    }
  }
};

export const deleteBrokerByUser = async ({ brokerId }: { brokerId: number }) => {
  try{
    const response = await _fetchWithAuth(`${BASE_URL}/brokers/${brokerId}`, {
      method: "DELETE",
    });
    const responseJson = await response.json();
    if (response.status === 200){
      return { error: false, message: responseJson.message }
    }
    return { error: true, message: responseJson.error || responseJson.errors[0] || responseJson.message }
  } catch(error){
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`,
    }
  }
};
