import {
  RequestStatusEnum,
  RequestTypeEnum,
  type RequestsType,
} from '@/interfaces/datatable.interface'
import type { ColumnDef } from '@tanstack/vue-table'

import { h } from 'vue'
import RequestBlocStatusInfo from './requestBlocStatusInfo.vue'
import RequestsActionBloc from './requestsActionBloc.vue'
import type { MerchantRequestResponse } from '@/services/merchant-request/merchant-request.type'

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

/**
 * Recherche un type de requête par son nom dans RequestTypeEnum
 * @param {string} searchName - Le nom à rechercher
 * @returns {string|null} - La clé correspondante ou null si non trouvé
 */
function findRequestTypeByName(searchName: string) {
  if (!searchName) return null

  // Normalisation du texte recherché (minuscules, sans accents)
  const normalizedSearch = searchName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  // Parcourir les clés de RequestTypeEnum
  for (const [key, value] of Object.entries(RequestTypeEnum)) {
    // Normaliser également le nom dans l'objet pour une comparaison insensible à la casse et aux accents
    const normalizedName = value.enumName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')

    if (normalizedName === normalizedSearch) {
      return key
    }
  }

  return null
}
function findRequestStatusByName(searchName: string) {
  if (!searchName) return null

  // Normalisation du texte recherché (minuscules, sans accents)
  const normalizedSearch = searchName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  // Parcourir les clés de RequestTypeEnum
  for (const [key, value] of Object.entries(RequestStatusEnum)) {
    // Normaliser également le nom dans l'objet pour une comparaison insensible à la casse et aux accents
    const normalizedName = value.enumName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')

    if (normalizedName === normalizedSearch) {
      return key
    }
  }

  return null
}

export const requestsColumn: ColumnDef<MerchantRequestResponse>[] = [
  {
    accessorKey: 'type',
    size: 100,
    header: () => h('div', { class: 'text-left text-xs ' }, 'Type'),
    cell: ({ row }) => {
      const rowOriginal = row.original;
      const typeKey = findRequestTypeByName(rowOriginal.type) as keyof typeof RequestTypeEnum;
      const typeInfo = RequestTypeEnum[typeKey];

      return h(
        'div',
        {
          class: ' text-neutral-20 text-xs',
        },
        h(RequestBlocStatusInfo, {
          status: { ...typeInfo },
        }),
      );
    },
  },
  {
    accessorKey: 'created_at',
    size: 150,
    header: () => h('div', { class: 'text-left text-xs ' }, 'Date'),
    cell: ({ row }) => {
      const rowOriginal = row.original;
      const formattedDate = new Intl.DateTimeFormat('fr-FR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }).format(new Date(rowOriginal.created_at));

      return h(
        'div',
        {
          class: 'text-left text-sm font-medium min-w-[150px]',
        },
        formattedDate,
      );
    },
  },
  {
    accessorKey: 'merchant.business_name',
    size: 200,
    header: () => h('div', { class: 'text-left text-xs ' }, 'Client'),
    cell: ({ row }) => {
      const rowOriginal = row.original;

      return h(
        'div',
        {
          class: 'text-left text-sm font-medium min-w-[200px]',
        },
        rowOriginal.merchant.business_name,
      );
    },
  },
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-left  text-xs' }, 'Montant'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.original.amount.toString());
      const formatted = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF',
      }).format(amount);

      return h('div', { class: 'text-left  text-neutral-20 text-sm' }, formatted);
    },
  },
  {
    accessorKey: 'status',
    size: 126,
    header: () => h('div', { class: 'text-left text-xs ' }, 'Status'),
    cell: ({ row }) => {
      const rowOriginal = row.original;
      const statusKey = findRequestStatusByName(rowOriginal.status) as keyof typeof RequestStatusEnum;
      const typeInfo = RequestStatusEnum[statusKey];

      return h(
        'div',
        {
          class: ' text-neutral-20 text-xs',
        },
        h(RequestBlocStatusInfo, {
          status: { ...typeInfo },
        }),
      );
    },
  },
  // ACTIONS
  {
    id: 'actions',
    enableHiding: false,

    size: 116,
    cell: ({ row }) => {
      const rowOriginal = row.original;

      return h(
        'div',
        { class: 'text-right flex justify-end' },
        h(RequestsActionBloc, {
          request: rowOriginal,
        }),
      );
    },
  },
];