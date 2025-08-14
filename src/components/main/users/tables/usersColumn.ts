import type { ColumnDef } from '@tanstack/vue-table'

import { h } from 'vue'

import { formatRelativeDate } from '@/lib/utils'
import type { UserResponse } from '@/services/user/user.type'
import UserActionDropdownBloc from './userActionDropdownBloc.vue'

export const usersColumn: ColumnDef<UserResponse>[] = [
  // {
  //   accessorKey: 'id',
  //   size: 300,
  //   header: () => h('div', { class: 'text-left text-xs ' }, 'ID'),

  //   cell: ({ row }) => {
  //     const rowOriginal: UserResponse = row.original

  //     return h('div', { class: 'text-left min-w-[200px]' }, rowOriginal.id)
  //   },
  // },
  {
    accessorKey: 'first_name',
    size: 200,
    header: () => h('div', { class: 'text-left text-xs ' }, 'Prénom'),

    cell: ({ row }) => {
      const rowOriginal: UserResponse = row.original

      return h('div', { class: 'text-left min-w-[150px]' }, rowOriginal.first_name)
    },
  },
  {
    accessorKey: 'last_name',
    size: 200,
    header: () => h('div', { class: 'text-left text-xs ' }, 'Nom'),

    cell: ({ row }) => {
      const rowOriginal: UserResponse = row.original

      return h('div', { class: 'text-left min-w-[150px]' }, rowOriginal.last_name)
    },
  },
  {
    accessorKey: 'email',
    size: 250,
    header: () => h('div', { class: 'text-left text-xs ' }, 'Email'),

    cell: ({ row }) => {
      const rowOriginal: UserResponse = row.original

      return h('div', { class: 'text-left min-w-[200px]' }, rowOriginal.email)
    },
  },
  {
    accessorKey: 'phone',
    size: 150,
    header: () => h('div', { class: 'text-left text-xs ' }, 'Téléphone'),

    cell: ({ row }) => {
      const rowOriginal: UserResponse = row.original

      return h('div', { class: 'text-left min-w-[120px]' }, rowOriginal.phone)
    },
  },
  {
    accessorKey: 'role',
    size: 120,
    header: () => h('div', { class: 'text-left text-xs ' }, 'Rôle'),

    cell: ({ row }) => {
      const rowOriginal: UserResponse = row.original

      return h('div', { class: 'text-left min-w-[100px]' }, rowOriginal.role)
    },
  },
  {
    accessorKey: 'is_active',
    size: 100,
    header: () => h('div', { class: 'text-left text-xs ' }, 'Statut'),

    cell: ({ row }) => {
      const rowOriginal: UserResponse = row.original

      return h(
        'div',
        {
          class: `text-left min-w-[80px] px-2 py-1 rounded-full text-xs font-medium ${
            rowOriginal.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`,
        },
        rowOriginal.is_active ? 'Actif' : 'Inactif',
      )
    },
  },
  {
    accessorKey: 'merchant.business_name',
    size: 200,
    header: () => h('div', { class: 'text-left text-xs ' }, 'Marchand'),

    cell: ({ row }) => {
      const rowOriginal: UserResponse = row.original

      return h(
        'div',
        { class: 'text-left min-w-[150px]' },
        rowOriginal.merchant?.business_name || '-',
      )
    },
  },

  // ACTIONS
  {
    id: 'actions',
    enableHiding: false,
    size: 116,
    cell: ({ row }) => {
      const rowOriginal: UserResponse = row.original

      return h(
        'div',
        { class: 'text-right flex justify-end' },
        h(UserActionDropdownBloc, {
          user: rowOriginal,
        }),
      )
    },
  },
]
