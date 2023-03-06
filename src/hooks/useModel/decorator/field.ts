import { cloneDeep } from 'lodash-es'

// type FieldOptionTemp<T extends InternalRowData> = [string | FieldOption<T> | any, FieldOption<T> | unknown]

type FieldParams<T extends InternalRowData> = Parameters<
  (label: string | FieldOption<T>, option?: FieldOption<T>) => void
>
// | Parameters<(label: string) => void>
// | Parameters<(option: FieldOption<T>) => void>
// | Parameters<() => void>

const Field = <T extends InternalRowData>([arg1, arg2]: FieldParams<T> = ['']) => {
  let option = cloneDeep(arg2 || {}) as FieldOption<T>
  if (typeof arg1 === 'string') {
    option.label = arg1 as string
  } else if (arg1) {
    option = cloneDeep(arg1) as FieldOption<T>
  }

  const propertyDecorator: PropertyDecorator = (target, propertyKey) => {
    const constructor = target.constructor
    const key = propertyKey as string
    const { label = propertyKey } = option
    constructor['state']['keys'][key] = key
    constructor['state']['labels'][key] = label
    constructor['state']['fields'][key] = createColunm(key, option)
  }
  return propertyDecorator
}

Field.Hidden = () => {
  const propertyDecorator: PropertyDecorator = (target, propertyKey) => {
    target.constructor['state']['fields'][propertyKey].hidden = true
  }
  return propertyDecorator
}

export default Field

function createColunm<T extends InternalRowData>(key: string, option: FieldOption<T>): FieldOption<T> {
  const { label } = option
  return {
    key,
    title: label
  }
}
