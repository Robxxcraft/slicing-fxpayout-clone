import type { ValidationData } from "@/models/validationData";
import { _fetchWithAuth, BASE_URL } from "@/services/apiClient";
import type { StatusType } from "@/types/status.type";
import type { FormFeedback } from "@/types/validationForm.type";

export const getValidationData = async ({
  page=1,
  limit=50,
  sortBy="created_at",
  sort="asc",
  query
}: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sort?: string;
  query?: string;
}) => {
  let queryParams = `?page=${page}&limit=${limit}&sortBy=${sortBy}&sort=${sort}`;
  if (query) queryParams += `&query=${query}`;
  try {
    const response = await _fetchWithAuth(`${BASE_URL}/validation-data${queryParams}`);
    const responseJson = await response.json();
    if(response.status === 200) {
      return { error: false, message: "Successfully getting validation data", result: responseJson }
    }
    return { error: true, message: responseJson.message, result: null }
  } catch (error) {
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`,
      result: null
    }
  }
}

export const exportCsvValidationData = async () => {
  try {
    const response = await _fetchWithAuth(`${BASE_URL}/validation-data/export-data`);
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "validation-data.csv";
    a.click();

    return { error: false, message: "Success export data" };
  } catch (error) {
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`,
    }
  }
}

export const bulkPostFormValidationData = async ({ items }: { items: ValidationData[] }) => {
  try {
    const response = await _fetchWithAuth(`${BASE_URL}/validation-data/bulk-create`, {
      method: "POST",
      headers:{
        "content-type": "application/json",
      },
      body: JSON.stringify({ items })
    });
    const responseJson = await response.json();
    if(response.status === 201) {
      return { error: false, message: responseJson.message }
    }
    return { error: true, message: responseJson.message, errorsDetail: responseJson.errors }
  } catch (error) {
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`
    }
  }
}

export const updateValidationData = async ({ item }: { item: ValidationData }) => {
  try {
    const response = await _fetchWithAuth(`${BASE_URL}/validation-data/${item.id}`, {
      method: "PUT",
      headers:{
        "content-type": "application/json",
      },
      body: JSON.stringify({ 
        broker: item.broker, 
        email: item.email,  
        full_name: item.full_name, 
        trading_account_number: item.trading_account_number,  
        platform: item.platform,  
        phone_number: item.phone_number,  
        rebate: item.rebate,
        bank: item.bank,
        bank_account_number: item.bank_account_number,
        bank_account_name: item.bank_account_name,
        status: item.status
      })
    });
    const responseJson = await response.json();
    if(response.status === 200) {
      return { error: false, message: responseJson.message }
    } else if (response.status === 400) {
      return { error: true, message: responseJson.message, errorsDetail: responseJson.error }
    }
    return { error: true, message: responseJson.message }
  } catch (error) {
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`
    }
  }
}

export const bulkDeleteValidationData = async ({ validationIds }: { validationIds: number[] }) => {
  try {
    const response = await _fetchWithAuth(`${BASE_URL}/validation-data/bulk-delete`, {
      method: "POST",
      headers:{
        "content-type": "application/json",
      },
      body: JSON.stringify({ validationIds })
    });
    const responseJson = await response.json();
    if(response.status === 200) {
      return { error: false, message: responseJson.message, count: responseJson.count }
    }
    return { error: true, message: responseJson.message }
  } catch (error) {
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`
    }
  }
}

export const deleteValidationData = async ({ validationId }: { validationId: number }) => {
  try {
    const response = await _fetchWithAuth(`${BASE_URL}/validation-data/${validationId}`, {
      method: "DELETE",
    });
    const responseJson = await response.json();
    if(response.status === 200) {
      return { error: false, message: responseJson.message }
    }
    return { error: true, message: responseJson.message }
  } catch (error) {
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`
    }
  }
}

export const postFormFeedback = async ({ item, captchaValue }: { item: FormFeedback; captchaValue: string }) => {
  try {
    const response = await fetch(`${BASE_URL}/testimonials`, {
      method: "POST",
      headers:{
        "content-type": "application/json",
      },
      body: JSON.stringify({ 
        name: item.username, 
        location: item.location,  
        review: item.review, 
        rating: item.rating,  
        captchaValue: captchaValue
      })
    });
    const responseJson = await response.json();
    if (response.status === 201) {
      return { error: false, message: responseJson.message }
    }

    return { error: true, message: responseJson.errors }
  } catch (error) {
    console.error(`Failed send form feedback. Error: ${error}`);
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`
    }
  }
}

// Rebates API
export const getAllRebates = async () => {
  try {
    const response = await _fetchWithAuth(`${BASE_URL}/rebates`);
    const responseJson = await response.json();
    console.log("responseJson", responseJson);
    if (responseJson.status === 200) {
      return { error: false, message: responseJson.message }
    }

    return { error: true, message: responseJson.message };
  } catch (error) {
    console.error(`Failed send form feedback. Error: ${error}`);
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`
    }
  }
};

// Bank API
export const getAllBank = async ({
  status,
  limit,
  page
}: {
  status?: StatusType
  limit?: string;
  page?: number;
}) => {
  try {
    let url = `${BASE_URL}/banks?`;
    if (page) url += `page=${page}&`;
    if (limit) url += `limit=${limit}&`;
    if (status) url += `status=${status}&`;

    const response = await _fetchWithAuth(url);
    const responseJson = await response.json();
    if (response.status === 200) {
      return { error: false, message: responseJson.message, data: responseJson.result }
    }

    return { error: true, message: responseJson.message, data: null };
  } catch (error) {
    console.error(`Failed send form feedback. Error: ${error}`);
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

export const bulkDeleteUserBanks = async ({ bankIds }: { bankIds: number[]; }) => {
  try {
    const url = `${BASE_URL}/banks/bulk`;
    const response = await _fetchWithAuth(url, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        ids: bankIds
      })
    });
    const responseJson = await response.json();
    if (response.status === 200) {
      return { error: false, message: responseJson.result.message }
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

export const bulkChangeStatusUserBanks = async ({ 
  bankIds, status 
}: { 
  bankIds: number[]; 
  status: StatusType; 
}) => {
  try {
    const url = `${BASE_URL}/banks/status`;
    const response = await _fetchWithAuth(url, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        ids: bankIds,
        status
      })
    });
    const responseJson = await response.json();
    if (response.status === 200) {
      return { error: false, message: responseJson.result.message }
    }

    return { error: true, message: responseJson.message };
  } catch (error) {
    console.error(`Failed update status bank. Error: ${error}`);
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`
    }
  }
};

// Bank API
export const getAllBrokerUsers = async ({
  status,
  limit,
  page
}: {
  status?: StatusType
  limit?: string;
  page?: number;
}) => {
  try {
    let url = `${BASE_URL}/brokers?`;
    if (page) url += `page=${page}&`;
    if (limit) url += `limit=${limit}&`;
    if (status) url += `status=${status}&`;

    const response = await _fetchWithAuth(url);
    const responseJson = await response.json();
    if (response.status === 200) {
      return { error: false, message: responseJson.message, data: responseJson.result }
    }

    return { error: true, message: responseJson.message, data: null };
  } catch (error) {
    console.error(`Failed send form feedback. Error: ${error}`);
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`,
      data: null
    }
  }
};

// WithdrawalRequests API
export const getAllWithdrawalRequests = async ({
  status,
  limit,
  page
}: {
  status?: StatusType
  limit?: string;
  page?: number;
}) => {
  try {
    let url = `${BASE_URL}/withdrawals?`;
    if (page) url += `page=${page}&`;
    if (limit) url += `limit=${limit}&`;
    if (status) url += `status=${status}&`;

    const response = await _fetchWithAuth(url);
    const responseJson = await response.json();
    if (response.status === 200) {
      return { error: false, message: responseJson.message, data: responseJson.result }
    }

    return { error: true, message: responseJson.message, data: null };
  } catch (error) {
    console.error(`Failed send form feedback. Error: ${error}`);
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`,
      data: null
    }
  }
};
