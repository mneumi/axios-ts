import { IAxiosRequestConfig, IAxiosResponse, IAxiosPromise, IHeaders, IData } from "../types";
import { processURL } from '../helpers/url';
import { processHeaders } from '../helpers/headers';
import { processRequestData, processResponseData } from '../helpers/data';
import { xhr } from './xhr';

async function dispatchRequest<T>(config: IAxiosRequestConfig): IAxiosPromise<T> {
  processConfig(config);
  const res = await xhr<T>(config);
  return transformResponseData<T>(res);
}

function processConfig(config: IAxiosRequestConfig): void {
  config.url = transformRequestURL(config);
  config.headers = transformRequestHeaders(config);
  config.data = transformRequestData(config);
}

function transformRequestURL(config: IAxiosRequestConfig): string {
  const { url, params } = config;
  return processURL(url!, params);
}

function transformRequestHeaders(config: IAxiosRequestConfig): IHeaders {
  const { headers = {}, data } = config;
  if (!data || typeof data === 'string') {
    return headers;
  }
  return processHeaders(headers, data);
}

function transformRequestData(config: IAxiosRequestConfig): string {
  if (!config.data) {
    return "";
  }
  if (typeof config.data === 'string') {
    return config.data;
  }
  return processRequestData(config.data);
}

function transformResponseData<T>(res: IAxiosResponse<T>): IAxiosResponse<T> {
  res.data = processResponseData<T>(res.data);
  return res;
}

export default dispatchRequest;