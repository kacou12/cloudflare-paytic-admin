import type { ColumnDef } from '@tanstack/vue-table'
import collectionAndTransfertBloc from './collectionAndTransfertBloc.vue'
import { h } from 'vue'
import OperatorBloc from './operatorBloc.vue'
import PhoneBloc from './phoneBloc.vue'
import { formatPhoneNumber, formatRelativeDate } from '@/lib/utils'
import type { TransactionResponse } from '@/services/transactions/transaction-type'
import TransactionStatusBloc from './transactionStatusBloc.vue'
import TransactionActionDropdown from './transactionActionDropdown.vue'
import { TransactionStatusEnum } from '@/constants/constant.enum'

export const collectionAndTransferColumn: ColumnDef<TransactionResponse>[] = [
  {
    accessorKey: 'type',
    header: () => h('div', { class: 'text-left text-xs' }, 'type'),
    cell: ({ row }) => {
      const rowOriginal = row.original as TransactionResponse

      return h(
        'div',
        {
          class: 'text-left text-sm font-medium ',
        },
        h(collectionAndTransfertBloc, {
          transactionType: rowOriginal.type,
        }),
      )
    },
  },
  {
    accessorKey: 'id',
    header: () => h('div', { class: 'text-left text-xs min-w-[200px] ' }, 'id'),

    cell: ({ row }) => {
      const rowOriginal = row.original

      return h(
        'div',
        { class: 'text-left text-sm min-w-[200px]  truncate' },
        h(PhoneBloc, {
          phoneNumber: rowOriginal.id,
        }),
      )
    },
  },
  {
    accessorKey: 'custome_id',

    header: () => h('div', { class: 'text-left text-xs min-w-[150px] ' }, 'Custom id'),

    cell: ({ row }) => {
      const rowOriginal = row.original

      return h(
        'div',
        { class: 'text-left text-sm min-w-[150px] truncate' },
        h(PhoneBloc, {
          phoneNumber: rowOriginal.custom_id,
        }),
      )
    },
  },
  {
    accessorKey: 'date',
    enableResizing: false,
    header: () => h('div', { class: 'text-left text-xs min-w-[150px]' }, 'Date'),
    cell: ({ row }) => {
      const rowOriginal = row.original as TransactionResponse

      return h(
        'div',
        { class: 'text-left  text-neutral-20 text-sm min-w-[150px]' },
        formatRelativeDate(new Date(rowOriginal.created_at)),
      )
    },
  },
  {
    accessorKey: 'client',
    // size: 150,
    header: () => h('div', { class: 'text-left  text-xs  w-[200px]' }, 'Client'),
    cell: ({ row }) => {
      const rowOriginal = row.original as TransactionResponse
      const fullName = `${rowOriginal.merchant!.business_name}`
      // const fullName = `jhrghpigh fegegoi kgglgjll dffggtrth fhdhtrtrhthr brghrnjehfhefhehjf fejnigjeifjenjei jehzfihezijfeihjif ejfieihji`

      return h(
        'div',
        { class: 'text-left  text-neutral-20 text-sm  min-w-[200px]  truncate' },
        fullName,
      )
    },
  },

  {
    accessorKey: 'amount',
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
    header: () => h('div', { class: 'text-left  text-xs' }, 'Frais'),
    cell: ({ row }) => {
      const rowOriginal = row.original as TransactionResponse
      const amount = rowOriginal.fee.amount
      const formatted = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: rowOriginal.fee.currency.toUpperCase(),
      }).format(amount)

      return h('div', { class: 'text-left  text-neutral-20 text-sm' }, formatted)
    },
  },
  {
    accessorKey: 'operator',
    header: () => h('div', { class: 'text-left  text-xs' }, 'Opérateur'),
    cell: ({ row }) => {
      const rowOriginal = row.original as TransactionResponse

      return h(
        'div',
        { class: 'text-left  text-neutral-20 text-sm' },
        h(OperatorBloc, {
          operator: rowOriginal.provider,
        }),
      )
    },
  },
  {
    accessorKey: 'beneficiaryPhone',
    header: () => h('div', { class: 'text-left  text-xs min-w-[100px]' }, 'Numero'),
    cell: ({ row }) => {
      const rowOriginal = row.original as TransactionResponse
      return h(
        'div',
        { class: 'text-left  text-neutral-20 text-sm min-w-[100px] truncate' },
        h(PhoneBloc, {
          phoneNumber: rowOriginal.msisdn,
        }),
      )
    },
  },
  {
    accessorKey: 'reference',

    header: () => h('div', { class: 'text-left  text-xs' }, 'Réference'),
    cell: ({ row }) => {
      const rowOriginal = row.original as TransactionResponse
      return h(
        'div',
        { class: 'text-left  text-neutral-20 text-sm' },
        h(PhoneBloc, {
          phoneNumber: rowOriginal.reference,
        }),
      )
    },
  },

  {
    accessorKey: 'transactionStatus',
    header: () => h('div', { class: 'text-left text-xs min-w-[80px]' }, 'Statut'),
    cell: ({ row }) => {
      const transactionStatus = row.getValue('transactionStatus')
      const transaction: TransactionResponse = row.original
      return h(
        'div',
        {
          class: ' text-neutral-20 text-sm min-w-[80px]',
        },
        h(TransactionStatusBloc, {
          transaction: transaction,
        }),
      )
    },
    
  },
   {
    
    id: 'actions',
    // enableHiding: false,

    cell: ({ row }) => {
      const transaction: TransactionResponse = row.original

      if([TransactionStatusEnum.Failed, TransactionStatusEnum.Pending, TransactionStatusEnum.Processing].includes(transaction.status)) {
       
        return h(
          'div',
          { class: 'text-left' },
          h(TransactionActionDropdown, {
            transaction: transaction,
          }),
        )
      }

     
    },
  },
  
]
