import axios, { AxiosRequestConfig } from 'axios';

import config from '../../config';

const createFormParams = (params: any) => {
  return Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
    )
    .join('&');
};

const secret =
  process.env.REACT_APP_CLIENT_ACCESS +
  ':' +
  process.env.REACT_APP_CLIENT_SECRET;

const encodedSecret = Buffer.from(secret).toString('base64');

const apiConfig: AxiosRequestConfig = {
  baseURL: 'https://unsplash.com',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    Authorization: 'Basic ' + encodedSecret,
  },
};

export const axiosInstance = axios.create(apiConfig);

export const getToken = async (code: string) =>
  await axiosInstance.post('/oauth/token', {
    data: createFormParams({
      client_id: config.apiClientId,
      client_secret: config.apiClientSecret,
      redirect_uri: 'http://localhost:3000',
      code,
      grant_type: 'authorization_code',
    }),
  });
