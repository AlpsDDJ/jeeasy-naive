import http from '@/utils/http'

export const login = (params) => {
  return http.post('/sys/sso/doLogin', params)
}

export const getLoginUser = () => {
  return http.get('/sys/sso/userinfo')
}
