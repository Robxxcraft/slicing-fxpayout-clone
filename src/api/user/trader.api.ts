import { _fetchWithAuth, BASE_URL } from "@/services/apiClient";
import type { StatusType } from "@/types/status.type";

export const getDashboardData = async () => {
  try {
    const response = await _fetchWithAuth(`${BASE_URL}/trader/dashboard`);
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

export const getRebateChartData = async ({
  limit,
  page=1,
  startDate,
  endDate
}: {
  limit?: number;
  page?: number;
  startDate: string;
  endDate?: string
}) => {
  try {
    let url = `${BASE_URL}/trader/dashboard/chart?`;
    if (page) url += `page=${page}&`;
    if (limit) url += `limit=${limit}&`;
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

export const getBrokerByTrader = async ({
  status,
  limit,
  page,
  query
}: {
  status?: StatusType;
  limit?: number;
  page?: number;
  query?: string; 
}) => {
  try {
    let url = `${BASE_URL}/trader/brokers?`;
    if (query) url += `search=${query}&`;
    if (status) url += `status=${status}&`;
    if (page) url += `page=${page}&`;
    if (limit) url += `limit=${limit}&`;
    
    const response = await _fetchWithAuth(url);
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

export const getRebatesByTrader = async ({
  limit,
  page,
  brokerSearch
}: {
  limit?: number;
  page?: number;
  brokerSearch?: string;
}) => {
  try {
    let url = `${BASE_URL}/trader/rebates?`;
    if (brokerSearch) url += `search=${brokerSearch}&`;
    if (page) url += `page=${page}&`;
    if (limit) url += `limit=${limit}&`;
    
    const response = await _fetchWithAuth(url);
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

export const getWithdrawalByTrader = async ({
  status,
  limit,
  page,
}: {
  status?: StatusType;
  limit?: number;
  page?: number;
}) => {
  try {
    let url = `${BASE_URL}/trader/withdrawals?`;
    if (status) url += `status=${status}&`;
    if (page) url += `page=${page}&`;
    if (limit) url += `limit=${limit}&`;
    
    const response = await _fetchWithAuth(url);
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
