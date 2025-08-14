import type { z } from 'zod'
import type { webhookSchema } from './webhook-schema'
import type { WebhookEnum } from '@/constants/constant.enum';

export type WebhookRequest = z.infer<typeof webhookSchema>
export type WebhookResponse = WebhookRequest & { id: string; x_id: string; secret: string } // Assuming the response includes an ID

export type WebhookPayload = {
  environment?: string
  events: WebhookEnum[]
  merchant_id?: string
  url?: string,
  name?: string
}