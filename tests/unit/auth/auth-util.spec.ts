import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  getAccessToken,
  setAccessToken,
  destroySensitiveInfo,
  saveToken,
} from '../../../src/services/auth/auth-util'

const acceessTokenName = 'payticAdminAccessToken'

describe('auth-util', () => {
  // Nettoyer le localStorage avant chaque test
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('should set and get the access token', () => {
    const token = 'my-test-token'
    setAccessToken(token)
    expect(getAccessToken()).toBe(token)
  })

  it('should save the token using saveToken', () => {
    const token = 'another-test-token'
    saveToken(token)
    expect(localStorage.getItem(acceessTokenName)).toBe(token)
  })

  it('should remove sensitive info from localStorage', () => {
    setAccessToken('some-token')
    destroySensitiveInfo()
    expect(getAccessToken()).toBeNull()
  })
})