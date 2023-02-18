export default () => {
  return <T extends Consturctor>(constructor: T) => {
    // console.log('model ---> ', 111)
    // const field = constructor.prototype.field
    // console.log(field)
    // const constructorTemp = constructor as BaseModel
    // const props = constructor.prototype
    // console.log('props = ', props)
    // const obj = new constructor()

    // constructor['field'] = {}
    // constructor['label'] = {}
    // Object.keys(obj).forEach((key) => {
    //   constructor['field'][key] = key
    //   constructor['label'][key] = key
    // })

    // constructorTemp['field'] = Object.keys(obj).map((item) => ({ [item]: item }))
    // constructorTemp['label'] = Object.keys(obj).map((item) => ({ [item]: item }))

    return constructor
  }
}
