import { z } from 'zod';

export const merchantSchema = z
  .object({
    // Existing fields, updated to match new requirements
    first_name: z.string().min(1, "Le nom de famille est requis."),
    last_name: z.string().min(1, "Le prenom est requis."),
    address: z.string().min(1, "L'adresse est requise.").or(z.literal('')),
    email: z.string().email("L'adresse e-mail n'est pas valide."),
    rib: z.string().min(1, "Le RIB est requis.").or(z.literal('')),
    phone: z
    .string({ required_error: 'Le numéro de téléphone est requis.' })
    .min(1, { message: 'Le numéro de téléphone est requis.' })
    .trim()
    .regex(/^(05|07|01)\d{8}$/, { message: 'Le numéro de téléphone doit commencer par 05, 07 ou 01 et contenir 10 chiffres.' }),


    // New fields
    business_name: z.string().min(1, "Le nom commercial est requis."),
    business_type: z.string().min(1, "Le type d'entreprise est requis."),
    // Updated: Added regex validation for registration_no to enforce specific format and length
   registration_no: z.string().min(1, "Le numéro d'enregistrement est requis.")
      .regex(/^[A-Z]{2}-[A-Z]{3}-\d{2}-\d{4}-[A-Z0-9]{3}-\d{5}-[A-Z]\d+$/, "Le numéro d'enregistrement doit être au format suivant: Code Pays (2 lettres)-Code Ville (3 lettres)-Code Juridiction (2 chiffres)-Année (4 chiffres)-Identification de la Formalité (3 alphanumériques)-Numéro de Formalité (5 chiffres)-Lettre-Clé (1 lettre)-Signes Numériques (1 ou plusieurs chiffres)."),
    tax_id: z.string().min(1, "L'identifiant fiscal est requis.").or(z.literal('')),
    website: z.string().url("L'URL du site web n'est pas valide.").or(z.literal('')),// Optional field
  }); // Keep .partial() if all fields should remain optional for updates, otherwise remove it.


export const payinChargeSchema = z.object({
  payin_charge: z.number().min(0, "La charge d'entrée doit être un nombre positif ou nul."),
});

export const payoutChargeSchema = z.object({
  payout_charge: z.number().min(0, "La charge d'entrée doit être un nombre positif ou nul."),
});

export const merchantUpdateSchema = merchantSchema.partial();