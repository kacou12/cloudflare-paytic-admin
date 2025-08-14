import { z } from 'zod'
import type { ipSchema } from './ip-schema'

export type IpForm = z.infer<typeof ipSchema>

export type IpRequest = IpForm & {}

export type IpResponse = {
  x_id: string
  id: string
  ip: string
  // environment: 'live' | 'sandbox'
  environment: string
  merchant_id: number
}

export type IpUpdatePayload = {
  ip: string
  environment: string
  // merchant_id?: number
}
