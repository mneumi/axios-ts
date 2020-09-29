import { isPlainObject } from './utils';
import { IData } from '../types';

export function processRequestData(data: IData): string {
  return JSON.stringify(data);
}

export function processResponseData<T>(data: T): T {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (e) {
      // do nothing
    }
  }
  return data;
}