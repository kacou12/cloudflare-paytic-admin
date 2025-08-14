import { z } from 'zod'

export const ipSchema = z
  .object({
    ip: z.string().min(1).trim(),
    environment: z.string().min(1).trim(),
    merchant_id: z.number().min(1),
  })
  .partial()
