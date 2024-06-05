// import { AxiosRequestConfig } from 'axios'
// import { cloneDeep } from 'lodash-es'
// import { httpRequest } from '@/utils/http'
//
// type ApiModule = {
//   module?: string
// }
//
// const Server = (module?: string | ApiModule, params?: ApiModule) => {
//   return <T extends { new (...args: any[]): {} }>(constructor: T) => {
//     let module_ = ''
//     if (module) {
//       if (typeof module === 'string') {
//         module_ = module
//       } else {
//         module_ = params?.module || ''
//       }
//     }
//     constructor['module'] = module_
//     return constructor
//   }
// }
//
// const Http = (config: AxiosRequestConfig) => {
//   return function (target, propertyKey): any {
//     const isStatic = typeof target === 'function'
//
//     if (isStatic) {
//       target[propertyKey] = (data, _conf = {}) => {
//         const httpConfig = cloneDeep({ ...config, ..._conf })
//         const module = target['module']
//         httpConfig.url = module + httpConfig.url
//         return httpRequest(data, httpConfig)
//       }
//     } else {
//       Object.defineProperty(target, propertyKey, {
//         get() {
//           return (data, _conf = {}) => {
//             const httpConfig = cloneDeep({ ...config, ..._conf })
//             const module = target.constructor['module'] + (this.modelPath || '')
//             httpConfig.url = module + httpConfig.url
//             return httpRequest(data, httpConfig)
//           }
//         },
//         set(v: any) {
//           this[propertyKey] = v
//         }
//       })
//     }
//   }
// }
//
// const Get = (url = '', config: AxiosRequestConfig = {}) => {
//   const httpConfig = Object.assign(config, {
//     url,
//     method: 'GET'
//   } as AxiosRequestConfig)
//   return Http(httpConfig)
// }
//
// const Post = (url = '', config: AxiosRequestConfig = {}) => {
//   const httpConfig = Object.assign(config, {
//     url,
//     method: 'POST'
//   } as AxiosRequestConfig)
//   return Http(httpConfig)
// }
//
// const Put = (url = '', config: AxiosRequestConfig = {}) => {
//   const httpConfig = Object.assign(config, {
//     url,
//     method: 'PUT'
//   } as AxiosRequestConfig)
//   return Http(httpConfig)
// }
//
// const Delete = (url = '', config: AxiosRequestConfig = {}) => {
//   const httpConfig = Object.assign(config, {
//     url,
//     method: 'DELETE'
//   } as AxiosRequestConfig)
//   return Http(httpConfig)
// }
//
// export { Server, Http, Get, Post, Put, Delete }
