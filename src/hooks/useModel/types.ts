import { FieldOption } from 'easy-descriptor'
import { TableColumn, TableExpandColumn, TableSelectionColumn } from 'naive-ui/es/data-table/src/interface'
import {
  FormItemGiProps,
  InputProps,
  CheckboxProps,
  RadioProps,
  CascaderProps,
  DatePickerProps,
  TimePickerProps,
  UploadProps,
  InputNumberProps,
  SliderProps,
  RateProps,
  SwitchProps,
  SelectProps,
  TreeSelectProps,
  InputGroupProps
} from 'naive-ui'

interface FormItemProps extends FormItemGiProps {}

type NaiveInputProps =
  | InputProps
  | CheckboxProps
  | RadioProps
  | CascaderProps
  | DatePickerProps
  | TimePickerProps
  | UploadProps
  | InputNumberProps
  | SliderProps
  | RateProps
  | SwitchProps
  | SelectProps
  | TreeSelectProps
  | InputGroupProps

type FormCompProps = NaiveInputProps & Record<string, any>

export type EzFieldOption = FieldOption &
  Omit<TableColumn, 'key' | 'type'> & {
    path?: string
    key?: DataKey
    type?: TableSelectionColumn['type'] | TableExpandColumn['type'] | 'index' | never
    formItemProps?: FormItemProps
    formCompProps?: FormCompProps
  }
