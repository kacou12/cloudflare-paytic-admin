import { z } from 'zod'
import type { adminSchema } from './admin-schema'
import type { AdminRole } from './admin-constants'

export type AdminForm = z.infer<typeof adminSchema>

export type AdminRequest = AdminForm & {
  profilePhoto: string

  // grantType: 'password'
  // clientId: string
  // clientSecret: string
  // encryptedAesKey: string
}

export type AdminResponse = {
  id: string
  // Photo de profil (généralement stockée comme URL ou File)
  profilePhoto: string | File

  // Nom (prénom et nom de famille)
  firstName: string
  lastName: string

  // Adresse électronique
  email: string

  // Rôle (probablement une énumération ou une chaîne)
  role: AdminRole | string

  // Authentification (numéro de téléphone avec préfixe international)
  phoneNumber: string

  isActive: boolean
}

export type AdminFiltersPayload = {
  searchText: string
  page: number
  country?: string
}
export type AdminUpdatePayload = {
  // id: string
  // Photo de profil (généralement stockée comme URL ou File)
  profilePhoto?: string | File

  // Nom (prénom et nom de famille)
  firstName?: string

  lastName?: string

  // Adresse électronique
  email?: string

  // Rôle (probablement une énumération ou une chaîne)
  role?: AdminRole | string

  // Authentification (numéro de téléphone avec préfixe international)
  phoneNumber?: string

  isActive?: boolean
}
