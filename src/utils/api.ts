import axios, { AxiosRequestConfig } from 'axios';
import config from 'src/config';

export type Results<T> = { results: T[]; total: number; total_pages: number };

const apiConfig: AxiosRequestConfig = {
  timeout: 5000,
  baseURL: config.apiUrl,
  headers: {
    'Accept-Version': 'v1',
    common: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    Authorization: `Client-ID ${config.apiClientId}`,
  },
};

export const axiosInstance = axios.create(apiConfig);

export const createApi = <T>(endpoint: string) => {
  return Object.freeze({
    find(params?: object): Promise<Results<T>> {
      return axiosInstance.get(endpoint, params).then((res) => res.data);
    },

    like(id: string): Promise<Results<T>> {
      return axiosInstance.post(`/photos/${id}/like`).then((res) => res.data);
    },

    unlike(id: string): Promise<Results<T>> {
      return axiosInstance.delete(`/photos/${id}/like`).then((res) => res.data);
    },
  });
};
