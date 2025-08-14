import { h } from 'vue';
import type { ColumnDef } from '@tanstack/vue-table'; // Assuming this import path is correct
import type { MerchantRequest, MerchantResponse } from '@/services/merchants/merchant-type'; // Assuming MerchantResponse is equivalent to MerchantRequest
import MerchantActionDropdownBloc from './merchantActionDropdownBloc.vue';
import { findEnumDataByName } from '@/shared/shared';
import { MerchantStatusDataEnum } from '@/interfaces/datatable.interface';
import RequestBlocStatusInfo from '../../requests/tables/requestBlocStatusInfo.vue';

// Assuming MerchantResponse type is derived from merchantSchema (z.infer<typeof merchantSchema>)
// For this correction, MerchantResponse is treated as equivalent to MerchantRequest

export const merchantsColumn: ColumnDef<MerchantResponse>[] = [
  // {
  //   accessorKey: 'firstname',
  //   // size: 100,
  //   header: () => h('div', { class: 'text-left text-xs' }, 'Nom'),
  //   cell: ({ row }) => {
  //     const rowOriginal: MerchantResponse = row.original;
  //     return h('div', { class: 'text-left ' }, rowOriginal.first_name);
  //   },
  // },
  // {
  //   accessorKey: 'lastname',
  //   // size: 100,
  //   header: () => h('div', { class: 'text-left text-xs' }, 'Prenoms'),
  //   cell: ({ row }) => {
  //     const rowOriginal: MerchantResponse = row.original;
  //     return h('div', { class: 'text-left ' }, rowOriginal.last_name);
  //   },
  // },
  // {
  //   accessorKey: 'rib',
  //   // size: 100,
  //   header: () => h('div', { class: 'text-left text-xs' }, 'Rib'),
  //   cell: ({ row }) => {
  //     const rowOriginal: MerchantResponse = row.original;
  //     return h('div', { class: 'text-left ' }, rowOriginal.rib);
  //   },
  // },
  {
    accessorKey: 'business_name',
    // size: 100,
    header: () => h('div', { class: 'text-left text-xs' }, "Nom de l'entreprise"),
    cell: ({ row }) => {
      const rowOriginal: MerchantResponse = row.original;
      return h('div', { class: 'text-left ' }, rowOriginal.business_name);
    },
  },
  {
    accessorKey: 'business_type',
    //  size: 500,
    header: () => h('div', { class: 'text-left text-xs' }, 'Type d\'entreprise'),
    cell: ({ row }) => {
      const rowOriginal: MerchantResponse = row.original;
      return h('div', { class: 'text-left ' }, rowOriginal.business_type);
    },
  },
  {
    accessorKey: 'registration_no',
    //  size: 500,
    header: () => h('div', { class: 'text-left text-xs' }, 'N° d\'enregistrement'),
    cell: ({ row }) => {
      const rowOriginal: MerchantResponse = row.original;
      return h('div', { class: 'text-left ' }, rowOriginal.registration_no);
    },
  },
  {
    accessorKey: 'tax_id',
    //  size: 500,
    header: () => h('div', { class: 'text-left text-xs' }, 'Identifiant fiscal'),
    cell: ({ row }) => {
      const rowOriginal: MerchantResponse = row.original;
      return h('div', { class: 'text-left ' }, rowOriginal.tax_id || 'N/A');
    },
  },
  {
    accessorKey: 'address',
     size: 500,
    header: () => h('div', { class: 'text-left text-xs' }, 'Adresse'),
    cell: ({ row }) => {
      const rowOriginal: MerchantResponse = row.original;
      return h('div', { class: 'text-left ' }, rowOriginal.address|| 'N/A');
    },
  },
  {
    accessorKey: 'phone',
    header: () => h('div', { class: 'text-left text-xs' }, 'Téléphone'),
    cell: ({ row }) => {
      const rowOriginal: MerchantResponse = row.original;
      return h(
        'div',
        { class: 'text-left text-neutral-20 text-sm min-w-[150px]' },
        rowOriginal.phone,
      );
    },
  },
  {
    accessorKey: 'email',
    header: () => h('div', { class: 'text-left text-xs' }, 'Email'),
    cell: ({ row }) => {
      const rowOriginal: MerchantResponse = row.original;
      return h(
        'div',
        { class: 'text-left text-neutral-20 text-sm min-w-[150px]' },
        rowOriginal.email,
      );
    },
  },
  {
    accessorKey: 'website',
    header: () => h('div', { class: 'text-left text-xs' }, 'Site Web'),
    cell: ({ row }) => {
      const rowOriginal: MerchantResponse = row.original;
      return h(
        'div',
        { class: 'text-left text-neutral-20 text-sm min-w-[150px]' },
        rowOriginal.website || 'N/A', // Display 'N/A' if website is optional and not provided
      );
    },
  },
    {
      accessorKey: 'status',
      size: 126,
      header: () => h('div', { class: 'text-left text-xs ' }, 'Status'),
      cell: ({ row }) => {
        const rowOriginal = row.original;

        const statusKey = findEnumDataByName(rowOriginal.status, MerchantStatusDataEnum) as keyof typeof MerchantStatusDataEnum;
        const typeInfo = MerchantStatusDataEnum[statusKey];

  
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
      const rowOriginal: MerchantResponse = row.original;
      return h(
        'div',
        { class: 'text-right flex justify-end' },
        h(MerchantActionDropdownBloc, {
          merchant: rowOriginal,
        }),
      );
    },
  },
];