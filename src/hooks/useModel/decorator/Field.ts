import { cloneDeep } from 'lodash-es'
import { BaseModel } from '@/hooks/useModel'
import { IFormDataType, IInputType } from '@/components/ext/types'

// function fieldFn(): PropertyDecorator
// function fieldFn(label: string): PropertyDecorator
// function fieldFn<T extends InternalRowData>(option: Partial<FieldOption<T>>): PropertyDecorator
// function fieldFn<T extends InternalRowData>(label: string, option: Partial<FieldOption<T>>): PropertyDecorator
/**
 * fieldFn函数用作定义PropertyDecorator类型的装饰器。
 *
 * @param label - 字符串类型，字段的标签。可选参数。
 * @param option - Partial<FieldOption<T>>类型，字段的选项。可选参数。
 * @returns 返回一个PropertyDecorator类型的函数，用于装饰对象的属性。
 */
const Field: FieldDecoratorType = <T extends InternalRowData>(
  label?: string | Partial<FieldOption<T>>,
  option?: Partial<FieldOption<T>>
): PropertyDecorator => {
  let optionTemp: Partial<FieldOption<T>> = {}
  optionTemp = cloneDeep(option || {})
  if (option?.booleanFlags) {
    option?.booleanFlags?.forEach((item: string): void => {
      optionTemp[item] = true
    })
  }
  if (typeof label === 'string') {
    optionTemp.label = label as string
  } else if (label) {
    optionTemp = cloneDeep(label)
  }

  return (target: Object, propertyKey: DataKey): void => {
    const state: ModelState<T> = getState<T>(target)
    const colunm: FieldOption<T> = createColunm(propertyKey, optionTemp)
    setFieldProperty<T>(state, propertyKey, colunm)
  }
}

/**
 * 隐藏字段属性装饰器
 * @param hiddenType - 隐藏类型，默认为 FieldHiddenType.TRUE
 * @param hiddenHandler 隐藏属性处理器
 * @returns PropertyDecorator
 */
const Hidden: HiddenDecoratorType = (hiddenType: FieldHiddenType = true, hiddenHandler?: FieldAttrHandler): PropertyDecorator => {
  return (target: Object, propertyKey: DataKey): void => {
    const state = getState(target)
    setFieldProperty(state, propertyKey, { hidden: hiddenType, hiddenHandler })
  }
}

/**
 * 字段只读属性装饰器
 * @returns PropertyDecorator
 * @param disabledType
 * @param disabledHandler
 */
const Disabled: DisabledDecoratorType = (disabledType: FieldDisabledType = true, disabledHandler?: FieldAttrHandler): PropertyDecorator => {
  return (target: Object, propertyKey: DataKey): void => {
    const state = getState(target)
    setFieldProperty(state, propertyKey, { disabled: disabledType, disabledHandler: disabledHandler })
  }
}

/**
 * 设置指定属性为字典类型
 *
 * @param dict - 字典值或true
 * @returns PropertyDecorator
 */
const Dict: DictDecoratorType = (dict?: string): PropertyDecorator => {
  return (target: Object, propertyKey: DataKey): void => {
    const state = getState(target)
    const dictRender = (row: any) => {
      return row[`${propertyKey as string}_dict`]
    }
    setFieldProperty(state, propertyKey, { dict: dict || (propertyKey as string), render: dictRender })
  }
}

/**
 * 设置字段的类型和输入类型
 *
 * @param dataType - 字段的数据类型，默认为字符串类型
 * @param inputType - 字段的输入类型，默认为文本输入类型
 * @returns 无返回值
 */
const DataType: DataTypeDecoratorType = (dataType: IFormDataType = FormDataType.STRING, inputType?: IInputType): PropertyDecorator => {
  return (target: Object, propertyKey: DataKey): void => {
    const state = getState(target)
    let it: IInputType
    switch (dataType) {
      case FormDataType.NUMBER:
        it = inputType || InputType.INPUT_NUMBER
        break
      case FormDataType.DATE:
        it = inputType || InputType.DATE
        break
      case FormDataType.TIME:
        it = inputType || InputType.TIME
        break
      case FormDataType.DATETIME:
        it = inputType || InputType.DATETIME
        break
      case FormDataType.BOOLEAN:
        it = inputType || InputType.SWITCH
        break
      default:
        it = inputType || InputType.TEXT
        break
    }
    setFieldProperty(state, propertyKey, { dataType: dataType, inputType: it })
  }
}

function createColunm<T extends InternalRowData>(key: DataKey, optionTemp: Partial<FieldOption<T>>): FieldOption<T> {
  // const textRender = (row: any) => {
  //   if (optionTemp.dict) {
  //     console.log(`${key as string}_dict`, row[`${key as string}_dict`])
  //     return row[`${key as string}_dict`]
  //   } else {
  //     return row[key]
  //   }
  // }
  // key === 'status' && console.log(1, optionTemp)

  // console.log('optionTemp.render --------> ', optionTemp.render)

  return {
    ...optionTemp,
    key: key as string,
    title: optionTemp.label
    // render: textRender
  }
}

/**
 * 获取指定对象的状态
 * @param target 目标对象
 * @returns 返回目标对象的状态
 */
function getState<T extends BaseModel>(target: Object): ModelState<T> {
  const constructor = target.constructor
  const state = Object.getOwnPropertyDescriptor(constructor, 'state')
  if (state) {
    return target.constructor['state']
  } else {
    const parentTarget = Object.getPrototypeOf(target.constructor)
    target.constructor['state'] = cloneDeep(parentTarget['state'])
    return target.constructor['state']
  }
}

/**
 * 设置指定属性
 * @param state - 模型状态对象
 * @param key - 数据键值
 * @param property - 属性对象
 * @returns 无返回值
 */
function setFieldProperty<T extends BaseModel>(state: ModelState<T>, key: DataKey, property: Partial<FieldOption<T>>): void {
  const props = state['fields'][key] || {}
  state['fields'][key] = { ...props, ...property }
}

export { Field, Hidden, Disabled, Dict, DataType }
