import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import type { ChargeResponse } from '@/services/charge/charge-type'
import ChargeActionDropdownBloc from './chargeActionDropdownBloc.vue'
import { formatRelativeDate } from '@/lib/utils'

export const chargesColumn: ColumnDef<ChargeResponse>[] = [
  {
    accessorKey: 'provider',
    size: 500,
    header: () => h('div', { class: 'text-left text-xs' }, 'Provider'),
    cell: ({ row }) => {
      const rowOriginal: ChargeResponse = row.original
      return h('div', { class: 'text-left min-w-[250px]' }, rowOriginal.provider.operator)
    },
  },
  {
    accessorKey: 'merchant',
    size: 500,
    header: () => h('div', { class: 'text-left text-xs' }, 'Marchant'),
    cell: ({ row }) => {
      const rowOriginal: ChargeResponse = row.original
      return h('div', { class: 'text-left min-w-[250px]' }, rowOriginal.merchant.business_name)
    },
  },
  {
    accessorKey: 'charge',
    size: 500,
    header: () => h('div', { class: 'text-left text-xs' }, 'Charge'),
    cell: ({ row }) => {
      const rowOriginal: ChargeResponse = row.original
      return h('div', { class: 'text-left min-w-[250px]' }, `${rowOriginal.charge}%`)
    },
  },
  {
    accessorKey: 'date de creation',
    size: 500,
    header: () => h('div', { class: 'text-left text-xs' }, 'Date de creation'),
    cell: ({ row }) => {
      const rowOriginal: ChargeResponse = row.original
      return h(
        'div',
        { class: 'text-left min-w-[250px]' },
        formatRelativeDate(new Date(rowOriginal.created_time)),
      )
    },
  },
  // ACTIONS
  {
    id: 'actions',
    enableHiding: false,
    size: 116,
    cell: ({ row }) => {
      const rowOriginal: ChargeResponse = row.original
      return h(
        'div',
        { class: 'text-right flex justify-end' },
        h(ChargeActionDropdownBloc, {
          charge: rowOriginal,
        }),
      )
    },
  },
]
