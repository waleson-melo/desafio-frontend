interface AxiosConfig {
  axiosInstance: any
  method: string
  url: string
  otherConfigs: any
}

export default async function useAxios(configRequest: AxiosConfig) {
  const { axiosInstance, method, url, otherConfigs } = configRequest
  let response: any = null

  try {
    response = await axiosInstance[method.toLowerCase()](url, {
      ...otherConfigs,
    })
  } catch (err: any) {
    if (err.response) {
      throw err.response
    } else {
      throw err
    }
  }

  return response
}
