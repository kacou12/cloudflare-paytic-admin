import type { TransactionStatusEnum, TransactionTypesEnum } from '@/constants/constant.enum'
import type { MerchantStatus } from '../merchants/merchant-type'

type TransactionUpdatePayload = {
  amount?: number
  beneficiary_country_code?: string
  beneficiary_name?: string
  beneficiary_phone?: string
  beneficiary_provider_id?: string
  payer_country_code?: string
  payer_name?: string
  payer_pays_fees?: boolean
  payer_phone?: string
  payer_provider_id?: string
  type?: string
}

type TransactionStatutUpdatePayload = {
  status?: string
}

enum TransactionTypeEnum {
  TRENSFERT_ARGENT = 'trensfert_argent',
  ACHAT_CREDIT = 'achat_credit',
  GIFTCARD = 'giftcard',
  AWARD = 'award',
}
enum RelaunchTransactionStatusEnum {
  RETRYING = 'retrying',
  RETRY_SUCCESS = 'retry_success',
  RETRY_FAILED = 'retry_failed',
  MANUAL_REVIEW = 'manual_review',
}

//  enum TransactionStatusEnum {
//   PENDING = 'Pending',
//   PROCESSING = 'Processing',
//   SUCCESS = 'Successful',
//   FAILED = 'Failed',
// }
export const TransactionStatus = Object.freeze({
  PENDING: { value: 'pending', name: 'En attente', color: '#FFF9C4', textColor: '#F57F17' },
  PROCESSING: { value: 'processing', name: 'En cours', color: '#E1F5FE', textColor: '#0288D1' },
  SUCCESS: { value: 'success', name: 'Effectué', color: '#C8E6C9', textColor: '#388E3C' },
  FAILED: { value: 'failed', name: 'Échec', color: '#FFCDD2', textColor: '#D32F2F' },
  REFUNDED: { value: 'refunded', name: 'Remboursé', color: '#BBDEFB', textColor: '#1976D2' }, // Added Refunded
})

export const TransactionTypes = Object.freeze({
  PAYIN: { value: 'payin', name: 'Transfert', color: '#D4EEF4', textColor: '#00796B' }, // Example colors for Payin
  PAYOUT: { value: 'payout', name: 'Collecte', color: '#F8E0F3', textColor: '#C2185B' }, // Example colors for Payout
})

export interface TransactionResponse {
  amount: number
  created_at: string
  currency: string
  custom_id: string
  description: string
  environment: string
  used_issuer: issuer
  used_isser_id: string
  failed_reason: FailedReason
  failed_reason_id: string
  fee: Fee
  fee_id: string
  id: string
  merchant?: Merchant
  msisdn: string
  merchant_id: string
  provider: string
  reference: string
  status: TransactionStatusEnum
  type: TransactionTypesEnum
  updated_at: string
}

interface issuer {
  created_at: string
  id: string
  name: string
  updated_at: string
}

export interface DashboardStatsResponse {
  all_txns_amount: number
  collected_txns_amount: number
  transfered_txns_amount: number
}

export interface TransactionStatsResponse {
  count_txns_failed: number
  count_txns_success: number
  sum_txns: number
  sum_txns_amount_group_by_provider: SumTxnsAmountGroupByProvider[]
}

export interface SumTxnsAmountGroupByProvider {
  operator: string
  total: number
}

interface FailedReason {
  code: string
  created_at: string
  id: string
  reason: string
  updated_at: string
}

interface Fee {
  amount: number
  created_at: string
  currency: string
  id: string
  percentage: number
  rate: number
  type: string
  updated_at: string
}

interface Merchant {
  address: string
  business_name: string
  business_type: string
  email: string
  registration_no: string
  balance: Balance[]
  created_at: string
  id: string
  is_verified: boolean
  key: Key[]
  merchant_charge: MerchantCharge[]
  phone: string
  status: MerchantStatus
  tax_id: string
  updated_at: string
  user: User[]
  webhook: Webhook[]
  website: string
}

interface Balance {
  amount: number
  balance_histories: BalanceHistory[]
  created_at: string
  currency: string
  id: string
  merchant: Merchant2
  merchant_id: string
  type: string
  updated_at: string
}

interface BalanceHistory {
  amount: number
  balance: Balance2
  balance_id: string
  created_at: string
  id: string
  reason: string
  type: string
  updated_at: string
}

interface Balance2 {
  value: string
}

interface Merchant2 {
  value: string
}

interface Key {
  created_at: string
  environment: string
  id: string
  key: string
  merchant: Merchant3
  merchant_id: string
  updated_at: string
}

interface Merchant3 {
  value: string
}

interface MerchantCharge {
  created_at: string
  id: string
  merchant: Merchant4
  merchantID: string
  payin_charge: number
  payout_charge: number
  provider: Provider
  provider_id: string
  updated_at: string
}

interface Merchant4 {
  value: string
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
  merchant: Merchant5
  merchant_id: string
  secret: string
  updated_at: string
  url: string
}

interface Merchant5 {
  value: string
}
