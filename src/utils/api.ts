import type { ValidationData } from "@/models/validationData";
import { BASE_URL } from "@/services/apiClient";

const getFeedback = async () => {
  try {
    const response = await fetch(`${BASE_URL}/testimonials`);
    const responseJson = await response.json();
    if (response.status === 200) {
      return { error: false, message: responseJson.message, result: responseJson.result }
    }  
    return { error: true, message: responseJson.errors, result: [] }
  } catch (error) {
    console.error(`Failed send form feedback. Error: ${error}`);
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`,
      result: []
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

    const feedbackErrorTranslate = "validationpage:card.feedbackError";
    const resMessage = responseJson.message
    if (response.status === 400) {
      if (resMessage === "Required parameter missing or empty") {
        return { error: true, message: `${feedbackErrorTranslate}.requiredFields` };
      }
      if (resMessage === "Invalid email format") {
        return { error: true, message: `${feedbackErrorTranslate}.invalidEmail` };
      }
      if (resMessage === "Invalid value broker") {
        return { error: true, message: `${feedbackErrorTranslate}.invalidBroker` };
      }
      if (resMessage.includes("Invalid value rebate")) {
        return { error: true, message: `${feedbackErrorTranslate}.invalidRebate` };
      }
      if (resMessage.includes("Invalid value platform trading")) {
        return { error: true, message: `${feedbackErrorTranslate}.invalidPlatform` };
      }
      if (resMessage === "Captcha token is required") {
        return { error: true, message: `${feedbackErrorTranslate}.captchaRequired` };
      }
    }
    if (response.status === 403 && resMessage === "Captcha verification failed") {
      console.error(`Error validation captcha: ${responseJson.errors}`)
      return { error: true, message: `${feedbackErrorTranslate}.captchaFailed` };
    }
    if (response.status === 500) {
      return { error: true, message: `${feedbackErrorTranslate}.serverError` };
    }
    return { error: true, message: resMessage }
  } catch (error) {
    console.error(`Failed send form validation. Error: ${error}`);
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`
    }
  }
}

export {
  getFeedback,
  postFormValidationData
};
