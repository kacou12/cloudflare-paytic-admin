import { type AxiosResponse, AxiosHeaders } from 'axios'

export const mockAxiosResponseFactory = <T = any>({
  data,
}: {
  data: T
}): Promise<AxiosResponse<SuccessResponse<T>>> => {
  const mockAxiosResponse: AxiosResponse<SuccessResponse<T>> = {
    data: {
      data: data,
      status: true,
      message: 'OK',
    },
    status: 200,
    statusText: 'OK',
    headers: { 'Content-Type': 'application/json' },
    config: {
      headers: new AxiosHeaders({ 'Content-Type': 'application/json' }), // Utilisation de AxiosHeaders
    },
  }
  return Promise.resolve(mockAxiosResponse)
}
