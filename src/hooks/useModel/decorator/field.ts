type FieldOptionTemp = [(string | FieldOption)?, FieldOption?]

export default ([label, option = {}]: FieldOptionTemp = []) => {
  let optionTemp = { ...option }
  if (typeof label === 'string') {
    optionTemp.label = label as string
  } else {
    optionTemp = { ...label, ...option }
  }
  const propertyDecorator: PropertyDecorator = (target, propertyKey) => {
    const constructor = target.constructor
    !constructor['field'] && (constructor['field'] = {})
    !constructor['label'] && (constructor['label'] = {})
    const { label = propertyKey, field = propertyKey } = optionTemp
    constructor['field'][propertyKey] = field
    constructor['label'][propertyKey] = label
  }

  return propertyDecorator
}
