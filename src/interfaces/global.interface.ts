export interface Tab {
  id: string
  label: string
}

export interface BenefitTransactionType {
  id: string
}

// export enum BenefitTransactionType {
//   APP_MOBILE = 'payment',
//   SENDCHAP_BUSINESS = 'transfer',
//   MERCHANT_PAYMENT = 'purchase',
// }

// TRANSACTION
export const BenefitTransactionEnum = Object.freeze({
  APP_MOBILE: { name: 'App mobile' },
  SENDCHAP_BUSINESS: { name: 'Sendchap business' },
  MERCHANT_PAYMENT: { name: 'Paiement marchand' },
})
