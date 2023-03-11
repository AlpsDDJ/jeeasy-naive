import { AxiosRequestConfig } from 'axios'
import { httpRequest } from '@/utils/http'
import { cloneDeep } from 'lodash-es'
import 'reflect-metadata'

class BaseApi {
  static module = ''
  constructor() {}
}

export type ApiModule = {
  module?: string
}

const Api = (module?: string | ApiModule, params?: ApiModule) => {
  return <T extends { new (...args: any[]): {} }>(constructor: T) => {
    // console.log('constructor 1212 ---> ', constructor.prototype.test)
    let module_ = ''
    if (module) {
      if (typeof module === 'string') {
        module_ = module
      } else {
        module_ = params?.module || ''
      }
    }
    constructor['module'] = module_
    return class extends constructor {
      constructor(...args) {
        super(args)
        Object.keys(constructor.prototype).forEach((key) => {
          const prop = constructor.prototype[key]
          if (prop && prop.name === '__http') {
            this[key.slice(2)] = constructor.prototype[key]
            delete constructor.prototype[key]
          }
        })
      }
    }
  }
}

Api.Http = (config: AxiosRequestConfig) => {
  const propertyDecorator: PropertyDecorator = (target, propertyKey): any => {
    const isStatic = typeof target === 'function'

    const __http: HttpRequest = (data, _conf = {}) => {
      const httpConfig = cloneDeep({ ...config, ..._conf })
      const module = isStatic ? target['module'] : target.constructor['module']
      httpConfig.url = module + httpConfig.url
      return httpRequest(data, httpConfig)
    }

    if (isStatic) {
      target[propertyKey] = __http
    } else {
      target[`__${propertyKey.toString()}`] = __http
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

export { Api, BaseApi }
