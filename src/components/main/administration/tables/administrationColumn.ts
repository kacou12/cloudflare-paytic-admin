import type { ColumnDef } from '@tanstack/vue-table'

import {
  AdministrationRoleEnum,
  // type AdministrationType,
  type UserTransactionType,
} from '@/interfaces/datatable.interface'
import { h } from 'vue'
import AdministrationActionsBloc from './administrationActionsBloc.vue'
import AdministrationUserBloc from './administrationUserBloc.vue'
import type { AdminResponse } from '@/services/admin/admin-type'
// import TransactionUserBloc from './transactionUserBloc.vue'
// import TransactionPaymentBloc from './transactionPaymentBloc.vue'

const formatRelativeDate = (date: Date): string => {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
  const inputDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())

  // Formater l'heure
  const timeFormatter = new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Utiliser le format 24h
  })

  const timeString = `à ${timeFormatter.format(date)}`

  // Comparer les dates
  if (inputDate.getTime() === today.getTime()) {
    return `Aujourd’hui ${timeString}`
  } else if (inputDate.getTime() === yesterday.getTime()) {
    return `Hier ${timeString}`
  } else {
    // Formater la date pour les autres cas
    const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    return `${dateFormatter.format(date)} ${timeString}`
  }
}

const formatPhoneNumber = (phone: string): string => `+225 ${phone}`

// export const administrationData: AdministrationType[] = [
//   {
//     id: '1',
//     user: { img: 'https://via.placeholder.com/150', name: 'Alice Dupont', phone: '612345678' },
//     role: AdministrationRoleEnum.SUPER_ADMIN,
//   },
//   {
//     id: '2',
//     user: { img: 'https://via.placeholder.com/150', name: 'Bob Martin', phone: '698765000' },
//     role: AdministrationRoleEnum.SUPER_ADMIN,
//   },
//   {
//     id: '3',
//     user: {
//       img: 'https://via.placeholder.com/150',
//       name: 'Charlie Bernard',
//       phone: '655667788',
//     },
//     role: AdministrationRoleEnum.SERVICE_CLIENT,
//   },
//   {
//     id: '4',
//     user: { img: 'https://via.placeholder.com/150', name: 'Diane Leroy', phone: '611224455' },
//     role: AdministrationRoleEnum.SUPER_ADMIN,
//   },
//   {
//     id: '5',
//     user: { img: 'https://via.placeholder.com/150', name: 'Ethan Morel', phone: '699887722' },
//     role: AdministrationRoleEnum.ADMIN,
//   },
//   {
//     id: '6',
//     user: { img: 'https://via.placeholder.com/150', name: 'Fiona Dubois', phone: '677665544' },
//     role: AdministrationRoleEnum.ADMIN,
//   },
//   {
//     id: '7',
//     user: { img: 'https://via.placeholder.com/150', name: 'Gaspard Noël', phone: '644332211' },
//     role: AdministrationRoleEnum.ADMIN,
//   },
//   {
//     id: '8',
//     user: {
//       img: 'https://via.placeholder.com/150',
//       name: 'Hélène Fontaine',
//       phone: '699884455',
//     },
//     role: AdministrationRoleEnum.SERVICE_CLIENT,
//   },
//   {
//     id: '9',
//     user: { img: 'https://via.placeholder.com/150', name: 'Ismael Perret', phone: '666559988' },
//     role: AdministrationRoleEnum.SUPER_ADMIN,
//   },
//   {
//     id: '10',
//     user: {
//       img: 'https://via.placeholder.com/150',
//       name: 'Juliette Lemoine',
//       phone: '688774455',
//     },
//     role: AdministrationRoleEnum.SUPER_ADMIN,
//   },
// ]

export const administrationColumn: ColumnDef<AdminResponse>[] = [
  {
    accessorKey: 'user',
    // size: 100,
    // maxSize: 100,
    size: 500,
    header: () => h('div', { class: 'text-left text-xs ' }, 'Utilisateur'),

    cell: ({ row }) => {
      const rowOriginal: AdminResponse = row.original

      const firstName = rowOriginal.firstName
      const lastName = rowOriginal.lastName
      const fullName = `${firstName} ${lastName}`
      return h(
        'div',
        { class: 'text-left min-w-[250px]' },
        h(AdministrationUserBloc, {
          admin: rowOriginal,
        }),
      )
    },
  },

  {
    accessorKey: 'phone',
    // size: 200,
    header: () => h('div', { class: 'text-left text-xs' }, 'Numéro'),
    cell: ({ row }) => {
      const rowOriginal: AdminResponse = row.original
      //   const testDate = new Date(date)

      return h(
        'div',
        { class: 'text-left  text-neutral-20 text-sm min-w-[150px]' },
        formatPhoneNumber(rowOriginal.phoneNumber),
      )
    },
  },
  {
    accessorKey: 'role',
    // size: 150,
    header: () => h('div', { class: 'text-left text-xs' }, 'Rôle'),
    cell: ({ row }) => {
      const role = row.getValue('role') as string

      return h(
        'div',
        { class: 'text-left  text-neutral-20 text-sm min-w-[200px]' },
        AdministrationRoleEnum.SUPER_ADMIN,
      )
    },
  },

  // ACTIONS
  {
    id: 'actions',
    enableHiding: false,
    size: 116,
    cell: ({ row }) => {
      const rowOriginal = row.original

      return h(
        'div',
        { class: 'text-right flex justify-end' },
        h(AdministrationActionsBloc, {
          id: rowOriginal.id,
        }),
      )
    },
  },
]
