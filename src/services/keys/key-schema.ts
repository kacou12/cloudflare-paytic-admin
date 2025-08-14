import { env } from '@/config/env';
import { EnvironmentsEnum } from '@/constants/constant.enum'
import { z } from 'zod'

export const keySchema = z
  .object({
    name: z.string().min(1, "Le nom est requis"),
    // environment: z.string().min(1, "L'environnement est requis"),
   environment: z.nativeEnum(EnvironmentsEnum, {
        required_error: "L'environnement est requis",
    })
    // remark: z.string().min(1),
    // status: z.enum(['active', 'inactive']),
  })
