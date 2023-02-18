declare global {
  type Consturctor = { new (...args: any[]): {} }
  type BaseModelConstructor<T> = IBaseModel & { new (...args: any[]): T }

  interface IBaseModel extends Record<string, any> {
    id?: string
  }

  type ModelLabel<T extends IBaseModel> = { [key in keyof Required<T>]: string } | Record<string, string>
  type ModelField<T extends IBaseModel> = { [key in keyof Required<T>]: string } | Record<string, string>

  type ModelState<T extends IBaseModel> = {
    field: ModelField<T>
    label: ModelLabel<T>
  }

  type FieldOption = {
    label?: string
    field?: string
  }
}

export default {}
