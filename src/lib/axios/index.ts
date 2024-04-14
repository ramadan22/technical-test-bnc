/* eslint-disable no-param-reassign */

import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';
import { DefaultApiResponseType } from '@/types/responseApi';

const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const onRequest = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => config;

const onRequestError = (error: AxiosError): Promise<AxiosError> => Promise.reject(error);

const onResponse = (response: AxiosResponse): AxiosResponse => response;

const onResponseError = (error: AxiosError) => Promise.reject(error);

AxiosInstance.interceptors.request.use(onRequest, onRequestError);
AxiosInstance.interceptors.response.use(
  (response: AxiosResponse<DefaultApiResponseType>) => onResponse(response),
  (error: AxiosError<DefaultApiResponseType>) => onResponseError(error),
);

export default AxiosInstance;
