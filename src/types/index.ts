export type IMethod = "get" | "GET" | "post" | "POST"
| "put" | "PUT" | "patch" | "PATCH" | "head" | "HEAD"
| "options" | "OPTIONS" | "delete" | "DELETE";

export interface IData {
  [key: string]: any;
}

export interface IParams {
  [key: string]: any;
};

export interface IHeaders {
  [key: string]: string;
}

export interface IAxiosRequestConfig {
  url?: string;
  method?: IMethod;
  data?: IData | string;
  params?: IParams;
  headers?: IHeaders;
  responseType?: XMLHttpRequestResponseType;
  timeout?: number;
};

export interface IAxiosResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: IHeaders;
  config: IAxiosRequestConfig;
  request: XMLHttpRequest;
};

export interface IAxiosError<T> extends Error {
  isAxiosError: boolean;
  config: IAxiosRequestConfig;
  code?: string | null;
  request?: XMLHttpRequest;
  response?: IAxiosResponse<T>;
};

export type IAxiosPromise<T> = Promise<IAxiosResponse<T>>;

export interface IAxios {
  request<T = any>(config: IAxiosRequestConfig): IAxiosPromise<T>;

  get<T = any>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>;
  delete<T = any>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>;
  head<T = any>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>;
  options<T = any>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>;

  post<T = any>(url: string, data?: IData, config?: IAxiosRequestConfig): IAxiosPromise<T>;
  put<T = any>(url: string, data?: IData, config?: IAxiosRequestConfig): IAxiosPromise<T>;
  patch<T = any>(url: string, data?: IData, config?: IAxiosRequestConfig): IAxiosPromise<T>;
};

// AxiosInstance是混合类型，本身是一个函数
// 该函数对象上又绑定有静态方法
// 即具有axios方法的同时拥有简便静态方法
export interface IAxiosInstance extends IAxios {
  <T = any>(config: IAxiosRequestConfig): IAxiosPromise<T>;

  <T = any>(url:string, config?: IAxiosRequestConfig): IAxiosPromise<T>;
};