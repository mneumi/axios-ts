import { IAxiosRequestConfig, IAxiosResponse, IAxiosError } from '../types/index';

export class AxiosError<T> implements IAxiosError<T> {
  name: string = "default";
  message: string;
  isAxiosError: boolean;
  config: IAxiosRequestConfig;
  code?: string | null;
  request: XMLHttpRequest;
  response?: IAxiosResponse<T>;

  constructor(
    message: string,
    config: IAxiosRequestConfig,
    request: XMLHttpRequest,
    code?: string | null,
    response?: IAxiosResponse<T>,
    name?: string
  ) {
    this.message = message;
    this.config = config;
    this.code = code;
    this.request = request;
    this.response = response;
    this.isAxiosError = true;

    Object.setPrototypeOf(this, AxiosError.prototype); // 注意
  }
}

export function createError<T>(
  message: string,
  config: IAxiosRequestConfig,
  request: XMLHttpRequest,
  code?: string | null,
  response?: IAxiosResponse<T>
) {
  const error = new AxiosError(message, config, request, code, response);
  return error;
}