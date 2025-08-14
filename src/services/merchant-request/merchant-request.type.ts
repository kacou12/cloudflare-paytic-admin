export interface MerchantRequestResponse {
  amount: number
  created_at: string
  currency: string
  file_url: string
  id: string
  merchant: Merchant
  merchant_id: string
  reason: string
  status: string
  type: string
  updated_at: string
}

interface Merchant {
  address: string
  balances: Balance[]
  business_name: string
  business_type: string
  created_at: string
  email: string
  id: string
  is_verified: boolean
  keys: Key[]
  merchant_charges: MerchantCharge[]
  phone: string
  registration_no: string
  status: string
  tax_id: string
  updated_at: string
  users: User[]
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
  reason: string
  type: string
  updated_at: string
}

interface Key {
  created_at: string
  environment: string
  id: string
  key: string
  merchant: string
  merchant_id: string
  name: string
  updated_at: string
}

interface MerchantCharge {
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

interface User {
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

interface Webhook {
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
