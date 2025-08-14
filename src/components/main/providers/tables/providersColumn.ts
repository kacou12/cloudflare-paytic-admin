import type { ColumnDef } from '@tanstack/vue-table'

import { h } from 'vue'

import { formatRelativeDate } from '@/lib/utils'
import type { ProviderResponse } from '@/services/providers/provider-type'
import ProviderActionDropdownBloc from './providerActionDropdownBloc.vue'

export const providersColumn: ColumnDef<ProviderResponse>[] = [
  {
    accessorKey: 'name',
    // size: 100,
    // maxSize: 100,
    size: 500,
    header: () => h('div', { class: 'text-left text-xs ' }, 'nom du provider'),

    cell: ({ row }) => {
      const rowOriginal: ProviderResponse = row.original

      return h('div', { class: 'text-left min-w-[250px]' }, rowOriginal.operator)
    },
  },

  {
    accessorKey: 'date',
    // size: 200,
    header: () => h('div', { class: 'text-left text-xs' }, 'Date de creation'),
    cell: ({ row }) => {
      const rowOriginal: ProviderResponse = row.original
      //   const testDate = new Date(date)

      return h(
        'div',
        { class: 'text-left  text-neutral-20 text-sm min-w-[150px]' },
        formatRelativeDate(new Date(rowOriginal.created_at)),
      )
    },
  },

  // ACTIONS
  {
    id: 'actions',
    enableHiding: false,
    size: 116,
    cell: ({ row }) => {
      const rowOriginal: ProviderResponse = row.original

      return h(
        'div',
        { class: 'text-right flex justify-end' },
        h(ProviderActionDropdownBloc, {
          provider: rowOriginal,
        }),
      )
    },
  },
]
