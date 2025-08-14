import { i18n } from '@/locales'
import { z } from 'zod'

export const providerSchema = z
  .object({
    name: z
      .string({ required_error: i18n.global.t('login.validation.username') })
      .min(1, { message: i18n.global.t('login.validation.username') })
      .trim(),
    country: z
      .string({ required_error: i18n.global.t('login.validation.username') })
      .min(1, { message: i18n.global.t('login.validation.username') })
      .trim(),
    method: z
      .string({ required_error: i18n.global.t('login.validation.username') })
      .min(1, { message: i18n.global.t('login.validation.username') })
      .trim(),
    currency: z
      .string({ required_error: i18n.global.t('login.validation.username') })
      .min(1, { message: i18n.global.t('login.validation.username') })
      .trim(),
    supplier: z
      .string({ required_error: i18n.global.t('login.validation.username') })
      .min(1, { message: i18n.global.t('login.validation.username') })
      .trim(),
    is_available: z.boolean({ required_error: i18n.global.t('login.validation.username') }),
    default_payin_charge: z.number({ required_error: i18n.global.t('login.validation.username') }),
    default_payout_charge: z.number({ required_error: i18n.global.t('login.validation.username') }),
  })
  .partial()
