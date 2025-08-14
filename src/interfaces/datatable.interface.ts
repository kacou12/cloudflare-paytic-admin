import { KeyStatusEnum, MerchantRequestStatusEnum, MerchantRequestTypeEnum, MerchantStatusEnum } from "@/constants/constant.enum"

export interface UserType {
  id: string
  nom: string
  prenom: string
  email: string
  typePieceIdentite: string
  statusVerification: string
  dateSoumission: string
}

export enum TransactionTypeEnum {
  transfert = "Transfert d'argent",
  default = 'default',
}
export enum AdministrationRoleEnum {
  SUPER_ADMIN = 'Super Administrateur',
  ADMIN = 'Administrateur',
  SERVICE_CLIENT = 'Service client',
}

// TRANSACTION
export const SamplingStatusEnum = Object.freeze({
  ATTEMPT: { name: 'En attente', color: '#CCCCCC' },
  SUCCESS: { name: 'Réussis', color: '#4CAF50' },
  FAILURE: { name: 'Echec', color: '#F44336 ' },
})

export const TransactionStatusEnum = Object.freeze({
  ATTEMPT: { name: 'En attente', color: '', textColor: '#fff' },
  SUCCESS: { name: 'Effectué', color: '#C8E6C9', textColor: '#388E3C' },
  FAILURE: { name: 'Echec', color: '#FFCDD2 ', textColor: '#D32F2F' },
})
export const RequestStatusEnum = Object.freeze({
   ATTEMPT: {
    name: 'En attente',
    color: '#FFF9C4', // Jaune pâle
    textColor: '#F57F17', // Orange foncé
    enumName: MerchantRequestStatusEnum.Pending
  },
  VALIDATED: {
    name: 'Validée',
    color: '#DCEDC8', // Vert pâle
    textColor: '#33691E', // Vert foncé
    enumName: MerchantRequestStatusEnum.Approved
  },
  FAILURE: {
    name: 'Refusée',
    color: '#FFCDD2', // Rouge pâle
    textColor: '#B71C1C', // Rouge foncé
    enumName: MerchantRequestStatusEnum.Rejected
  },
})
export const ClientStatusEnum = Object.freeze({
  ACTIF: { name: 'Actif', color: '#C8E6C9', textColor: '#388E3C' },
  SUSPENDU: { name: 'Suspendu', color: '#FFCDD2 ', textColor: '#D32F2F' },
})
export const KeyStatusDataEnum = Object.freeze({
  ACTIVE: { name: 'Actif', 
    color: '#C8E6C9', 
    textColor: '#388E3C',
    enumName: KeyStatusEnum.active
  },
  REVOKED: { 
    name: 'Revoqué', 
    color: '#FFCDD2 ', 
    textColor: '#D32F2F',
    enumName: KeyStatusEnum.revoked
  },
})

export const MerchantStatusDataEnum = Object.freeze({
  ACTIVE: { name: 'Actif', 
    color: '#C8E6C9', 
    textColor: '#388E3C',
    enumName: MerchantStatusEnum.active
  },
  INACTIVE: { 
    name: 'Bloqué', 
    color: '#FFCDD2 ', 
    textColor: '#D32F2F',
    enumName: MerchantStatusEnum.inactive
  },
})

export const RequestTypeEnum = Object.freeze({
  deposit: {
    name: 'Depot',
    color: '#E8F5E9', // Vert clair
    textColor: '#2E7D32', // Vert foncé
    enumName: MerchantRequestTypeEnum.Deposit
  },
  withdrawal: {
    name: 'Retrait',
    color: '#FCE4EC', // Rose clair
    textColor: '#C2185B', // Rose foncé
     enumName: MerchantRequestTypeEnum.Withdrawal
  }
})
export const TransactionNetworkEnum = Object.freeze({
  WAVE: { name: 'wave', path: 'wave.png' },
  ORANGE: { name: 'orange', path: 'orange.png' },
  MTN: { name: 'mtn', path: 'mtn.png' },
  MOOV: { name: 'moov', path: 'moov.png' },
})

export interface UserTransactionType {
  img: string
  name: string
  phone: string
}

export interface TransactionType {
  id: string
  user: UserTransactionType
  transaction: TransactionTypeEnum
  date: string
  debitNumber: string
  samplingStatus: string
  amount: string
  beneficiaryPhone: string
  transactionStatus: string
}
export interface CollectedOrTransferedType {
  type: string //collecte or transfert
  id: string
  amount: string
  client: string
  fees: string
  operator: string // Orange , Wave , MTN , Moov
  beneficiaryPhone: string
  reference: string
  status: string //ATTEMPT SUCCESS FAILURE
}
export interface WalletTransactionType {
  id: string
  date: string
  client: string
  amount: string
  type: string
  status: string //ATTEMPT SUCCESS FAILURE
}
export interface ClientsType {
  id: string
  name: string
  contact: string
  date: string
  status: string //actif, suspendu, test
}

export interface RequestsType {
  id: string
  type: string //RequestTypeEnum
  date: string
  client: string
  amount: string
  status: string //RequestStatusEnum
}
