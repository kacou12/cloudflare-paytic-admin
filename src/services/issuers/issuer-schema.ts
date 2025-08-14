import { i18n } from '@/locales'
import { z } from 'zod'

export const issuerSchema = z.object({
  name: z
    .string({ required_error: i18n.global.t('login.validation.username') })
    .min(1, { message: i18n.global.t('login.validation.username') })
    .trim(),
  // cashin_rate: z
  //   .number({ required_error: i18n.global.t('login.validation.username') })
  //   .min(0, { message: i18n.global.t('login.validation.username') }),
  // cashout_rate: z
  //   .number({ required_error: i18n.global.t('login.validation.username') })
  //   .min(0, { message: i18n.global.t('login.validation.username') }),
})
