import { z } from 'zod'

import type { chargeSchema } from './charge-schema'
import type { MerchantResponse } from '../merchants/merchant-type'
import type { ProviderResponse } from '../providers/provider-type'

export type ChargeForm = z.infer<typeof chargeSchema>

export type ChargeRequest = {
  provider_id: number
  merchant_id: number
  charge: number
}

export type ChargeResponse = {
  id: number
  x_id: string
  provider_id: number
  merchant_id: number
  merchant: MerchantResponse
  provider: ProviderResponse
  charge: number
  created_time: string
  updated_time: string | null
}

export type ChargeUpdatePayload = {
  charge?: number
  provider_id: number
  merchant_id: number
}
