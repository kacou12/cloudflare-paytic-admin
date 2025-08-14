import { z } from 'zod'

import type { merchantSchema, merchantUpdateSchema } from './merchant-schema'
import type { OperatorsEnum } from '@/constants/constant.enum';

export type MerchantRequest = {
  first_name?: string
  last_name?: string
  address?: string
  business_name?: string
  business_type?: string
  email?: string
  phone?: string
  registration_no?: string
  rib:string
  tax_id?: string
  website?: string
}

export type MerchantUpdatePayload = z.infer<typeof merchantUpdateSchema>;

export type MerchantStatusPayload = {
  status: string
}

export interface MerchantPayinPayoutChargePayload {
  id: string
  payout_charge?: number
  payin_charge?: number 
}

export enum MerchantStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
}

export const MERCHANT_STATUS_OPTIONS = [
  { value: MerchantStatus.ACTIVE, label: 'Actif' },
  { value: MerchantStatus.INACTIVE, label: 'Inactif' },
  { value: MerchantStatus.PENDING, label: 'En attente' },
]

export interface MerchantStatsResponse {
  balance_cashout: number
  balance_wallet: number
  count_transaction_failed: number
  count_transaction_success: number
  volume_by_provider: VolumeByProvider[]
  volume_collected: number
  volume_transactions: number
  volume_transfered: number
}

export interface VolumeByProvider {
  total: number
  operator: OperatorsEnum
}

export interface MerchantStatsPayload { // Added this interface
  merchant_id?: string;
  dates?: [Date, Date];
}

export interface MerchantResponse {
  address: string
  balances: Balance[]
  first_name?: string 
  last_name?: string
  business_name: string
  business_type: string
  created_at: string
  email: string
  id: string
  is_verified: boolean
  keys: Key[]
  merchant_charges: MerchantCharge[]
  phone: string
  rib:string
  registration_no: string
  status: string
  tax_id: string
  updated_at: string
  users: User[]
  webhooks: Webhook[]
  website: string
  password?: string
}

export interface Balance {
  amount: number
  balance_histories: BalanceHistory[]
  created_at: string
  currency: string
  id: string
  merchant: string
  merchant_id: string
  type: string
  updated_at: string
}

export interface BalanceHistory {
  amount: number
  balance: string
  balance_id: string
  created_at: string
  id: string
  reason: string
  type: string
  updated_at: string
}

export interface Key {
  created_at: string
  environment: string
  id: string
  key: string
  status: string
  merchant: string
  merchant_id: string
  name: string
  updated_at: string
}

export interface MerchantCharge {
  created_at: string
  id: string
  merchant: string
  merchantID: string
  payin_charge: number
  payout_charge: number
  provider: Provider
  provider_id: string
  updated_at: string
}

export interface Provider {
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

export interface User {
  created_at: string
  email: string
  first_name: string
  id: string
  is_active: boolean
  is_verified: boolean
  last_login_at: string
  last_name: string
  merchant: string
  merchant_id: string
  phone: string
  role: string
  updated_at: string
}

export interface Webhook {
  created_at: string
  environment: string
  event: string
  id: string
  merchant: string
  merchant_id: string
  name: string
  secret: string
  updated_at: string
  url: string
}
