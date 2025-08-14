import type { DefaultFiltersPayload } from '@/services/global.type'
import { usersQueryKeys } from '@/services/user/user.query-keys'
import {
  createUser,
  deleteUser,
  fetchFiltersUsers,
  fetchUserById,
  updateUser,
} from '@/services/user/user.service'
import type { UserRequest, UserUpdatePayload } from '@/services/user/user.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, reactive, watch } from 'vue'

export function useUsersFiltersQuery(limit?: number) {
  const queryClient = useQueryClient()
  const initialFilters: DefaultFiltersPayload = {
    q: undefined,
    page: 1,
    limit,
  }

  const filters = reactive<DefaultFiltersPayload>({
    ...initialFilters,
  })

  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: usersQueryKeys.usersFilters({
        ...filters,
        // merchant_id: merchant.value?.id,
        // role: role.value,
      }),
    })
  }

  const query = useQuery({
    queryKey: computed(() =>
      usersQueryKeys.usersFilters({
        ...filters,
        // merchant_id: merchant.value?.id,
        // role: role.value,
      }),
    ),
    queryFn: ({ signal }) => fetchFiltersUsers(filters),
  })

  // si les autres filtre a part la page change , on reset la page courante
  watch(
    () => ({
      q: filters.q,
    }),
    () => {
      filters.page = 1
      query.refetch()
    },
    { deep: true },
  )

  return {
    ...query,
    filters,
    invalidateQuery,
  }
}

export function useUserQuery(id: string) {
  return useQuery({
    queryKey: computed(() => usersQueryKeys.user({ id })),
    queryFn: ({ signal }) => fetchUserById({ id }),
    enabled: false,
  })
}

export function useCreateUserMutation() {
  const { invalidateQuery } = useUsersFiltersQuery()
  return useMutation({
    mutationFn: (values: UserRequest) => createUser({ data: values }),

    onSuccess: () => {
      console.log('create user successfully')

      invalidateQuery()
    },
  })
}

export function useUpdateUserMutation(id: string) {
  const { invalidateQuery } = useUsersFiltersQuery()
  return useMutation({
    mutationFn: (payload: UserUpdatePayload) => updateUser({ id, data: payload }),

    onSuccess: () => {
      console.log('update user successfully')

      invalidateQuery()
    },
  })
}

export function useDeleteUserMutation(id: string) {
  const { invalidateQuery } = useUsersFiltersQuery()
  return useMutation({
    mutationFn: () => deleteUser({ id }),

    onSuccess: () => {
      console.log('delete user successfully')

      invalidateQuery()
    },
  })
}
