import { cloneDeep } from 'lodash-es'
import { BaseModel } from '@/hooks/useModel'
import { IFormDataType, IInputType } from '@/components/ext/types'

function fieldFn(): PropertyDecorator
function fieldFn(label: string): PropertyDecorator
function fieldFn<T extends InternalRowData>(option: Partial<FieldOption<T>>): PropertyDecorator
function fieldFn<T extends InternalRowData>(label: string, option: Partial<FieldOption<T>>): PropertyDecorator
function fieldFn<T extends InternalRowData>(label?: string | Partial<FieldOption<T>>, option?: Partial<FieldOption<T>>): PropertyDecorator {
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

fieldFn.Hidden = (hiddenType: FieldHiddenType = true): PropertyDecorator => {
  return (target: Object, propertyKey: DataKey): void => {
    const state = getState(target)
    // state['fields'][propertyKey].hidden = true
    setFieldProperty(state, propertyKey, { hidden: hiddenType })
  }
}

fieldFn.DataType = (dataType: IFormDataType = FormDataType.STRING, inputType?: IInputType): PropertyDecorator => {
  return (target: Object, propertyKey: DataKey): void => {
    const state = getState(target)
    let it: IInputType = InputType.TEXT
    if (!inputType) {
      switch (dataType) {
        case FormDataType.NUMBER:
          it = InputType.INPUT_NUMBER
          break
        case FormDataType.DATE:
          it = InputType.DATE
          break
        case FormDataType.TIME:
          it = InputType.TIME
          break
        case FormDataType.DATETIME:
          it = InputType.DATETIME
          break
        case FormDataType.BOOLEAN:
          it = InputType.SWITCH
          break
      }
    }
    setFieldProperty(state, propertyKey, { dataType: dataType, inputType: it })
  }
}

function createColunm<T extends InternalRowData>(key: DataKey, optionTemp: Partial<FieldOption<T>>): FieldOption<T> {
  return {
    ...optionTemp,
    key: key as string,
    title: optionTemp.label
  }
}

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

function setFieldProperty<T extends BaseModel>(state: ModelState<T>, key: DataKey, property: Partial<FieldOption<T>>): void {
  const props = state['fields'][key] || {}
  state['fields'][key] = { ...props, ...property }
}

const Field: FieldDecoratorType = fieldFn
export default Field
