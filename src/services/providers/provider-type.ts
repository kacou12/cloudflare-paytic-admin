import { z } from 'zod'

import type { providerSchema } from './provider-schema'

export type ProviderForm = z.infer<typeof providerSchema>

export type ProviderRequest = ProviderForm & {}
export enum SupplierEnum {
  HUB2 = 'hub2',
  BIZAO = 'bizao',
  TOUCH_PAY = 'touch_pay',
  WAVE = 'wave',
  MTN = 'mtn',
}

export type ProviderResponse = {
  cashin_issuer_used: string[]
  cashout_issuer_used: string[]
  country_iso_code: string
  created_at: string
  currency: string
  id: string
  image_url: string
  method: string
  operator: string
  updated_at: string
}

export type ProviderUpdatePayload = {
  operator?: string
  country?: string
  method?: string
  currency?: string
  is_available?: boolean
  supplier?: string // SupplierEnum
  cashin_issuer_used?: string[]
  cashout_issuer_used?: string[]
}


export type ProviderServiceAvailabilityPayload = {
  cashin_enabled: boolean
  cashin_issuer: string
  cashout_enabled: boolean
  cashout_issuer: string
  id: string
}

export type ServiceAvailabilityResponse = {
  cashin_enabled: boolean
  cashin_issuer: CashinIssuer
  cashin_issuer_id: string
  cashout_enabled: boolean
  cashout_issuer: CashoutIssuer
  cashout_issuer_id: string
  created_at: string
  id: string
  provider: Provider3
  provider_id: string
  updated_at: string
}

type CashinIssuer = {
  created_at: string
  id: string
  issuer_provider_rates: IssuerProviderRate[]
  name: string
  updated_at: string
}

type IssuerProviderRate = {
  cashin_rate: number
  cashout_rate: number
  created_at: string
  id: string
  issuer: string
  issuer_id: string
  provider: Provider
  provider_id: string
  updated_at: string
}

type Provider = {
  cashin_issuer_used: string[]
  cashout_issuer_used: string[]
  country_iso_code: string
  created_at: string
  currency: string
  // default_payin_rate: number
  // default_payout_rate: number
  id: string
  image_url: string
  method: string
  operator: string
  updated_at: string
}

type CashoutIssuer =  {
  created_at: string
  id: string
  issuer_provider_rates: IssuerProviderRate2[]
  name: string
  updated_at: string
}

type IssuerProviderRate2 =  {
  cashin_rate: number
  cashout_rate: number
  created_at: string
  id: string
  issuer: string
  issuer_id: string
  provider: Provider2
  provider_id: string
  updated_at: string
}

type Provider2 ={
  cashin_issuer_used: string[]
  cashout_issuer_used: string[]
  country_iso_code: string
  created_at: string
  currency: string
  // default_payin_rate: number
  // default_payout_rate: number
  id: string
  image_url: string
  method: string
  operator: string
  updated_at: string
}

type Provider3 = {
  cashin_issuer_used: string[]
  cashout_issuer_used: string[]
  country_iso_code: string
  created_at: string
  currency: string
  default_payin_rate: number
  default_payout_rate: number
  id: string
  image_url: string
  method: string
  operator: string
  updated_at: string
}
