import { _fetchWithAuth, BASE_URL } from "@/services/apiClient";
import type { OrderStatus, StatusType } from "@/types/status.type";

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

export const getTraderBroker = async ({
  limit,
  page,
  status,
  search,
  sortBy,
  orderBy
}: {
  limit?: number;
  page?: number;
  status?: StatusType;
  search?: string;
  sortBy?: string;
  orderBy?: OrderStatus;
}) => {
  try {
    let url = `${mainUrl}/traders?`;
    if (page) url += `page=${page}&`;
    if (limit) url += `limit=${limit}&`;
    if (status) url += `status=${status}&`;
    if (search) url += `search=${search}&`;
    if (sortBy) url += `sort_by=${sortBy}&`;
    if (orderBy) url += `sort_order=${orderBy}&`;

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

export const getTraderPerformance = async ({
  limit,
  page,
  sortBy,
  orderBy,
  startDate,
  endDate
}: {
  limit?: number;
  page?: number;
  sortBy?: string;
  orderBy?: OrderStatus;
  startDate?: string;
  endDate?: string;
}) => {
  try {
    let url = `${mainUrl}/traders/rebates?`;
    if (page) url += `page=${page}&`;
    if (limit) url += `limit=${limit}&`;
    if (sortBy) url += `sort_by=${sortBy}&`;
    if (orderBy) url += `sort_order=${orderBy}&`;
    if (startDate) url += `start_date=${startDate}&`;
    if (endDate) url += `end_date=${endDate}&`;

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
