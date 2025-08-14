import { z } from 'zod'

export const merchantRequestSchema = z.object({
  // address: z.string().min(1, "L'adresse est requise."),
  first_name: z.string().min(1, "Le nom de famille est requis."),
  last_name: z.string().min(1, "Le prenom est requis."),
  email: z.string().email("L'adresse e-mail n'est pas valide."),
  rib: z.string().min(1, "Le RIB est requis.").or(z.literal('')),
  phone: z
    .string({ required_error: 'Le numéro de téléphone est requis.' })
    .min(1, { message: 'Le numéro de téléphone est requis.' })
    .trim()
    .regex(/^(05|07|01)\d{8}$/, { message: 'Le numéro de téléphone doit commencer par 05, 07 ou 01 et contenir 10 chiffres.' }),
  business_name: z.string().min(1, 'Le nom commercial est requis.'),
  business_type: z.string().min(1, "Le type d'entreprise est requis."),
  registration_no: z
    .string()
    .min(1, "Le numéro d'enregistrement est requis.")
    .regex(
      /^CI-ABJ-\d{2}-\d{4}-[A-Z]\d{2}-\d{5}$/,
      "Le numéro d'enregistrement doit être au format CI-ABJ-XX-YYYY-ZXX-YYYYY (ex: CI-ABJ-03-2020-A10-00001).",
    ).or(z.literal('')),
  tax_id: z.string().min(1, "L'identifiant fiscal est requis.").or(z.literal('')),
  website:  
  z.string().url("L'URL du site web n'est pas valide.").optional().or(z.literal('')),
  // status: z.string(),
  // type: z.string(),
})

export const rejectMerchantRequestSchema = z.object({
  reason: z.string().min(1, 'Le motif du rejet est requis.'),
  status: z.string().min(1, 'Le statut du demande est requis.'),
}).partial()

export type RejectMerchantRequest = {
  reason?: string
  status?: string
}
