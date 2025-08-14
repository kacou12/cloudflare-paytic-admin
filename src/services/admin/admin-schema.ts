import { i18n } from '@/locales'
import { z } from 'zod'

export const adminSchema = z.object({
  email: z
    .string({ required_error: i18n.global.t('login.validation.username') })
    .email({ message: i18n.global.t('login.validation.email') })
    .min(1, { message: i18n.global.t('login.validation.username') })
    .trim(),
  firstName: z
    .string({ required_error: i18n.global.t('login.validation.password') })
    .min(1, { message: i18n.global.t('login.validation.password') })
    .trim(),
  lastName: z
    .string({ required_error: i18n.global.t('login.validation.password') })
    .min(1, { message: i18n.global.t('login.validation.password') })
    .trim(),
  phoneNumber: z
    .string({ required_error: i18n.global.t('login.validation.password') })
    .min(1, { message: i18n.global.t('login.validation.password') })
    .trim(),
  role: z.string({ required_error: i18n.global.t('login.validation.password') }),
  // isActive: z.boolean({ required_error: i18n.global.t('login.validation.password') }),
})
