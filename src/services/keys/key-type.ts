import { z } from 'zod'

import type { keySchema } from './key-schema'
import type { MerchantResponse } from '../merchants/merchant-type'

export type KeyForm = z.infer<typeof keySchema>

export type KeyRequest = {
  merchant_id?: string
  environment?: string
  name: string
  // remark?: string
  // status?: 0 | 1
}

export type KeyResponse = {
  id: string
  merchant_id: number
  merchant: MerchantResponse
  environment: 'live' | 'sandbox'
  remark: string
  // KeyStatusEnum
  status: string
  key_value: string
  created_time: string
  updated_time: string | null
}

export type KeyUpdatePayload = {
  // merchant_id?: number
  // environment?: 'live' | 'sandbox'
  // remark?: string
  status?: string
}
