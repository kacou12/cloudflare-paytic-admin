// import { generateColor } from '@/lib/utils'
import { generateColor } from '@/lib/utils'
import { Authentication } from './auth-constants'

const acceessTokenName = 'payticAdminAccessToken'

export function getBearerToken(): string {
  return `Bearer ${getAccessToken()}`
}

export function getAccessToken(): string | null {
  return localStorage.getItem(acceessTokenName)
}

export function setAccessToken(accessToken: string): void {
  localStorage.setItem(acceessTokenName, accessToken)
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(Authentication.RefreshToken)
}

export function setRefreshToken(refreshToken: string): void {
  localStorage.setItem(Authentication.RefreshToken, refreshToken)
}

export function getExpiryIn(): string | null {
  return localStorage.getItem(Authentication.ExpiryIn)
}

export function setExpiryIn(expiryIn: string): void {
  localStorage.setItem(Authentication.ExpiryIn, expiryIn)
}

export function getDeviceId(): string | null {
  return localStorage.getItem(Authentication.DeviceId)
}

export function setDeviceId(deviceId: string) {
  localStorage.setItem(Authentication.DeviceId, deviceId)
}

export function saveToken(
  accessToken: string,
  // refreshToken: string,
  // expiryIn: string,
  // deviceId: string,
): void {
  setAccessToken(accessToken)
  // setExpiryIn(expiryIn)
  // setRefreshToken(refreshToken)
  // setDeviceId(deviceId)
}

export function destroySensitiveInfo(): void {
  localStorage.removeItem(acceessTokenName)
  localStorage.removeItem(Authentication.RefreshToken)
  localStorage.removeItem(Authentication.ExpiryIn)
}

export function setProviderColor(provider: string): void {
  const color = generateColor()
  localStorage.setItem(`${provider}`, generateColor())
}
export function setDefaultProviderColor(provider: string, hexaColor: string): void {
  localStorage.setItem(`${provider}`, hexaColor)
}

export function getProviderColor(provider: string): string | null {
  const color = localStorage.getItem(`${provider.toLowerCase()}`)
  return localStorage.getItem(`${provider.toLowerCase()}`)
}
