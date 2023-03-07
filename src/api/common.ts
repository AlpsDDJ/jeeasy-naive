import { httpGet, httpPost } from '@/utils/http'

export const login = (params) => {
  return httpPost<string>('/sys/sso/doLogin', params)
}

export const getLoginUser = () => {
  return httpGet('/sys/sso/userinfo')
}
