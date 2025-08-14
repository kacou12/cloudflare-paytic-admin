import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../../../src/stores/useAuthStore'
import type { AuthResponse } from '../../../src/services/auth/auth-type'


describe('useAuthStore', () => {
  // Crée une nouvelle instance de Pinia avant chaque test
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initial state is null', () => {
    const store = useAuthStore()
    expect(store.user).toBeNull()
  })

  it('setUser updates the user state', () => {
    const store = useAuthStore()
    const mockUser: AuthResponse = {
      id: '1',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      role: 'admin',
      created_at: '2022-01-01',
      updated_at: '2022-01-01',
      is_verified: true,
      is_active: true,
      last_login_at: '2022-01-01',
      merchant_id: null 
    }
    store.setUser(mockUser)
    expect(store.user).toEqual(mockUser)
    expect(store.fullName()).toBe('John Doe')
  })

  it('logout resets the user state to null', () => {
    const store = useAuthStore()
    store.setUser({} as AuthResponse) // Simule un utilisateur connecté
    store.logout()
    expect(store.user).toBeNull()
  })
})