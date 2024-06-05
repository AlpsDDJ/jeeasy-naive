// 导入接口和基类
import { BaseModel } from '@/hooks/useModel'
import { Axios, Delete, Get, Post, Put } from 'easy-descriptor'
import type { FormData } from 'easy-descriptor'

/**
 * 定义基础API类，提供模块化的基本操作。
 */
export class BaseApi {
  protected static module = '' // 用于定义API的基础模块路径
  protected modelPath = '' // 用于存储模型路径
  constructor(modelPath?: string) {
    this.modelPath = modelPath ?? ''
  } // 构造函数，初始化实例
}

/**
 * 定义基于模型的API类，继承自BaseApi，提供具体的CRUD操作。
 * @template T 继承自BaseModel的模型类
 */
@Axios()
export class ModelApi<T extends BaseModel> extends BaseApi {
  // 使用GET方法定义分页查询的HTTP请求
  @Get()
  declare page: HttpRequest<PageData<T>>

  // 使用GET方法定义根据ID获取信息的HTTP请求
  @Get('/{id}')
  declare info: HttpRequest<T, DataIdParam>

  // 使用PUT方法定义更新信息的HTTP请求
  @Put()
  declare update: HttpRequest<string, FormData<T>>

  // 使用POST方法定义保存信息的HTTP请求
  @Post()
  declare save: HttpRequest<string, FormData<T>>

  // 使用DELETE方法定义根据ID删除信息的HTTP请求
  @Delete('/{id}')
  declare delete: HttpRequest<string, DataIdParam>

  // 使用DELETE方法定义批量删除的HTTP请求
  @Delete('/batch')
  declare batchDelete: HttpRequest<string, { ids: string }>

  /**
   * 构造函数，初始化ModelApi实例。
   * @param modelPath 模型的路径，用于构建API的路径
   */
  constructor(modelPath: string) {
    super(modelPath)
  }
}

/**
 * 提供一个函数，用于根据模型路径创建ModelApi实例。
 * @template T 继承自BaseModel的模型类
 * @param modelPath 模型的路径，用于构建API的路径
 * @returns 返回一个初始化后的ModelApi<T>实例
 */
export const useModelApi = <T extends BaseModel>(modelPath: string) => {
  return new ModelApi<T>(modelPath)
}
