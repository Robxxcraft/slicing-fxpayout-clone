import type { UserRole } from "@/types/user.type";
import { _fetchWithAuth, BASE_URL, putAccessToken } from "@/services/apiClient";
import type { FormLogin, FormRegister, FormUpdateProfile } from "@/types/auth.type";

export const login = async (form: FormLogin) =>{
  try{
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers:{
        "content-type": "application/json",
      },
      body: JSON.stringify({ 
        email: form.email, 
        password: form.password 
      })
    })
    const responseJson = await response.json();
    if(response.status === 200) {
      return { error: false, message: "Login success!", token: responseJson.result.accessToken }
    } else if (response.status === 400) {
      return { error: true, message: "Username or password doesn't match", token: null }
    } else if (response.status === 403) {
      return { error: true, message: "Email is not verified, please verify your email first", token: null }
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

export const register = async ({ form, role }: { form: FormRegister, role: UserRole }) =>{
  try{
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers:{
        "content-type": "application/json",
      },
      body: JSON.stringify({ 
        username: form.username,
        email: form.email, 
        password: form.password,
        confirmation_password: form.password2,
        role
      })
    })
    const responseJson = await response.json();
    if(response.status === 201) {
      return { error: false, message: "Register account success!" }
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

export const getAuthUser = async () =>{
  try{
    const response = await _fetchWithAuth(`${BASE_URL}/auth/me`);
    const responseJson = await response.json();
    if(response.status === 200){
      return { error: false, message: responseJson.message, data: responseJson.result }
    } else if (response.status === 400) {
      if (responseJson.message === "Email is not verified, please verify your email first") {
        return { error: true, message: responseJson.message, data: "not-verified" }
      }
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

export const generateOtp = async ({ email }: { email: string }) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/email/generate-otp`, {
      method: "POST",
      headers:{
        "content-type": "application/json",
      },
      body: JSON.stringify({ email: email })
    });
    const responseJson = await response.json();
    if (response.status === 200) {
      return { error: false, message: responseJson.message }
    }

    return { error: true, message: responseJson.message }
  } catch (error) {
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`,
      data: null
    }
  }
};

export const verifyOtp = async ({ 
  otp, email 
}: { 
  otp: string,
  email: string
}) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/email/verify-otp`, {
      method: "POST",
      headers:{
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, otp })
    });
    const responseJson = await response.json();
    if (response.status === 200) {
      return { error: false, message: responseJson.message, accessToken: responseJson.result.accessToken }
    }

    return { error: true, message: responseJson.message }
  } catch (error) {
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`,
      data: null
    }
  }
};

export const updateProfile = async ({ form, userId }: { form: FormUpdateProfile, userId: number }) => {
  try{
    let data; 
    if (form.referral) {
      data = {
        username: form.username,
        full_name: form.fullname,
        gender: form.gender,
        phone_number: `62${form.phoneNumber}`,
        referral_code: form.referral,
      };
    } else {
      data = {
        username: form.username,
        full_name: form.fullname,
        gender: form.gender,
        phone_number: `62${form.phoneNumber}`,
      };
    }
    const response = await _fetchWithAuth(`${BASE_URL}/auth/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const responseJson = await response.json();
    if(response.status === 200){
      return { error: false, message: responseJson.message }
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

export const changeEmail = async ({ userId, email }: { userId: number; email: string }) => {
  try {
    const response = await _fetchWithAuth(`${BASE_URL}/auth/email/${userId}/change`, {
      method: "POST",
      headers:{
        "content-type": "application/json",
      },
      body: JSON.stringify({ email: email })
    });
    const responseJson = await response.json();
    if (response.status === 200) {
      return { error: false, message: responseJson.message }
    }

    return { error: true, message: responseJson.message }
  } catch (error) {
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`,
      data: null
    }
  }
};

export const verifyChangeEmail = async ({ 
  userId, oldEmail, email, otp 
}: { 
  userId: number; 
  oldEmail: string; 
  email: string; 
  otp: string; 
}) => {
  try {
    const response = await _fetchWithAuth(`${BASE_URL}/auth/email/${userId}/change/verify`, {
      method: "POST",
      headers:{
        "content-type": "application/json",
      },
      body: JSON.stringify({ 
        email: oldEmail, 
        new_email: email,
        otp: otp 
      })
    });
    const responseJson = await response.json();
    if (response.status === 200) {
      putAccessToken(responseJson.result.accessToken);
      return { error: false, message: responseJson.message }
    }

    return { error: true, message: responseJson.message }
  } catch (error) {
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`,
      data: null
    }
  }
};

export const changePasword = async ({ 
  userId, oldPassword, newPassword, confirmationPassword 
}: { 
  userId: number; 
  oldPassword?: string; 
  newPassword: string; 
  confirmationPassword: string; 
}) => {
  try {
    const response = await _fetchWithAuth(`${BASE_URL}/auth/${userId}/password`, {
      method: "PATCH",
      headers:{
        "content-type": "application/json",
      },
      body: JSON.stringify({ 
        old_password: oldPassword, 
        new_password: newPassword,
        confirmation_password: confirmationPassword 
      })
    });
    const responseJson = await response.json();
    if (response.status === 200) {
      return { error: false, message: responseJson.message }
    }

    return { error: true, message: responseJson.message }
  } catch (error) {
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`,
      data: null
    }
  }
};

export const getBalanceUser = async () => {
  try {
    const response = await _fetchWithAuth(`${BASE_URL}/rebates/balance`);
    const responseJson = await response.json();

    if (response.status === 200) {
      if (responseJson.result) {
        return { 
          error: false, 
          message: "Successfully get balance", 
          data: { amount: responseJson.result.amount, currency: responseJson.result.currency, userId: responseJson.result.user_id } 
        }
      } else {
        return {
          error: true,
          message: "Receive empty balance",
          data: null
        }
      }
    }
    return { error: true, message: responseJson.message, data: null }
  } catch (error) {
    console.error(error);
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`,
      data: null
    }
  }
}
