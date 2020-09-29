import { IAxiosRequestConfig, IMethod, IAxiosPromise, IAxios } from '../types';
import dispatchRequest from './dispatchRequest';

export default class Axios implements IAxios {
  request<T = any>(url: any, config?: any): IAxiosPromise<T> {
    if (typeof url === 'string') {
      if (!config) {
        config = {};
      }
      config.url = url;
    } else {
      config = url;
    }
    return dispatchRequest<T>(config);
  }

  get<T = any>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T> {
    return this._requestMethodWithoutData('get', url, config);
  }

  delete<T = any>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T> {
    return this._requestMethodWithoutData('delete', url, config);
  }

  private _requestMethodWithoutData<T = any>(method: IMethod, url: string, config?: IAxiosRequestConfig):
    IAxiosPromise<T> {
    return this.request(Object.assign(config || {}, {
      method,
      url
    }));
  }

  head<T = any>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T> {
    return this._requestMethodWithoutData<T>('head', url, config);
  }

  options<T = any>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T> {
    return this._requestMethodWithoutData<T>('options', url, config);
  }

  post<T = any>(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise<T> {
    return this._requestMethodWithData<T>('post', url, data, config);
  }

  put<T = any>(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise<T> {
    return this._requestMethodWithData<T>('put', url, data, config);
  }

  patch<T = any>(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise<T> {
    return this._requestMethodWithData<T>('patch', url, data, config);
  }

  private _requestMethodWithData<T = any>(method: IMethod, url: string, data?: any, config?: IAxiosRequestConfig):
    IAxiosPromise<T> {
    return this.request<T>(Object.assign(config || {}, {
      method,
      url,
      data
    }));
  }
}