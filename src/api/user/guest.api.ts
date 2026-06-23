import { BASE_URL } from "@/services/apiClient";
import type { FormFeedback } from "@/types/validationForm.type";

export const getFeedback = async () => {
  try {
    const response = await fetch(`${BASE_URL}/testimonials`);
    const responseJson = await response.json();
    if (response.status === 200) {
      return { error: false, message: responseJson.message, result: responseJson.result }
    }  
    return { error: true, message: responseJson.errors, result: [] }
  } catch (error) {
    console.error(`Failed get feedback. Error: ${error}`);
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`,
      result: []
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