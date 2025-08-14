import type { ColumnDef } from '@tanstack/vue-table'
import collectionAndTransfertBloc from './collectionAndTransfertBloc.vue'

import {
  TransactionStatusEnum,
  type CollectedOrTransferedType,
} from '@/interfaces/datatable.interface'

import { h } from 'vue'
import OperatorBloc from './operatorBloc.vue'
import PhoneBloc from './phoneBloc.vue'
import { formatPhoneNumber } from '@/lib/utils'
import type { TransactionTypesEnum } from '@/constants/constant.enum'

export const oldCollectionAndTransferData: CollectedOrTransferedType[] = [
  {
    type: "Collecte d'argent",
    id: '15313f8-8f05-4602-a362',
    amount: '5000',
    client: 'Kouassi Ibrahim',
    fees: '100',
    operator: 'Orange',
    beneficiaryPhone: '0700123456',
    reference: 'PAY-120469',
    status: 'SUCCESS',
  },
  {
    type: "Transfert d'argent",
    id: '06de3d44-c55f-479f-91ba',
    amount: '10000',
    client: 'Jean Narcisse',
    fees: '200',
    operator: 'Wave',
    beneficiaryPhone: '0700987654',
    reference: 'PAY-2209',
    status: 'ATTEMPT',
  },
  {
    type: "Collecte d'argent",
    client: 'Kouassi Romeo',
    id: '356f9939-45d9-4bd8-9f37',
    amount: '7500',
    fees: '150',
    operator: 'MTN',
    beneficiaryPhone: '0700567890',
    reference: 'PAY-220469',
    status: 'FAILURE',
  },
  {
    type: "Transfert d'argent",
    id: '70c495f5-9765-444e-80be',
    amount: '12000',
    client: 'Kouassi Romeo',
    fees: '250',
    operator: 'Moov',
    beneficiaryPhone: '0700345678',
    reference: 'PAY-420469',
    status: 'SUCCESS',
  },
  {
    type: "Collecte d'argent",
    client: 'John Doe',
    id: '8c9ec484-0e52-4414-b0ee',
    amount: '3000',
    fees: '50',
    operator: 'Orange',
    beneficiaryPhone: '0700234567',
    reference: 'PAY-420469',
    status: 'ATTEMPT',
  },
  {
    type: "Transfert d'argent",
    client: 'John Stockhton',
    id: 'b7484cca-3a3f-451a-a22f',
    amount: '15000',
    fees: '300',
    operator: 'Wave',
    beneficiaryPhone: '0700789123',
    reference: 'PAY-420469',
    status: 'SUCCESS',
  },
  {
    type: "Collecte d'argent",
    client: 'John Stockhton',
    id: '8bdd149e-f8b3-41e6-899a',
    amount: '8200',
    fees: '120',
    operator: 'MTN',
    beneficiaryPhone: '0700456789',
    reference: 'PAY-1580465',
    status: 'FAILURE',
  },
  {
    type: "Transfert d'argent",
    client: 'Patrick William',
    id: '56dbdffe-c06a-49d9-b5cc',
    amount: '11000',
    fees: '220',
    operator: 'Moov',
    beneficiaryPhone: '0700345698',
    reference: 'PAY-1580465',
    status: 'ATTEMPT',
  },
  {
    type: "Collecte d'argent",
    client: 'Patrick William',
    id: 'c3f01347-cf2d-4d88-a96c',
    amount: '9000',
    fees: '180',
    operator: 'Orange',
    beneficiaryPhone: '0700123798',
    reference: 'PAY-0180465',
    status: 'SUCCESS',
  },
  {
    client: 'Patrick William',
    type: "Transfert d'argent",
    id: '8d45a42f-09c9-4755-b5a4',
    amount: '2500',
    fees: '40',
    operator: 'Wave',
    beneficiaryPhone: '0700678945',
    reference: 'PAY-0180465',
    status: 'FAILURE',
  },
  {
    type: "Collecte d'argent",
    client: 'Patrick William',
    id: '53bbb3d1-4253-4bed-9b0b',
    amount: '7200',
    fees: '110',
    operator: 'MTN',
    beneficiaryPhone: '0700567834',
    reference: 'PAY-01858865',
    status: 'SUCCESS',
  },
  {
    type: "Transfert d'argent",
    client: 'Johnny Patcheko',
    id: '7066577d-a8b3-47bb-ac5c',
    amount: '13400',
    fees: '260',
    operator: 'Moov',
    beneficiaryPhone: '0700345612',
    reference: 'PAY-25669',
    status: 'ATTEMPT',
  },
]

export const collectionAndTransferColumn: ColumnDef<CollectedOrTransferedType>[] = [
  {
    accessorKey: 'type',
    size: 100,
    // maxSize: 100,
    // size: 440,
    header: () => h('div', { class: 'text-left text-xs ' }, 'type'),

    cell: ({ row }) => {
      const rowOriginal = row.original as CollectedOrTransferedType
      const type: "Collecte d'argent" | "Transfert d'argent" = row.getValue('type')
      const fullStatus = `
        <div class="flex items-center gap-3">
            <section class="rounded-full p-2 bg-[#eeeeec] ">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M3.89583 16.1033C4.25824 16.4657 4.84582 16.4657 5.20823 16.1033L14.518 6.7935V13.8332C14.518 14.3457 14.9335 14.7612 15.446 14.7612C15.9585 14.7612 16.374 14.3457 16.374 13.8332V4.5531C16.374 4.04057 15.9585 3.62509 15.446 3.62509H6.16595C5.65343 3.62509 5.23795 4.04057 5.23795 4.5531C5.23795 5.06562 5.65343 5.4811 6.16595 5.4811H13.2056L3.89583 14.7909C3.53342 15.1533 3.53342 15.7409 3.89583 16.1033Z"
                        fill="#1A1A1A" />
                </svg>

            </section>
            <section>
                <p class="text-neutral-10 text-sm font-medium">
                    ${type}
                </p>
            </section>
        </div>`

      //   const rowOriginal = row.original

      return h(
        'div',
        {
          class: 'text-left text-sm font-medium min-w-[200px]',
        },
        h(collectionAndTransfertBloc, {
          transactionType: rowOriginal.type as TransactionTypesEnum,
        }),
      )
    },
  },
  {
    accessorKey: 'id',
    size: 300,
    // maxSize: 100,
    // size: 440,
    header: () => h('div', { class: 'text-left text-xs' }, 'id'),

    cell: ({ row }) => {
      const id: string = row.getValue('id')

      //   const rowOriginal = row.original

      return h(
        'div',
        { class: 'text-left text-xs ' },
        h(PhoneBloc, {
          phoneNumber: id,
        }),
      )
    },
  },
  {
    accessorKey: 'client',
    // size: 10,
    header: () => h('div', { class: 'text-left  text-xs' }, 'Client'),
    cell: ({ row }) => {
      const rowOriginal = row.original as CollectedOrTransferedType

      return h('div', { class: 'text-left  text-neutral-20 text-sm' }, rowOriginal.client)
    },
  },

  {
    accessorKey: 'amount',
    // size: 10,
    header: () => h('div', { class: 'text-left  text-xs' }, 'Montant'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF',
      }).format(amount)

      return h('div', { class: 'text-left  text-neutral-20 text-sm' }, formatted)
    },
  },
  {
    accessorKey: 'fees',
    // size: 10,
    header: () => h('div', { class: 'text-left  text-xs' }, 'Frais'),
    cell: ({ row }) => {
      //   const amount = Number.parseFloat(row.getValue('amount'))
      const amount = Number.parseFloat(row.getValue('fees'))
      const formatted = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF',
      }).format(amount)

      return h('div', { class: 'text-left  text-neutral-20 text-sm' }, formatted)
    },
  },
  {
    accessorKey: 'operator',
    // size: 10,
    header: () => h('div', { class: 'text-left  text-xs' }, 'Opérateur'),
    cell: ({ row }) => {
      //   const amount = Number.parseFloat(row.getValue('amount'))
      let operator: string = row.getValue('operator')

      return h(
        'div',
        { class: 'text-left  text-neutral-20 text-sm' },
        h(OperatorBloc, {
          operator: operator,
        }),
      )
    },
  },
  {
    accessorKey: 'beneficiaryPhone',
    // size: 10,
    header: () => h('div', { class: 'text-left  text-xs' }, 'Numero'),
    cell: ({ row }) => {
      //   const amount = Number.parseFloat(row.getValue('amount'))
      let beneficiaryPhone: string = row.getValue('beneficiaryPhone')

      return h(
        'div',
        { class: 'text-left  text-neutral-20 text-xs' },
        h(PhoneBloc, {
          phoneNumber: formatPhoneNumber(beneficiaryPhone),
        }),
      )
    },
  },
  {
    accessorKey: 'reference',
    // size: 10,
    header: () => h('div', { class: 'text-left  text-xs' }, 'Réference'),
    cell: ({ row }) => {
      //   const amount = Number.parseFloat(row.getValue('amount'))
      let reference: string = row.getValue('reference')

      return h(
        'div',
        { class: 'text-left  text-neutral-20 text-xs' },
        h(PhoneBloc, {
          phoneNumber: reference,
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
        ${TransactionStatusEnum.SUCCESS.name}</span>
      
      `
      return h('div', {
        class: ' text-neutral-20 text-xs',
        innerHTML: fullStatus,
      })
    },
  },
]
