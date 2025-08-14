import type { ColumnDef } from '@tanstack/vue-table'

import { h } from 'vue'

import { formatRelativeDate } from '@/lib/utils'
import type { ProviderResponse } from '@/services/providers/provider-type'
import ProviderActionDropdownBloc from './issuerActionDropdownBloc.vue'
import type { IssuerResponse } from '@/services/issuers/issuer-type'
import IssuerActionDropdownBloc from './issuerActionDropdownBloc.vue'

export const issuersColumn: ColumnDef<IssuerResponse>[] = [
  {
    accessorKey: 'id',
    // size: 100,
    // maxSize: 100,
    size: 500,
    header: () => h('div', { class: 'text-left text-xs ' }, 'id'),

    cell: ({ row }) => {
      const rowOriginal: IssuerResponse = row.original

      return h('div', { class: 'text-left min-w-[250px]' }, rowOriginal.id)
    },
  },
  {
    accessorKey: 'name',
    // size: 100,
    // maxSize: 100,
    size: 500,
    header: () => h('div', { class: 'text-left text-xs ' }, "nom de l'aggregateur"),

    cell: ({ row }) => {
      const rowOriginal: IssuerResponse = row.original

      return h('div', { class: 'text-left min-w-[250px]' }, rowOriginal.name)
    },
  },

  // {
  //   accessorKey: 'cashin_rate',
  //   // size: 200,
  //   header: () => h('div', { class: 'text-left text-xs' }, 'cash in rate'),
  //   cell: ({ row }) => {
  //     const rowOriginal: IssuerResponse = row.original
  //     //   const testDate = new Date(date)

  //     return h(
  //       'div',
  //       { class: 'text-left  text-neutral-20 text-sm min-w-[150px]' },
  //       rowOriginal.cashin_rate,
  //     )
  //   },
  // },
  // {
  //   accessorKey: 'cashout_rate',
  //   // size: 200,
  //   header: () => h('div', { class: 'text-left text-xs' }, 'cash out rate'),
  //   cell: ({ row }) => {
  //     const rowOriginal: IssuerResponse = row.original
  //     //   const testDate = new Date(date)

  //     return h(
  //       'div',
  //       { class: 'text-left  text-neutral-20 text-sm min-w-[150px]' },
  //       rowOriginal.cashout_rate,
  //     )
  //   },
  // },

  // ACTIONS
  {
    id: 'actions',
    enableHiding: false,
    size: 116,
    cell: ({ row }) => {
      const rowOriginal: IssuerResponse = row.original

      return h(
        'div',
        { class: 'text-right flex justify-end' },
        h(IssuerActionDropdownBloc, {
          issuer: rowOriginal,
        }),
      )
    },
  },
]
