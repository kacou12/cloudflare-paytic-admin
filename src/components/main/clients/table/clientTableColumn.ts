import type { ColumnDef } from '@tanstack/vue-table'

import { ClientStatusEnum, type ClientsType } from '@/interfaces/datatable.interface'

import { h } from 'vue'
import PhoneBloc from '../../dashboard/phoneBloc.vue'
import ClientActionBloc from './clientActionBloc.vue'

export const clientsData: ClientsType[] = [
  {
    id: '15313f8-8f05-4602',
    name: 'OUEDRAOGO Ibrahim',
    contact: '+2250712345678',
    date: '05/04/2024 17h54',
    status: 'ACTIF',
  },
  {
    id: '15313f8-8f05-4602',
    name: 'Johhnny Patcheko',
    contact: '+2250712345678',
    date: '05/04/2024 17h54',
    status: 'ACTIF',
  },
  {
    id: '15313f8-8f05-4602',
    name: 'Irumi Iguruma',
    contact: '+2250712345650',
    date: '05/04/2023 17h54',
    status: 'SUSPENDU',
  },
  {
    id: '15313f8-8f05-4450',
    name: 'Naruto Uzumaki',
    date: '05/09/2023 10h54',
    contact: '+2250712145678',
    status: 'ACTIF',
  },
]

export const clientsColumn: ColumnDef<ClientsType>[] = [
  {
    accessorKey: 'id',
    size: 100,
    // maxSize: 100,
    // size: 440,
    header: () => h('div', { class: 'text-left text-xs ' }, 'ID Client'),

    cell: ({ row }) => {
      const rowOriginal = row.original as ClientsType

      return h(
        'div',
        {
          class: 'text-left text-sm font-medium min-w-[200px]',
        },
        h(PhoneBloc, {
          phoneNumber: rowOriginal.id,
        }),
      )
    },
  },
  {
    accessorKey: 'name',
    size: 100,
    // maxSize: 100,
    // size: 440,
    header: () => h('div', { class: 'text-left text-xs ' }, 'Nom'),

    cell: ({ row }) => {
      const rowOriginal = row.original as ClientsType

      return h(
        'div',
        {
          class: 'text-left text-sm font-medium min-w-[200px]',
        },
        rowOriginal.name,
      )
    },
  },
  {
    accessorKey: 'date',
    size: 100,
    // maxSize: 100,
    // size: 440,
    header: () => h('div', { class: 'text-left text-xs ' }, 'Date'),

    cell: ({ row }) => {
      const rowOriginal = row.original as ClientsType

      return h(
        'div',
        {
          class: 'text-left text-sm font-medium min-w-[200px]',
        },
        rowOriginal.date,
      )
    },
  },
  {
    // id: '15313f8-8f05-4602-a362-22ecfcdfc341',
    // name: 'OUEDRAOGO Ibrahim',
    // contact: '+2250712345678',
    // date: '05/04/2024 17h54',
    // status: 'ACTIF',
    accessorKey: 'contact',
    // size: 10,
    header: () => h('div', { class: 'text-left  text-xs' }, 'Contact'),
    cell: ({ row }) => {
      const rowOriginal = row.original as ClientsType

      return h(
        'div',
        { class: 'text-left  text-neutral-20 text-sm' },
        h(PhoneBloc, {
          phoneNumber: rowOriginal.contact,
        }),
      )
    },
  },
  {
    accessorKey: 'status',
    size: 126,
    header: () => h('div', { class: 'text-left text-xs ' }, 'status'),
    cell: ({ row }) => {
      const status = row.getValue('status')

      const fullStatus = `
      
      <span class="text-xs text-center font-medium px-2 py-[1px] rounded-2xl bg-success-light-3 text-success-dark">
        ${ClientStatusEnum.ACTIF.name}</span>
      
      `
      return h('div', {
        class: ' text-neutral-20 text-xs',
        innerHTML: fullStatus,
      })
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
        h(ClientActionBloc, {
          id: rowOriginal.id,
        }),
      )
    },
  },
]
