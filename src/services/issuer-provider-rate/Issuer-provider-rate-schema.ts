import { i18n } from '@/locales'
import { z } from 'zod'

export const issuerProviderRateSchema = z
  .object({
    cashin_rate: z

      .number({ required_error: i18n.global.t('settings.validation.fees') })
      .min(0, { message: i18n.global.t('settings.validation.fees_min') }),
    cashout_rate: z
      .number({ required_error: i18n.global.t('settings.validation.unverified_daily') })
      .min(0, { message: i18n.global.t('settings.validation.limit_min') }),
    issuer_id: z.string({
      required_error: i18n.global.t('settings.validation.unverified_monthly'),
    }),
    provider_id: z
      .string({ required_error: i18n.global.t('settings.validation.verified_daily') })
      .min(0, { message: i18n.global.t('settings.validation.limit_min') }),
  })
  .partial()
