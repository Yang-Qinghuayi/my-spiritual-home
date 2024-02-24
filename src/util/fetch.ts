import type { Options } from './yofetch'
import yofetch from './yofetch'
// import.meta.env.YQ_Netease_API
const service = yofetch.create({
  baseURL:import.meta.env.VITE_NetEast_API,
  // baseURL: 'http://1.14.180.210:3000',
  credentials: 'include',
})

// direct return response data
export const request = <T>(url: string | Options, config?: Options) => {
  return service.request<T>(url, config, 'get').then((response) => {
    const { data, ok } = response
    const { code, status, body } = data as any
    // success code is 100 or 200
    if (ok && [100, 200].includes(code)) {
      return data
    } else if (status === 200) {
      return body as T
    } else {
      return Promise.reject(data)
    }
  })
}
export const requestPost = <T>(url: string | Options, body: any, config?: Options) => {
  return service.request<T>(url, config, 'post', body).then((response) => {
    const { data, ok } = response
    const { code } = data as any
    // success code is 100 or 200
    if (ok && [100, 200].includes(code)) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export default service
