import { z } from 'zod'

import type { issuerSchema } from './issuer-schema'

export type IssuerForm = z.infer<typeof issuerSchema>

export type IssuerRequest = IssuerForm & {
  // country_id: string
}

export type IssuerResponse = {
  id: string
  issuer_provider_rates: IssuerProviderRate[]
  name: string
  x_id: string
}

export type IssuerUpdatePayload = {
  cashin_rate?: number
  cashout_rate?: number

  name?: string
}

export interface IssuerProviderRate {
  cashin_rate: number
  cashout_rate: number
  id: string
  issuer: string
  issuer_id: string
  provider: Provider
  provider_id: string
}

interface Provider {

  country_id: string
  created_at: string
  id: string
  image_url: string
  name: string
  service_availability: ServiceAvailability
  updated_at: string
  validate_with_otp: boolean
  x_id: string
}

interface ServiceAvailability {
  cashin_enabled: boolean
  cashin_issuer: string
  cashin_issuer_id: string
  cashout_enabled: boolean
  cashout_issuer: string
  cashout_issuer_id: string
  created_at: string
  id: string
  must_pay_fees: boolean
  provider: string
  provider_id: string
  updated_at: string
  x_id: string
}
