import { IAxiosRequestConfig, IAxiosResponse, IAxiosPromise } from '../types';
import { parseHeaders } from '../helpers/headers';
import { createError } from '../helpers/error';

export function xhr<T>(config: IAxiosRequestConfig): IAxiosPromise<T> {
  return new Promise((resolve, reject) => {
    const { data, url, method = 'get',
      headers, responseType, timeout } = config;

    const request = new XMLHttpRequest();

    if (responseType) {
      request.responseType = responseType;
    }

    if (timeout) {
      request.timeout = timeout;
    }

    if (headers) {
      Object.keys(headers).forEach(name => {
        if (data === null && name.toLocaleLowerCase() === 'content-type') {
          delete headers[name];
        } else {
          request.setRequestHeader(name, headers[name]);
        }
      });
    }

    request.open(method, url!, true);

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 0) {
        return;
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders());

      const response: IAxiosResponse<T> = {
        data: request.response,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }

      handleResponse(response);
    };

    request.onerror = function handleError() {
      reject(createError('Network Error', config, request, null));
    };

    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, request, 'ECONNABORTED'));
    }

    request.send(data as string);

    function handleResponse(response: IAxiosResponse<T>): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response);
      } else {
        reject(createError(`Request failed with status code ${response.status}`,
          config, request, null, response
        ));
      }
    }
  });
}