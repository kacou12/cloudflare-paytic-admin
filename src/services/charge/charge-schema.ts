import { z } from 'zod'

export const chargeSchema = z
  .object({
    provider_id: z.number().min(1),
    merchant_id: z.number().min(1),
    charge: z.number().min(0),
  })
  .partial()
