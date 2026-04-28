import { _fetchWithAuth, BASE_URL } from "@/services/apiClient";

const mainUrl = `${BASE_URL}/affiliate`;

export const getDashboardData = async () => {
  try {
    const response = await _fetchWithAuth(`${mainUrl}/dashboard`);
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

export const getRecentEarnings = async () => {
  try {
    const response = await _fetchWithAuth(`${mainUrl}/dashboard/table`);
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
