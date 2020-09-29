import Axios from './core/Axios';
import { IAxiosInstance } from './types/index';
import { extend } from './helpers/utils';

function createInstance(): IAxiosInstance {
  const context = new Axios();
  const instance = Axios.prototype.request.bind(context);

  extend(instance, context);

  return instance as IAxiosInstance;
}

const axios = createInstance();

export default axios;