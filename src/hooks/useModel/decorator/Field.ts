// import { cloneDeep } from 'lodash-es'
// import { BaseModel } from '@/hooks/useModel'
// import { IFormDataType, IInputType } from '@/components/ext/types'
//
// // function fieldFn(): PropertyDecorator
// // function fieldFn(label: string): PropertyDecorator
// // function fieldFn<T extends InternalRowData>(option: Partial<FieldOption<T>>): PropertyDecorator
// // function fieldFn<T extends InternalRowData>(label: string, option: Partial<FieldOption<T>>): PropertyDecorator
// /**
//  * fieldFn函数用作定义PropertyDecorator类型的装饰器。
//  *
//  * @param label - 字符串类型，字段的标签。可选参数。
//  * @param option - Partial<FieldOption<T>>类型，字段的选项。可选参数。
//  * @returns 返回一个PropertyDecorator类型的函数，用于装饰对象的属性。
//  */
// /**
//  * 一个用于装饰器的函数，用于为模型字段定义元数据。
//  * @param label 可以是一个字符串，表示字段的标签名，或者是一个部分FieldOption<T>对象，提供字段配置。
//  * @param option 可选的，部分FieldOption<T>对象，用于进一步配置字段。
//  * @returns 返回一个属性装饰器，用于将字段的配置绑定到目标类的属性上。
//  */
// const Field: FieldDecoratorType = <T extends InternalRowData>(
//   label?: string | Partial<FieldOption<T>>,
//   option?: Partial<FieldOption<T>>
// ): PropertyDecorator => {
//   // 初始化一个临时的字段配置对象
//   let optionTemp: Partial<FieldOption<T>> = {}
//   // 克隆传入的option对象，确保不直接修改原对象
//   optionTemp = cloneDeep(option || {})
//   // 如果传入了booleanFlags，将其设置为true
//   if (option?.booleanFlags) {
//     option?.booleanFlags?.forEach((item: string): void => {
//       optionTemp[item] = true
//     })
//   }
//   // 处理label参数，如果是字符串，则设置为label属性；如果是对象，则直接覆盖optionTemp
//   if (typeof label === 'string') {
//     optionTemp.label = label as string
//   } else if (label) {
//     optionTemp = cloneDeep(label)
//   }
//
//   // 返回装饰器函数，将字段配置应用到目标类的属性上
//   return (target: Object, propertyKey: DataKey): void => {
//     // 获取目标对象的状态
//     const state: ModelState<T> = getState<T>(target)
//     // 根据配置创建字段定义
//     const colunm: FieldOption<T> = createColunm(propertyKey, optionTemp)
//     // 将字段定义设置到目标对象的状态中
//     setFieldProperty<T>(state, propertyKey, colunm)
//   }
// }
//
// /**
//  * 定义一个隐藏装饰器，用于标记对象属性是否隐藏以及如何处理隐藏状态。
//  *
//  * @param hiddenType 确定字段是否隐藏的标志，默认为 true 表示隐藏。它可以是一个布尔值或一个函数，函数接收当前字段值和整个对象值作为参数，返回一个布尔值决定是否隐藏。
//  * @param hiddenHandler 可选的属性处理函数，当字段被隐藏时调用。该函数接收当前字段值和整个对象值作为参数，无返回值。
//  * @returns 返回一个属性装饰器，用于将隐藏逻辑应用到目标对象的属性上。
//  */
// const Hidden: HiddenDecoratorType = (hiddenType: FieldHiddenType = true, hiddenHandler?: FieldAttrHandler): PropertyDecorator => {
//   return (target: Object, propertyKey: DataKey): void => {
//     // 获取目标对象的状态
//     const state = getState(target)
//     // 设置字段的隐藏属性，包括隐藏标志和处理函数
//     setFieldProperty(state, propertyKey, { hidden: hiddenType, hiddenHandler })
//   }
// }
//
// /**
//  * 定义一个只读字段属性的装饰器。
//  * 该装饰器用于标记类的属性为只读，并可以根据条件禁用该属性。
//  * @param disabledType 禁用类型的值，默认为true，表示始终禁用。也可以使用函数进行条件判断。
//  * @param disabledHandler 可选的属性，当字段被禁用时调用的处理函数。
//  * @returns 返回一个属性装饰器（PropertyDecorator），用于修饰类的属性。
//  */
// const Disabled: DisabledDecoratorType = (disabledType: FieldDisabledType = true, disabledHandler?: FieldAttrHandler): PropertyDecorator => {
//   // 装饰器函数，用于设置属性的只读和禁用状态。
//   return (target: Object, propertyKey: DataKey): void => {
//     // 获取目标对象的状态。
//     const state = getState(target)
//     // 设置字段属性，包括禁用状态和禁用处理函数。
//     setFieldProperty(state, propertyKey, { disabled: disabledType, disabledHandler: disabledHandler })
//   }
// }
//
// /**
//  * 定义一个字典装饰器，用于在类的属性上标注字典信息，以便于在前端界面进行数据展示时使用。
//  * @param dict 可选参数，指定字典的名称。
//  * @returns 返回一个属性装饰器函数。
//  */
// const Dict: DictDecoratorType = (dict?: string): PropertyDecorator => {
//   return (target: Object, propertyKey: DataKey): void => {
//     // 获取目标对象的状态
//     const state = getState(target)
//     // 定义字典渲染函数，该函数将根据行对象获取对应的字典值。
//     const dictRender = (row: any) => {
//       return row[`${propertyKey as string}_dict`]
//     }
//     // 设置字段属性，包括字典名称和渲染函数，以便在界面渲染时使用。
//     setFieldProperty(state, propertyKey, { dict: dict || (propertyKey as string), render: dictRender })
//   }
// }
//
// /**
//  * 设置字段的类型和输入类型
//  *
//  * @param dataType - 字段的数据类型，默认为字符串类型。可选类型由`FormDataType`枚举定义。
//  * @param inputType - 字段的输入类型，默认为文本输入类型。可选类型由`IInputType`接口定义。
//  * @returns 无返回值。此装饰器用于类的属性上，用于在运行时修改属性的元数据。
//  */
// const DataType: DataTypeDecoratorType = (dataType: IFormDataType = FormDataTypeEnum.STRING, inputType?: IInputType) => {
//   return (target: Object, propertyKey: DataKey): void => {
//     // 获取目标对象的状态
//     const state = getState(target)
//     let it: IInputType
//     // 根据dataType选择或定义默认的inputType
//     switch (dataType) {
//       case FormDataTypeEnum.NUMBER:
//         it = inputType || InputTypeEnum.INPUT_NUMBER
//         break
//       case FormDataTypeEnum.DATE:
//         it = inputType || InputTypeEnum.DATE
//         break
//       case FormDataTypeEnum.TIME:
//         it = inputType || InputTypeEnum.TIME
//         break
//       case FormDataTypeEnum.DATETIME:
//         it = inputType || InputTypeEnum.DATETIME
//         break
//       case FormDataTypeEnum.BOOLEAN:
//         it = inputType || InputTypeEnum.SWITCH
//         break
//       default:
//         it = inputType || InputTypeEnum.TEXT
//         break
//     }
//     // 设置字段的属性，包括数据类型和输入类型
//     setFieldProperty(state, propertyKey, { dataType: dataType, inputType: it })
//   }
// }
//
// /**
//  * 定义一个规则类型装饰器，用于为表单项设置规则。
//  * @param rule 可以是一个EFormItemRule对象或者一个EFormItemRule对象的数组，用来定义表单项的验证规则。
//  * @returns 返回一个函数，该函数接收两个参数：target和propertyKey。
//  *          target是被装饰的对象，propertyKey是对象中属性的键。
//  *          该函数会通过getState方法获取对象的状态，然后使用setFieldProperty方法为指定属性设置规则。
//  */
// const Rule: RuleTypeDecoratorType = (rule: EFormItemRule | Array<EFormItemRule>) => {
//   return (target: Object, propertyKey: DataKey): void => {
//     // 获取目标对象的状态
//     const state = getState(target)
//     // 为指定属性设置规则
//     setFieldProperty(state, propertyKey, { rule })
//   }
// }
//
// /**
//  * 创建一列的配置信息。
//  *
//  * @param key 数据键，用于标识列。类型为 `DataKey`，在函数内部被转换为字符串类型。
//  * @param optionTemp 列的部分字段选项，是一个泛型参数 `T` 的 `FieldOption` 的部分属性。
//  * @returns 返回一个完整的 `FieldOption<T>` 对象，包含传入的 `optionTemp` 属性、`key` 作为键名和 `optionTemp.label` 作为标题。
//  */
// function createColunm<T extends InternalRowData>(key: DataKey, optionTemp: Partial<FieldOption<T>>): FieldOption<T> {
//   // 使用展开运算符将 `optionTemp` 的属性与默认的 `key` 和 `title` 属性合并
//   return {
//     ...optionTemp,
//     key: key as string, // 显式类型转换，确保 `key` 被视为字符串
//     title: optionTemp.label // 使用 `optionTemp` 中的 `label` 作为列的标题
//   }
// }
//
// /**
//  * 获取指定对象的状态
//  * @param target 目标对象
//  * @returns 返回目标对象的状态
//  */
// function getState<T extends BaseModel>(target: Object): ModelState<T> {
//   const constructor = target.constructor
//   const state = Object.getOwnPropertyDescriptor(constructor, 'state')
//   if (state) {
//     return target.constructor['state']
//   } else {
//     const parentTarget = Object.getPrototypeOf(target.constructor)
//     target.constructor['state'] = cloneDeep(parentTarget['state'])
//     return target.constructor['state']
//   }
// }
//
// /**
//  * 设置指定属性
//  * @param state - 模型状态对象，存储了模型的当前状态信息
//  * @param key - 数据键值，用于标识要设置属性的特定数据字段
//  * @param property - 属性对象，包含要合并到指定字段的属性信息
//  * @returns 无返回值
//  *
//  * 该函数用于更新模型状态对象中指定字段的属性。
//  * 它首先检查指定键值的字段是否存在，如果不存在则创建一个空对象，
//  * 然后将传入的属性对象与该字段的当前属性合并。
//  */
// function setFieldProperty<T extends BaseModel>(state: ModelState<T>, key: DataKey, property: Partial<FieldOption<T>>): void {
//   const props = state['fields'][key] || {} // 获取当前字段的属性，如果不存在则默认为空对象
//   state['fields'][key] = { ...props, ...property } // 将传入的属性与当前属性合并并更新字段
// }
//
// export { Field, Hidden, Disabled, Dict, DataType, Rule }
