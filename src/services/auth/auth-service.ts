import router from '@/router'
import type { LoginForm, LoginRequest, RefreshTokenRequest } from '@/services/auth/auth-type'
import { destroySensitiveInfo, getDeviceId, getRefreshToken, saveToken } from './auth-util'
import { AppRoute } from '@/constants/app-route'
import { loginApi, logoutApi, refreshTokenApi } from './auth-api'
import type { AxiosError } from 'axios'
import { useToast } from 'vue-toastification'

export async function loginWithCredential({ email, password }: LoginForm) {
  const toast = useToast()
  try {
    const data: LoginRequest = {
      email: email.toLowerCase().trim(),
      password: password.trim(),
    }

    const res = await loginApi(data)
    const { token } = res.data?.data! ?? {}
    saveToken(token)

    return res.data
  } catch (error: any) {
    const localError = (error as AxiosError<ErrorResponse>)
     toast.error(localError.response?.data.message ?? 'Quelque chose s\'est mal passé')
  }
}

export async function refreshToken(): Promise<string | undefined> {
  try {
    // if (getRefreshToken() && getDeviceId()) {
    // const data: RefreshTokenRequest = {
    //   grantType: 'refresh_token',
    //   clientId: import.meta.env.CLIENT_ID ?? '',
    //   clientSecret: import.meta.env.CLIENT_SECRET ?? '',
    //   refreshToken: getRefreshToken() ?? '',
    // }

    const res = await refreshTokenApi()
    const accessToken = res.data
    saveToken(accessToken)
    // TODO: display dialog session expired
    return 'Successfully'
    // }

    // destroySensitiveInfo()
    // router.push({ name: AppRoute.LOGIN.name })
  } catch (error: any) {
    // TODO: display dialog session expired
    destroySensitiveInfo()
    router.push({ name: AppRoute.LOGIN.name })
  }
}

export async function logout() {
  try {
    const res = await logoutApi()
    destroySensitiveInfo()
  } catch (err) {
    destroySensitiveInfo()
  }
  // router.push({ name: AppRoute.LOGIN.name })
}
