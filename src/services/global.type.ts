import type { TransactionStatusEnum, TransactionTypesEnum } from '@/constants/constant.enum'

export type DefaultFiltersPayload = {
  q?: string
  page: number
  limit?: number
  dates?: [Date, Date]
}

export type MerchantRequestFiltersPayload = DefaultFiltersPayload & {
  status?: string
  type?: string
  limit?: number
}
export type DefaultFiltersRequest = {
  q?: string
  page: number
  country_id?: string
  startDate: string
  endDate: string
}
export type UserFiltersPayload = DefaultFiltersPayload & {
  sort_by?: string
  sort_order?: string
  active?: boolean
}
export type WebhookFiltersPayload = DefaultFiltersPayload & {
  merchant_id?: number
  environment?: string
  size?: number
}
export type DashboardTransactionsStatsPayload = {
  dates?: [Date, Date]
  type?: TransactionTypesEnum // Ajout du champ type optionnel
  merchant_id?: string
}

export type TransactionFiltersPayload = DefaultFiltersPayload & {
  limit: number
  page?: number
  status?: string
  type?: string
  q?: string
  operator?: string
}
export type NotificationFiltersPayload = DefaultFiltersPayload & {
  countries?: string[]
}

export type DashboardFiltersPayload = {
  country_code?: string
  dates?: [Date, Date]
}
export type DashboardFiltersRequest = {
  startDate: string
  endDate: string
}

export type DocumentFile = {
  id: string
  x_id: string
  filepath: string
  public_id: string
  file_type: string
  description: string
  created_at: string
  updated_at: string
  account_verification_request_id: string
}

export type UserVerificationFiltersPayload = DefaultFiltersPayload & {
  typeDoc?: string
  country_id?: string
  status?: string
}
export type GiftCardFiltersPayload = DefaultFiltersPayload & {
  country_code?: string
  status?: string
}
export type GiftCardFiltersStatusPayload = DefaultFiltersPayload & {
  country_code?: string
  startDate: string
  endDate: string
}
export type GiftCardStatsFiltersPayload = {
  country_code?: string
  dates?: [Date, Date]
}

export type GiftCardFiltersRequest = GiftCardFiltersPayload & {
  startDate: string
  endDate: string
}

export type UserVerificationFiltersRequest = DefaultFiltersPayload & {
  typeDoc?: string
  country_id?: string
  status?: string
  startDate: string
  endDate: string
}
