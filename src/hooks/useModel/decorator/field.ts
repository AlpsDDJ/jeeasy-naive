import { cloneDeep, isArray } from 'lodash-es'
import { BaseModel } from '@/hooks/useModel'

const Field: FieldDecoratorType = <T extends InternalRowData>(label?: string | FieldOption<T>, option?: FieldOptionFlag[] | FieldOption<T>) => {
  let optionTemp: FieldOption<T> = {
    key: ''
  }
  if (isArray(option)) {
    option.forEach((item) => {
      optionTemp[item] = true
    })
  } else {
    optionTemp = cloneDeep(option || {}) as FieldOption<T>
  }
  if (typeof label === 'string') {
    optionTemp.label = label as string
  } else if (label) {
    optionTemp = cloneDeep(label) as FieldOption<T>
  }

  const propertyDecorator: PropertyDecorator = (target, propertyKey) => {
    const state = getState(target)
    state['keys'][propertyKey] = propertyKey
    // state['labels'][propertyKey] = label
    // state['fields'][propertyKey] = createColunm(propertyKey, optionTemp)
    setFieldProperty(state, propertyKey, createColunm(propertyKey, optionTemp))
  }
  return propertyDecorator
}

export const FieldHidden = (hiddenType?: FieldHiddenType) => {
  const propertyDecorator: PropertyDecorator = (target, propertyKey) => {
    console.log('propertyKey --1--> ', Object.getOwnPropertyDescriptor(target, propertyKey))
    const state = getState(target)
    // state['fields'][propertyKey].hidden = true
    setFieldProperty(state, propertyKey, { hidden: hiddenType === undefined ? true : hiddenType })
  }
  return propertyDecorator
}

function createColunm<T extends InternalRowData>(key: string | symbol, optionTemp: FieldOption<T>): FieldOption<T> {
  // const { label, ...option } = optionTemp
  // optionTemp.key = key as ColumnKey
  // optionTemp.title = optionTemp.label
  return {
    ...optionTemp,
    key: key as string,
    title: optionTemp.label
  }
  // return {
  //   ...option,
  //   key,
  //   title: label
  // }
}

function getState(target: Object): ModelState<BaseModel> {
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

function setFieldProperty(state: ModelState<BaseModel>, key: string | symbol, property: InternalRowData): void {
  const props = state['fields'][key] || {}
  state['fields'][key] = { ...props, ...property }
}

export default Field
