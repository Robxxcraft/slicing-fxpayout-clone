import type { UserRole } from "@/models/user";
import type { ValidationData } from "@/models/validationData";
import type { FormLogin } from "@/types/login";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const getLocalStorage = (key: string): string | null => {
  return localStorage.getItem(key);
}

const setLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
}

const putAccessToken = (value: string) => {
  setLocalStorage("accessToken", value);
}

const getAccessToken = (): string | null => {
  return getLocalStorage("accessToken");
}

type fetchType = (
  url: string, 
  options?: {
    headers?: Record<string, string>, 
    method?: string, 
    body?: string 
}) => Promise<Response>;

const _fetchWithAuth: fetchType = async (url, options = {}) =>{
  return await fetch (url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    }
  })
}

const login = async (form: FormLogin) =>{
  try{
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers:{
        "content-type": "application/json",
      },
      body: JSON.stringify({ 
        username: form.username, 
        password: form.password 
      })
    })
    const responseJson = await response.json();
    if(response.status === 200) {
      return { error: false, message: "Login success!", token: responseJson.result.accessToken }
    } else if (response.status === 400) {
      return { error: true, message: "Username or password doesn't match", token: null }
    }
    return { error: true, message: responseJson.message, token: null }
  } catch(error){
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`, 
      token: null
    }
  }
};

const getAuthUser = async () =>{
  try{
    const response = await _fetchWithAuth(`${BASE_URL}/auth/me`);
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

const updateProfilUser = async ({ 
  userId,
  username,
  role
}: {
  userId: number;
  username: string;
  role: UserRole
}) =>{
  try{
    const response = await _fetchWithAuth(`${BASE_URL}/auth/${userId}`, {
      method: "PATCH",
      headers:{
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        role: role
      })
    });
    const responseJson = await response.json();
    if(response.status === 200){
      putAccessToken(responseJson.result.accessToken);
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

const changePasswordUser = async ({ 
  userId,
  oldPassword,
  newPassword,
  confirmationPassword
}: {
  userId: number;
  oldPassword: string;
  newPassword: string;
  confirmationPassword: string;
}) =>{
  try{
    const response = await _fetchWithAuth(`${BASE_URL}/auth/${userId}/password`, {
      method: "PATCH",
      headers:{
        "content-type": "application/json",
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
        confirmationPassword
      })
    });
    const responseJson = await response.json();
    if(response.status === 200){
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

const getValidationData = async ({
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

const exportCsvValidationData = async () => {
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

const bulkPostFormValidationData = async ({ items }: { items: ValidationData[] }) => {
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

const updateValidationData = async ({ item }: { item: ValidationData }) => {
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

const postFormValidationData = async ({ item, captchaValue }: { item: ValidationData; captchaValue: string }) => {
  try {
    const response = await fetch(`${BASE_URL}/validation-data`, {
      method: "POST",
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
        captchaValue: captchaValue
      })
    });
    const responseJson = await response.json();
    if (response.status === 201) {
      return { error: false, message: responseJson.message }
    }
    if (response.status === 400) {
      if (responseJson.message === "Required parameter missing or empty") {
        return { error: true, message: "Formulir tidak boleh kosong." };
      }
      if (responseJson.message === "Invalid email format") {
        return { error: true, message: "Format email tidak valid." };
      }
      if (responseJson.message === "Invalid value broker") {
        return { error: true, message: "Pilihan broker tidak ditemukan atau tidak valid." };
      }
      if (responseJson.message.includes("Invalid value rebate")) {
        return { error: true, message: "Tipe rebate yang dipilih tidak sesuai." };
      }
      if (responseJson.message.includes("Invalid value platform trading")) {
        return { error: true, message: "Platform trading tidak valid." };
      }
      if (responseJson.message === "Captcha token is required") {
        return { error: true, message: "Silahkan selesaikan verifikasi Captcha." };
      }
    }
    if (response.status === 403 && responseJson.message === "Captcha verification failed") {
      console.error(`Error validation captcha: ${responseJson.errors}`)
      return { error: true, message: "Verifikasi Captcha gagal. Silakan coba lagi." };
    }
    if (response.status === 500) {
      return { error: true, message: "Internal Server Error. Coba beberapa saat lagi" };
    }
    return { error: true, message: responseJson.message }
  } catch (error) {
    console.error(`Failed send form validation. Error: ${error}`);
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`
    }
  }
}

const bulkDeleteValidationData = async ({ validationIds }: { validationIds: number[] }) => {
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

const deleteValidationData = async ({ validationId }: { validationId: number }) => {
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

export {
  getLocalStorage,
  getAccessToken,
  putAccessToken,
  setLocalStorage,
  login,
  getAuthUser,
  updateProfilUser,
  changePasswordUser,
  getValidationData,
  exportCsvValidationData,
  postFormValidationData,
  updateValidationData,
  deleteValidationData,
  bulkDeleteValidationData,
  bulkPostFormValidationData
};
