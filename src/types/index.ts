export type Method = "get" | "GET" | "post" | "POST"
| "put" | "PUT" | "patch" | "PATCH" | "head" | "HEAD"
| "options" | "OPTIONS" | "delete" | "DELETE";

export interface AxiosRequestConfig {
  url: string;
  method?: Method;
  data?: any;
  params?: any;
  headers?: any;
  responseType?: XMLHttpRequestResponseType;
};

export interface AxiosResponse {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request: any;
};