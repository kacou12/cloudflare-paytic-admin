import type { ColumnDef } from '@tanstack/vue-table'

import { h } from 'vue'

import type {
  GroupedIssuerRates,
  IssuerProviderRateResponse,
} from '@/services/issuer-provider-rate/Issuer-provider-rate-type'
import IssuersProviderRateActionDropdownBloc from './issuersProviderRateActionDropdownBloc.vue'
import IssuersProviderRateActionDropdownGroupedBloc from './issuersProviderRateActionDropdownGroupedBloc.vue'

export const issuersProviderRateColumn: ColumnDef<GroupedIssuerRates>[] = [
  {
    accessorKey: 'id',

    size: 500,
    header: () => h('div', { class: 'text-left text-xs ' }, 'id'),

    cell: ({ row }) => {
      const rowOriginal: GroupedIssuerRates = row.original

      return h('div', { class: 'text-left min-w-[250px]' }, rowOriginal.id)
    },
  },

  {
    accessorKey: 'issuer',

    size: 500,
    header: () => h('div', { class: 'text-left text-xs ' }, "nom de l'agregateur"),

    cell: ({ row }) => {
      const rowOriginal: GroupedIssuerRates = row.original

      return h('div', { class: 'text-left min-w-[250px]' }, rowOriginal.issuer.name)
    },
  },
  {
    accessorKey: 'providers',

    size: 500,
    header: () => h('div', { class: 'text-left text-xs ' }, 'nombre de providers'),

    cell: ({ row }) => {
      const rowOriginal: GroupedIssuerRates = row.original

      return h('div', { class: 'text-left min-w-[250px]' }, rowOriginal.providers.length)
    },
  },

  {
    id: 'actions',
    enableHiding: false,
    size: 116,
    cell: ({ row }) => {
      const rowOriginal: GroupedIssuerRates = row.original

      return h(
        'div',
        { class: 'text-right flex justify-end' },
        h(IssuersProviderRateActionDropdownGroupedBloc, {
          groupedIssuerRates: rowOriginal,
        }),
      )
    },
  },
]

// ---------------- \\\

// export const issuersProviderRateColumn: ColumnDef<IssuerProviderRateResponse>[] = [
//   {
//     accessorKey: 'id',

//     size: 500,
//     header: () => h('div', { class: 'text-left text-xs ' }, 'id'),

//     cell: ({ row }) => {
//       const rowOriginal: IssuerProviderRateResponse = row.original

//       return h('div', { class: 'text-left min-w-[250px]' }, rowOriginal.id)
//     },
//   },
//   {
//     accessorKey: 'provider',

//     size: 500,
//     header: () => h('div', { class: 'text-left text-xs ' }, 'nom du provider'),

//     cell: ({ row }) => {
//       const rowOriginal: IssuerProviderRateResponse = row.original

//       return h('div', { class: 'text-left min-w-[250px]' }, rowOriginal.provider.name)
//     },
//   },
//   {
//     accessorKey: 'issuer',

//     size: 500,
//     header: () => h('div', { class: 'text-left text-xs ' }, "nom de l'agregateur"),

//     cell: ({ row }) => {
//       const rowOriginal: IssuerProviderRateResponse = row.original

//       return h('div', { class: 'text-left min-w-[250px]' }, rowOriginal.issuer.name)
//     },
//   },
//   {
//     accessorKey: 'cashout_rate',

//     header: () => h('div', { class: 'text-left text-xs' }, 'collecte'),
//     cell: ({ row }) => {
//       const rowOriginal: IssuerProviderRateResponse = row.original
//       return h(
//         'div',
//         { class: 'text-left  text-neutral-20 text-sm min-w-[150px]' },
//         `${rowOriginal.cashout_rate}%`,
//       )
//     },
//   },
//   {
//     accessorKey: 'cashin_rate',
//     header: () => h('div', { class: 'text-left text-xs' }, 'transfert '),
//     cell: ({ row }) => {
//       const rowOriginal: IssuerProviderRateResponse = row.original
//       //   const testDate = new Date(date)

//       return h(
//         'div',
//         { class: 'text-left  text-neutral-20 text-sm min-w-[150px]' },
//         `${rowOriginal.cashin_rate}%`,
//       )
//     },
//   },
//   {
//     id: 'actions',
//     enableHiding: false,
//     size: 116,
//     cell: ({ row }) => {
//       const rowOriginal: IssuerProviderRateResponse = row.original

//       return h(
//         'div',
//         { class: 'text-right flex justify-end' },
//         h(IssuersProviderRateActionDropdownBloc, {
//           issuersProviderRate: rowOriginal,
//         }),
//       )
//     },
//   },
// ]
