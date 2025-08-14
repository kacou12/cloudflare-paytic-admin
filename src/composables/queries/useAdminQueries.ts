import { useMutation, useQuery } from '@tanstack/vue-query'
import { computed, reactive, watch } from 'vue'
import { fetchAdminByIdApi } from '@/services/admin/admin-api'
import { adminQueryKeys } from '@/services/admin/admin-query-keys'
import { createAdmin, fetchFiltersAdmins, updateAdmin } from '@/services/admin/admin-service'
import type {
  AdminFiltersPayload,
  AdminRequest,
  AdminUpdatePayload,
} from '../../services/admin/admin-type'
import { storeToRefs } from 'pinia'
import { useCountryStore } from '../useCountryStore'
import { useLoaderStore } from '../../stores/useLoaderStore'

// export function useAdminsQuery() {
//   const currentPage = ref(1)

//   const query = useQuery({
//     // queryKey: computed(() => adminQueryKeys.adminPagination(page.value)),
//     queryKey: computed(() => adminQueryKeys.adminPagination(currentPage.value)),
//     queryFn: ({ signal }) => fetchAdmins(currentPage.value),
//   })
//   return {
//     ...query,
//     currentPage,
//   }
// }
const { country } = storeToRefs(useCountryStore())
export function useAdminsFiltersQuery() {
  const { stopLoadingSkeleton } = useLoaderStore()
  const initialFilters: AdminFiltersPayload = {
    searchText: '',
    page: 1,
  }

  const filters = reactive<AdminFiltersPayload>({
    ...initialFilters,
  })

  const query = useQuery({
    queryKey: computed(() =>
      adminQueryKeys.adminFilters({
        ...filters,
        country: country.value,
      }),
    ),

    queryFn: ({ signal }) => fetchFiltersAdmins(filters),
  })
  // si les autres filtre a part la page change , on reset la page courante
  watch(
    () => ({
      searchText: filters.searchText,
    }),
    () => {
      filters.page = 1
    },
    { deep: true },
  )

  return {
    ...query,
    filters,
  }
}

export function useAdminQuery(id: string) {
  return useQuery({
    queryKey: computed(() => adminQueryKeys.admin({ id, country: country.value })),
    queryFn: ({ signal }) => fetchAdminByIdApi({ id }),
    enabled: false,
  })
}
// export function useUpdateAdminMutation(id: string) {
//   return useMutation({
//     mutationFn: (values: AdminRequest) => createAdmin(values),
//     // onSuccess: () => {
//     //   router.push({ name: AppRoute.USER })
//     // },
//   })
// }

export function useCreateAdminMutation() {
  return useMutation({
    mutationFn: (values: AdminRequest) => createAdmin(values),
    // onSuccess: () => {
    //   router.push({ name: AppRoute.USER })
    // },
  })
}
export function useUpdateAdminMutation(id: string) {
  return useMutation({
    mutationFn: (values: AdminUpdatePayload) => updateAdmin({ id, data: values }),
    // onSuccess: () => {
    //   router.push({ name: AppRoute.USER })
    // },
  })
}
