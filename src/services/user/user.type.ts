import { z } from 'zod'
import type { userSchema } from './user.schema'

export type UserForm = z.infer<typeof userSchema>

export type UserRequest = UserForm & {
  merchant_id: string
  role: string
}

export interface UserResponse {
  created_at: string
  email: string
  first_name: string
  id: string
  is_active: boolean
  is_verified: boolean
  last_login_at: string
  last_name: string
  merchant: Merchant
  merchant_id: string
  phone: string
  role: string
  updated_at: string
}

export type UserUpdatePayload = {
  first_name?: string
  last_name?: string
  email?: string
  phone?: string
  is_active?: boolean
  is_verified?: boolean
  role?: string
  merchant_id?: string
}

interface Merchant {
  address: string
  balances: Balance[]
  business_name: string
  business_type: string
  created_at: string
  deletedAt: DeletedAt
  email: string
  id: string
  is_verified: boolean
  keys: Key[]
  merchant_charges: MerchantCharge[]
  merchant_custom_id: string
  phone: string
  registration_no: string
  rib: string
  status: string
  tax_id: string
  updated_at: string
  users: string[]
  webhooks: Webhook[]
  website: string
}

interface Balance {
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

interface BalanceHistory {
  amount: number
  balance: string
  balance_id: string
  created_at: string
  id: string
  type: string
  updated_at: string
}

interface DeletedAt {
  time: string
  valid: boolean
}

interface Key {
  created_at: string
  environment: string
  id: string
  key: string
  merchant: string
  merchant_id: string
  name: string
  public_id: string
  status: string
  updated_at: string
}

interface MerchantCharge {
  created_at: string
  id: string
  merchant: string
  merchant_id: string
  payin_charge: number
  payout_charge: number
  provider: Provider
  provider_id: string
  updated_at: string
}

interface Provider {
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

interface Webhook {
  created_at: string
  environment: string
  events: string[]
  id: string
  merchant: string
  merchant_id: string
  name: string
  secret: string
  updated_at: string
  url: string
}
