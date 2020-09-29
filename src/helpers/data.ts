import { isPlainObject } from './utils';

export function processRequestData(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data);
  }
  return data;
}

export function processResponseData(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (e) {
      // do noting
    }
  }
  return data;
}