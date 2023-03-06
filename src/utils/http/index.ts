import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { BASE_URL, TIME_OUT } from '@/utils/http/config'
import { setupRequest } from '@/utils/http/interceptors/request'
import { setupResponse } from '@/utils/http/interceptors/response'

const http: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

setupRequest(http)
setupResponse(http)

export default http
