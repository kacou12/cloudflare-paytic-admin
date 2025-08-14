import { describe, it, expect, vi, beforeEach } from 'vitest'
import { loginWithCredential, logout } from '../../../src/services/auth/auth-service'
import * as AuthApi from '../../../src/services/auth/auth-api'
import * as AuthUtil from '../../../src/services/auth/auth-util'
import { useToast } from 'vue-toastification'

// Mock des modules externes
vi.mock('./auth-api')
vi.mock('./auth-util')
vi.mock('vue-toastification', () => ({
  useToast: vi.fn(() => ({
    error: vi.fn(),
    success: vi.fn(),
  })),
}))
vi.mock('@/router', () => ({
  default: {
    push: vi.fn(),
  },
}))

describe('auth-service', () => {
  beforeEach(() => {
    // Réinitialise les mocks avant chaque test
    vi.clearAllMocks()
  })

  it('should call loginApi and saveToken on successful login', async () => {
    const mockLoginData = { email: 'test@example.com', password: 'password123' }
    const mockResponse = {
      data: {
        data: {
          token: 'fake-jwt-token',
          user: { id: '1', name: 'Test User' },
        },
      },
    }

    // Simule le retour de loginApi
    const loginApiSpy = vi.spyOn(AuthApi, 'loginApi').mockResolvedValue(mockResponse as any)
    const saveTokenSpy = vi.spyOn(AuthUtil, 'saveToken')

    const result = await loginWithCredential(mockLoginData)

    expect(loginApiSpy).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' })
    expect(saveTokenSpy).toHaveBeenCalledWith('fake-jwt-token')
    expect(result).toEqual(mockResponse.data)
  })

  it('should handle login failure and show an error toast', async () => {
    const mockLoginData = { email: 'wrong@example.com', password: 'wrong' }
    const mockError = { response: { data: { message: 'Invalid credentials' } } }

    // Simule une erreur de loginApi
    vi.spyOn(AuthApi, 'loginApi').mockRejectedValue(mockError)
    const saveTokenSpy = vi.spyOn(AuthUtil, 'saveToken')
    const toast = useToast()

    await loginWithCredential(mockLoginData)

    expect(saveTokenSpy).not.toHaveBeenCalled()
    expect(toast.error).toHaveBeenCalledWith('Invalid credentials')
  })

  it('should call logoutApi and destroySensitiveInfo on logout', async () => {
    const logoutApiSpy = vi.spyOn(AuthApi, 'logoutApi').mockResolvedValue({})
    const destroySensitiveInfoSpy = vi.spyOn(AuthUtil, 'destroySensitiveInfo')

    await logout()

    expect(logoutApiSpy).toHaveBeenCalled()
    expect(destroySensitiveInfoSpy).toHaveBeenCalled()
  })
})