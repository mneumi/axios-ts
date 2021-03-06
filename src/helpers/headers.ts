import { isPlainObject } from './utils';
import { IHeaders, IData } from '../types';

export function processHeaders(headers: IHeaders, data: IData): IHeaders {
  normalizeHeaderName(headers, "Content-Type");

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8';
    }
  }

  return headers;
}

function normalizeHeaderName(headers: IHeaders, normalizeName: string): void {
  Object.keys(headers).forEach(name => {
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[name];
      delete headers[name];
    }
  })
}

export function parseHeaders(headers: string): IHeaders {
  let parsed = Object.create(null);
  if (!headers) {
    return parsed;
  }

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':');
    key = key.trim().toLowerCase();
    if (!key) {
      return;
    }
    if (val) {
      val = val.trim();
    }
    parsed[key] = val;
  });

  return parsed;
}