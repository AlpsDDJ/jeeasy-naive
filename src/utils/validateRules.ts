import { FormItemRule } from 'naive-ui'

const passWordValidator = (str: string) => {
  const pattern = /^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*)(?=.*[`~!@#$%^&*()_\-+=<>.?:"{}/[\]';,\\|].*).{8,16}$/
  return pattern.test(str)
}

export const Rules = {
  required: [
    {
      required: true,
      message: '该字段不能为空',
      trigger: ['blur', 'change']
    }
  ],
  age: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('需要年龄')
        } else if (!/^\d*$/.test(value)) {
          return new Error('年龄应该为整数')
        } else if (Number(value) < 18) {
          return new Error('年龄应该超过十八岁')
        }
        return true
      },
      trigger: ['input', 'blur']
    }
  ],
  password: [
    {
      required: true,
      trigger: ['blur', 'input', 'change'],
      validator(rule: FormItemRule, value: string) {
        if (!passWordValidator(value)) {
          return new Error('请输入包含大写字母、小写字母、数字及特殊字符的8-16位密码')
        }
        return true
      }
    }
  ],
  phone: [
    {
      required: true,
      trigger: ['blur', 'input', 'change'],
      validator(rule: FormItemRule, value: string) {
        //正则校验手机号/^(?:(?:\+|00)86)?1\d{10}$/
        if (!/^(?:(?:\+|00)86)?1\d{10}$/.test(value)) {
          return new Error('手机号码格式不正确')
        }
        console.log('value', value)
        return true
      }
    }
  ],
  name: [
    {
      required: true,
      trigger: ['blur', 'input', 'change'],
      message: '请输入姓名'
    }
  ],
  companyConcatName: [
    {
      required: true,
      trigger: ['blur', 'input', 'change'],
      message: '请输入姓名'
    }
  ],
  username: [
    {
      required: true,
      trigger: ['blur', 'input', 'change'],
      validator(rule: FormItemRule, value: string) {
        console.log('valuemmmmmm', value)

        if (value && (value + '').length > 20) {
          return new Error('用户名长度不能超过20')
        } else if ((value && value.length === 0) || value === undefined || value === '') {
          console.log('valuevalue', value)
          return new Error('用户名不能为空')
        }
        return true
      }
    }
  ]
}

// export const getRules = (...keys: (keyof typeof Rules)[]): EFormItemRule[] => {
//   return keys.map((key) => Rules[key]) as EFormItemRule[]
// }
