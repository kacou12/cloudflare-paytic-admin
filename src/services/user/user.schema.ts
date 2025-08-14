import { i18n } from '@/locales'
import { z } from 'zod'

export const userSchema = z.object({
  first_name: z
    .string({ required_error: i18n.global.t('validation.required.first_name') })
    .min(1, { message: i18n.global.t('validation.required.first_name') })
    .trim(),
  last_name: z
    .string({ required_error: i18n.global.t('validation.required.last_name') })
    .min(1, { message: i18n.global.t('validation.required.last_name') })
    .trim(),
  email: z
    .string({ required_error: i18n.global.t('validation.required.email') })
    .email({ message: i18n.global.t('validation.invalid.email') })
    .trim(),
  phone: z
    .string({ required_error: i18n.global.t('validation.required.phone') })
    .min(1, { message: i18n.global.t('validation.required.phone') })
    .trim(),
})
