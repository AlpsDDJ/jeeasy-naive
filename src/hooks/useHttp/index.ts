import { AxiosRequestConfig } from 'axios'
import { httpRequest } from '@/utils/http'
import { cloneDeep } from 'lodash-es'

export class BaseApi {
  static module = ''
}

export type ApiModule = {
  module?: string
}

export const Api = (parmas?: ApiModule) => {
  const classDecorator: ClassDecorator = (constructor) => {
    if (parmas) {
      const { module = '' } = parmas
      constructor['module'] = module
    }
    return constructor
  }
  return classDecorator
}

Api.Http = (config: AxiosRequestConfig) => {
  const propertyDecorator: PropertyDecorator = (target, propertyKey) => {
    target[propertyKey] = (data, _conf = {}) => {
      const httpConfig = cloneDeep({ ...config, ..._conf })
      httpConfig.url = target['module'] + httpConfig.url
      const method = httpConfig.method?.toUpperCase() || 'GET'
      data && (httpConfig[['DELETE', 'GET'].some((key) => key === method) ? 'params' : 'data'] = data)
      httpConfig.method = method
      return httpRequest({}, httpConfig)
    }
  }
  return propertyDecorator
}

Api.Get = (url: string, config: AxiosRequestConfig = {}) => {
  const httpConfig = Object.assign(config, {
    url,
    method: 'GET'
  } as AxiosRequestConfig)
  return Api.Http(httpConfig)
}

Api.Post = (url: string, config: AxiosRequestConfig = {}) => {
  const httpConfig = Object.assign(config, {
    url,
    method: 'POST'
  } as AxiosRequestConfig)
  return Api.Http(httpConfig)
}

Api.Put = (url: string, config: AxiosRequestConfig = {}) => {
  const httpConfig = Object.assign(config, {
    url,
    method: 'PUT'
  } as AxiosRequestConfig)
  return Api.Http(httpConfig)
}

Api.Delete = (url: string, config: AxiosRequestConfig = {}) => {
  const httpConfig = Object.assign(config, {
    url,
    method: 'DELETE'
  } as AxiosRequestConfig)
  return Api.Http(httpConfig)
}
