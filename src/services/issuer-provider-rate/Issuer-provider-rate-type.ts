import { z } from 'zod'
import type { issuerProviderRateSchema } from './Issuer-provider-rate-schema'

export type IssuerProviderRateForm = z.infer<typeof issuerProviderRateSchema>

export type IssuerProviderRateRequest = IssuerProviderRateForm

export type IssuerProviderRateResponse = {
  cashin_rate: number
  cashout_rate: number
  id: string
  issuer: Issuer
  issuer_id: string
  provider: Provider
  provider_id: string
}

export type GroupedIssuerRates = {
  id: string
  issuer: Issuer // Utilise ton interface Issuer ici
  issuer_id: string
  providers: {
    provider: Provider // Utilise ton interface Provider ici
    provider_id: string
    cashin_rate: number
    cashout_rate: number
    id_line_to_update:string
  }[]
}

export type IssuerProviderRateUpdatePayload = {
  cashin_rate: number
  cashout_rate: number

  issuer_id: string
  provider_id: string
}
export type UpdateIssuerProviderRateUpdatePayload = {
  cashin_rate: number
  cashout_rate: number
  id: string

}

export interface Issuer {
  id: string
  issuer_provider_rates: string[]
  name: string
  x_id: string
}

export interface Provider {

  country_id: string
  created_at: string
  id: string
  image_url: string
  operator: string
  service_availability: ServiceAvailability
  updated_at: string
  validate_with_otp: boolean
  x_id: string
}

interface ServiceAvailability {
  cashin_enabled: boolean
  cashin_issuer: CashinIssuer
  cashin_issuer_id: string
  cashout_enabled: boolean
  cashout_issuer: CashoutIssuer
  cashout_issuer_id: string
  created_at: string
  id: string
  must_pay_fees: boolean
  provider: string
  provider_id: string
  updated_at: string
  x_id: string
}

interface CashinIssuer {
  id: string
  issuer_provider_rates: string[]
  name: string
  x_id: string
}

interface CashoutIssuer {
  id: string
  issuer_provider_rates: string[]
  name: string
  x_id: string
}
