import { AxiosRequestConfig, AxiosResponse } from "./types";
import { processURL } from './helpers/url';
import { processHeaders } from './helpers/headers';
import { processRequestData, processResponseData } from './helpers/data';
import { xhr } from './xhr';

function axios(config: AxiosRequestConfig): Promise<AxiosResponse> {
  processConfig(config);

  return xhr(config).then(res => {
    return transformResponseData(res);
  });
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformRequestURL(config);
  config.headers = transformRequestHeaders(config);
  config.data = transformRequestData(config);
}

function transformRequestURL(config: AxiosRequestConfig): string {
  const { url, params } = config;
  return processURL(url, params);
}

function transformRequestHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config;
  return processHeaders(headers, data);
}

function transformRequestData(config: AxiosRequestConfig): any {
  return processRequestData(config.data);
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = processResponseData(res.data);
  return res;
}

export default axios;