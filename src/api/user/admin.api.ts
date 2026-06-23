import type { ValidationData } from "@/models/validationData";
import { _fetchWithAuth, BASE_URL } from "@/services/apiClient";
import type { OrderStatus, RebateStatusType, StatusType } from "@/types/status.type";
import type { UserTier } from "@/types/user.type";

//! ==== NOT USED ====
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
//! ===== NOT USED ====

// Overview
export const getDataOverview = async () => {
  try {
    const response = await _fetchWithAuth(`${BASE_URL}/admin/dashboard`);
    const responseJson = await response.json();
    if (response.status === 200) {
      return { error: false, message: responseJson.message, data: responseJson.result }
    }

    return { error: true, message: responseJson.message, data: null };
  } catch (error) {
    console.error(`Failed get data overview. Error: ${error}`);
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`,
      data: null
    }
  }
};

// User by id
export const getProfileById = async ({ userId }: { userId: number }) => {
  try {
    const response = await _fetchWithAuth(`${BASE_URL}/auth/${userId}`);
    const responseJson = await response.json();
    if (response.status === 200) {
      return { error: false, message: responseJson.message, data: responseJson.result }
    }

    return { error: true, message: responseJson.message, data: null };
  } catch (error) {
    console.error(`Failed get profile by id. Error: ${error}`);
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`,
      data: null
    }
  }
};

// Tier User
export const changeTierUser = async ({ 
  userId, tier 
}: { 
  userId: number; 
  tier: UserTier 
}) => {
 try {
    const url = `${BASE_URL}/auth/${userId}/tier`;
    const response = await _fetchWithAuth(url, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        tier: tier
      })
    });
    const responseJson = await response.json();
    if (response.status === 200) {
      return { error: false, message: responseJson.message }
    }

    return { error: true, message: responseJson.error || responseJson.message };
  } catch (error) {
    console.error(`Failed update tier user. Error: ${error}`);
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`
    }
  }
};

// Affiliator
export const getDataAffiliator = async ({
  limit, 
  page,
  sortBy,
  orderBy,
  status,
  search
}: {
  limit?: number; 
  page?: number;
  sortBy?: string;
  orderBy?: OrderStatus;
  status?: "approved" | "verifying";
  search?: string;
}) => {
  try {
    let url = `${BASE_URL}/admin/affiliators?`;
    if (limit) url += `limit=${limit}&`;
    if (page) url += `page=${page}&`;
    if (sortBy) url += `sort_by=${sortBy}&`;
    if (orderBy) url += `sort_order=${orderBy}&`;
    if (status) url += `status=${status}&`;
    if (search) url += `search=${search}&`;

    const response = await _fetchWithAuth(url);
    const responseJson = await response.json();
    if (response.status === 200) {
      return { error: false, message: responseJson.message, data: responseJson.result }
    }

    return { error: true, message: responseJson.message, data: null };
  } catch (error) {
    console.error(`Failed get data affiliator. Error: ${error}`);
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`,
      data: null
    }
  }
};

// Trader
export const getDataTrader = async ({
  limit, 
  page,
  sortBy,
  orderBy,
  status,
  search
}: {
  limit?: number; 
  page?: number;
  sortBy?: string;
  orderBy?: OrderStatus;
  status?: "approved" | "verifying";
  search?: string;
}) => {
  try {
    let url = `${BASE_URL}/admin/traders?`;
    if (limit) url += `limit=${limit}&`;
    if (page) url += `page=${page}&`;
    if (sortBy) url += `sort_by=${sortBy}&`;
    if (orderBy) url += `sort_order=${orderBy}&`;
    if (status) url += `status=${status}&`;
    if (search) url += `search=${search}&`;

    const response = await _fetchWithAuth(url);
    const responseJson = await response.json();
    if (response.status === 200) {
      return { error: false, message: responseJson.message, data: responseJson.result }
    }

    return { error: true, message: responseJson.message, data: null };
  } catch (error) {
    console.error(`Failed get data trader. Error: ${error}`);
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`,
      data: null
    }
  }
};

// Rebates API
export const getAllRebates = async ({
  limit, 
  page,
  sortBy,
  orderBy,
  status,
  search,
  startDate,
  endDate
}: {
  status?: RebateStatusType
  limit?: number;
  page?: number;
  sortBy?: string;
  orderBy?: OrderStatus;
  search?: string;
  startDate?: string;
  endDate?: string;
}) => {
  try {
    let url = `${BASE_URL}/rebates/requests?`;
    if (limit) url += `limit=${limit}&`;
    if (page) url += `page=${page}&`;
    if (sortBy) url += `sort_by=${sortBy}&`;
    if (orderBy) url += `sort_order=${orderBy}&`;
    if (status) url += `status=${status}&`;
    if (search) url += `search=${search}&`;
    if (startDate) url += `start_date=${startDate}&`;
    if (endDate) url += `end_date=${endDate}&`;

    const response = await _fetchWithAuth(url);
    const responseJson = await response.json();
    if (response.status === 200) {
      return { error: false, message: responseJson.message, data: responseJson.result }
    }

    return { error: true, message: responseJson.message, data: null };
  } catch (error) {
    console.error(`Failed get data rebates. Error: ${error}`);
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`,
      data: null
    }
  }
};

export const updateRebateById = async ({
  rebateId,
  totalRebate
}: {
  rebateId: number,
  totalRebate: string
}) => {
  try {

    const response = await _fetchWithAuth(`${BASE_URL}/rebates/requests/${rebateId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        total_rebate: totalRebate
      })
    });
    const responseJson = await response.json();
    if (response.status === 200) {
      return { error: false, message: responseJson.message }
    }

    return { error: true, message: responseJson.errors[0] };
  } catch (error) {
    console.error(`Failed update data rebate. Error: ${error}`);
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`,
    }
  }
};

export const bulkChangeStatusRebates = async ({ 
  rebateIds, status 
}: { 
  rebateIds: number[]; 
  status: StatusType; 
}) => {
  try {
    const url = `${BASE_URL}/rebates/requests/status`;
    const response = await _fetchWithAuth(url, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        ids: rebateIds,
        status
      })
    });
    const responseJson = await response.json();
    if (response.status === 200) {
      return { error: false, message: responseJson.result.message }
    }

    return { error: true, message: responseJson.error || responseJson.message };
  } catch (error) {
    console.error(`Failed update status broker. Error: ${error}`);
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`
    }
  }
};

export const bulkDeleteRebates = async ({ rebateIds }: { rebateIds: number[]; }) => {
  try {
    const url = `${BASE_URL}/rebates/requests/bulk`;
    const response = await _fetchWithAuth(url, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        ids: rebateIds
      })
    });
    const responseJson = await response.json();
    if (response.status === 200) {
      return { error: false, message: responseJson.result.message }
    }

    return { error: true, message: responseJson.message };
  } catch (error) {
    console.error(`Failed bulk delete rebates. Error: ${error}`);
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`
    }
  }
};

export const importExcelRebates = async ({ file }: { file: File; }) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const url = `${BASE_URL}/rebates/requests/import`;
    const response = await _fetchWithAuth(url, {
      method: "POST",
      body: formData
    });
    const responseJson = await response.json();
    if (response.status === 200) {
      return { error: false, message: responseJson.result.message }
    }

    return { error: true, message: responseJson.message, detailErrors: responseJson.errors };
  } catch (error) {
    console.error(`Failed import data rebates. Error: ${error}`);
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`,
    }
  }
};

// Bank API
export const getAllBank = async ({
  limit, 
  page,
  sortBy,
  orderBy,
  status,
  search
}: {
  status?: StatusType
  limit?: number;
  page?: number;
  sortBy?: string;
  orderBy?: OrderStatus;
  search?: string;
}) => {
  try {
    let url = `${BASE_URL}/banks?`;
    if (limit) url += `limit=${limit}&`;
    if (page) url += `page=${page}&`;
    if (sortBy) url += `sort_by=${sortBy}&`;
    if (orderBy) url += `sort_order=${orderBy}&`;
    if (status) url += `status=${status}&`;
    if (search) url += `search=${search}&`;

    const response = await _fetchWithAuth(url);
    const responseJson = await response.json();
    if (response.status === 200) {
      return { error: false, message: responseJson.message, data: responseJson.result }
    }

    return { error: true, message: responseJson.message, data: null };
  } catch (error) {
    console.error(`Failed get data bank. Error: ${error}`);
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`,
      data: null
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

// Crypto API
export const getAllCrypto = async ({
  limit, 
  page,
  sortBy,
  orderBy,
  search
}: {
  status?: StatusType
  limit?: number;
  page?: number;
  sortBy?: string;
  orderBy?: OrderStatus;
  search?: string;
}) => {
  try {
    let url = `${BASE_URL}/cryptos?`;
    if (limit) url += `limit=${limit}&`;
    if (page) url += `page=${page}&`;
    if (sortBy) url += `sort_by=${sortBy}&`;
    if (orderBy) url += `sort_order=${orderBy}&`;
    if (search) url += `search=${search}&`;

    const response = await _fetchWithAuth(url);
    const responseJson = await response.json();
    if (response.status === 200) {
      return { error: false, message: responseJson.message, data: responseJson.result }
    }

    return { error: true, message: responseJson.message, data: null };
  } catch (error) {
    console.error(`Failed get data bank. Error: ${error}`);
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`,
      data: null
    }
  }
};

export const bulkDeleteUserCrypto = async ({ cryptoIds }: { cryptoIds: number[]; }) => {
  try {
    const url = `${BASE_URL}/cryptos/bulk`;
    const response = await _fetchWithAuth(url, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        ids: cryptoIds
      })
    });
    const responseJson = await response.json();
    if (response.status === 200) {
      return { error: false, message: responseJson.result.message }
    }

    return { error: true, message: responseJson.message };
  } catch (error) {
    console.error(`Failed delete bulk crypto. Error: ${error}`);
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`
    }
  }
};

// Broker API
export const getAllBrokerUsers = async ({
  limit, 
  page,
  sortBy,
  orderBy,
  status,
  search
}: {
  status?: StatusType
  limit?: number;
  page?: number;
  sortBy?: string;
  orderBy?: OrderStatus;
  search?: string;
}) => {
  try {
    let url = `${BASE_URL}/brokers?`;
    if (limit) url += `limit=${limit}&`;
    if (page) url += `page=${page}&`;
    if (sortBy) url += `sort_by=${sortBy}&`;
    if (orderBy) url += `sort_order=${orderBy}&`;
    if (status) url += `status=${status}&`;
    if (search) url += `search=${search}&`;

    const response = await _fetchWithAuth(url);
    const responseJson = await response.json();
    if (response.status === 200) {
      return { error: false, message: responseJson.message, data: responseJson.result }
    }

    return { error: true, message: responseJson.message, data: null };
  } catch (error) {
    console.error(`Failed get data broker. Error: ${error}`);
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`,
      data: null
    }
  }
};

export const deleteBrokerUserById = async ({ brokerId }: { brokerId: number; }) => {
  try {
    const url = `${BASE_URL}/brokers/${brokerId}`;
    const response = await _fetchWithAuth(url, {
      method: "DELETE"
    });
    const responseJson = await response.json();
    if (response.status === 200) {
      return { error: false, message: responseJson.message }
    }

    return { error: true, message: responseJson.message };
  } catch (error) {
    console.error(`Failed delete broker. Error: ${error}`);
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`
    }
  }
};

export const bulkDeleteBrokerUsers = async ({ brokerIds }: { brokerIds: number[]; }) => {
  try {
    const url = `${BASE_URL}/brokers/bulk`;
    const response = await _fetchWithAuth(url, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        ids: brokerIds
      })
    });
    const responseJson = await response.json();
    if (response.status === 200) {
      return { error: false, message: responseJson.result.message }
    }

    return { error: true, message: responseJson.message };
  } catch (error) {
    console.error(`Failed bulk delete broker. Error: ${error}`);
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`
    }
  }
};

export const bulkChangeStatusBrokerUsers = async ({ 
  brokerIds, status 
}: { 
  brokerIds: number[]; 
  status: StatusType; 
}) => {
  try {
    const url = `${BASE_URL}/brokers/status`;
    const response = await _fetchWithAuth(url, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        ids: brokerIds,
        status
      })
    });
    const responseJson = await response.json();
    if (response.status === 200) {
      return { error: false, message: responseJson.result.message }
    }

    return { error: true, message: responseJson.message };
  } catch (error) {
    console.error(`Failed update status broker. Error: ${error}`);
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`
    }
  }
};

// WithdrawalRequests API
export const getAllWithdrawalRequests = async ({
  limit, 
  page,
  sortBy,
  orderBy,
  status,
  search,
  startDate,
  endDate
}: {
  status?: StatusType
  limit?: number;
  page?: number;
  sortBy?: string;
  orderBy?: OrderStatus;
  search?: string;
  startDate?: string;
  endDate?: string;
}) => {
  try {
    let url = `${BASE_URL}/withdrawals?`;
    if (limit) url += `limit=${limit}&`;
    if (page) url += `page=${page}&`;
    if (sortBy) url += `sort_by=${sortBy}&`;
    if (orderBy) url += `sort_order=${orderBy}&`;
    if (status) url += `status=${status}&`;
    if (search) url += `search=${search}&`;
    if (startDate) url += `start_date=${startDate}&`;
    if (endDate) url += `end_date=${endDate}&`;

    const response = await _fetchWithAuth(url);
    const responseJson = await response.json();
    if (response.status === 200) {
      return { error: false, message: responseJson.message, data: responseJson.result }
    }

    return { error: true, message: responseJson.message, data: null };
  } catch (error) {
    console.error(`Failed get data withdrawal. Error: ${error}`);
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`,
      data: null
    }
  }
};

export const bulkChangeStatusWithdrawals = async ({ 
  withdrawalIds, status 
}: { 
  withdrawalIds: number[]; 
  status: StatusType; 
}) => {
  try {
    const url = `${BASE_URL}/withdrawals/status`;
    const response = await _fetchWithAuth(url, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        ids: withdrawalIds,
        status
      })
    });
    const responseJson = await response.json();
    if (response.status === 200) {
      return { error: false, message: responseJson.result.message }
    }

    return { error: true, message: responseJson.message };
  } catch (error) {
    console.error(`Failed update status withdrawal. Error: ${error}`);
    return {
      error: true, 
      message: `Please try again later. Error: ${error}`
    }
  }
};

export const connectWhatsApp = async () => {
  try {
      const response = await _fetchWithAuth(
          `${BASE_URL}/whatsapp/connect`,
          {
              method: "POST",
              headers: {
                  "content-type": "application/json"
              }
          }
      );
      const responseJson = await response.json();
      if (response.status === 200) {
          return {
              error: false,
              message: responseJson.message,
              data: responseJson.result
          };
      }
      return {
          error: true,
          message: responseJson.message,
          data: null
      };
  } catch (error) {
      console.error(`Failed connect WhatsApp. Error: ${error}`);
      return {
          error: true,
          message: `Please try again later. Error: ${error}`,
          data: null
      };
  }
};

export const disconnectWhatsApp = async () => {
  try {
      const response = await _fetchWithAuth(
          `${BASE_URL}/whatsapp/disconnect`,
          {
              method: "POST",
              headers: {
                  "content-type": "application/json"
              }
          }
      );
      const responseJson = await response.json();
      if (response.status === 200) {
          return {
              error: false,
              message: responseJson.message,
          };
      }
      return {
          error: true,
          message: responseJson.message,
      };
  } catch (error) {
      console.error(`Failed disconnect WhatsApp. Error: ${error}`);
      return {
          error: true,
          message: `Please try again later. Error: ${error}`,
      };
  }
};

export const statusWhatsApp = async () => {
  try {
      const response = await _fetchWithAuth(
          `${BASE_URL}/whatsapp/status`,
          {
              method: "GET",
              headers: {
                  "content-type": "application/json"
              }
          }
      );
      const responseJson = await response.json();
      if (response.status === 200) {
          return {
              error: false,
              message: responseJson.message,
              data: responseJson.result
          };
      }
      return {
          error: true,
          message: responseJson.message,
          data: null
      };
  } catch (error) {
      console.error(`Failed get WhatsApp status. Error: ${error}`);
      return {
          error: true,
          message: `Please try again later. Error: ${error}`,
          data: null
      };
  }
};
