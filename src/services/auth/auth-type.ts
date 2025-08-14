import { z } from 'zod'
import type { loginSchema } from './auth-schema'

export type LoginForm = z.infer<typeof loginSchema>

export type Authentication = {
  token: string
  token_type: string
  duration: string
  deviceId: string
}

export type LoginRequest = LoginForm & {}

export type LoginResponse = Authentication & {
  user: AuthResponse
}

export type RefreshTokenRequest = {
  grantType: 'refresh_token'
  clientId: string
  clientSecret: string
  refreshToken: string
}

export type RefreshTokenResponse = {
  accessToken: string
  refreshToken: string
  expiresAt: string
  deviceId: string
}

export type AuthResponse = {
 id: string
  created_at: string
  updated_at: string
  email: string
  first_name: string
  last_name: string
  phone: string
  role: string
  is_verified: boolean
  is_active: boolean
  last_login_at: string
  merchant_id: any
}
