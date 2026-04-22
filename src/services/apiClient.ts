export const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const getLocalStorage = (key: string): string | null => {
  return localStorage.getItem(key);
}

export const setLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
}

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
}

export const putAccessToken = (value: string) => {
  setLocalStorage("accessToken", value);
}

export const getAccessToken = (): string | null => {
  return getLocalStorage("accessToken");
}

type fetchType = (
  url: string, 
  options?: {
    headers?: Record<string, string>, 
    method?: string, 
    body?: string 
}) => Promise<Response>;

export const _fetchWithAuth: fetchType = async (url, options = {}) =>{
  return await fetch (url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    }
  })
}