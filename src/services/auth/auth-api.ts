// import { env } from '@/config/env'
import axios from '@/config/axios'
import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from './auth-type'
import { getBearerToken, getDeviceId } from './auth-util'
import { AuthRouteApi } from './auth-constants'

export async function loginApi(data: LoginRequest) {
  // if (import.meta.env.VITE_MOCK_API == 'true') {
  // TODO: remove this once you have auth
  //   return { data: mockReponse.login } as any
  // }

  return await axios.post<SuccessResponse<LoginResponse>>(
    AuthRouteApi.login,
    data,
    //  {
    // headers: {
    //   'Device-Id': getDeviceId(),
    //   'Access-Control-Allow-Origin': '*',
    // },
    // }
  )
}

export async function refreshTokenApi() {
  // return await axios.post<SuccessResponse<RefreshTokenResponse>>('/admin/api/v1/auth/refresh-token')
  return await axios.post<string>(AuthRouteApi.refreshToken)
}

export async function logoutApi() {
  return await axios.post(
    AuthRouteApi.logout,
    // {
    //   accessToken: getAccessToken(),
    // },
    {
      headers: {
        // 'Device-Id': getDeviceId(),
        Authorization: getBearerToken(),
      },
    },
  )
}
