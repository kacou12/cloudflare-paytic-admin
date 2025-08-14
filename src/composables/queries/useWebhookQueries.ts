import { computed, ref, watch } from 'vue'
import {
  fetchFiltersWebhook,
  createWebhook,
  updateWebhook,
  deleteWebhook,
  fetchWebhookById,
} from '@/services/webhook/webhook-service'
import type {
  WebhookPayload,
  WebhookRequest,
  WebhookResponse,
} from '@/services/webhook/webhook-type'
import { useWebhookFiltersStore } from '@/stores/useWebhookStore'
import { storeToRefs } from 'pinia'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { webhookQueryKeys } from '@/services/webhook/webhook-query-keys'
import { merchantsQueryKeys } from '@/services/merchants/merchant-query-keys'

const useFilters = storeToRefs(useWebhookFiltersStore())

export function useWebhookFiltersQuery() {
  const queryClient = useQueryClient()

  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: webhookQueryKeys.webhookFilters({
        page: useFilters.page.value,
        q: useFilters.q.value,
        environment: useFilters.environment.value,
        merchant_id: useFilters.merchant_id.value,
        size: useFilters.size.value,
      }),
    })
  }

  const query = useQuery({
    queryKey: computed(() =>
      webhookQueryKeys.webhookFilters({
        page: useFilters.page.value,
        q: useFilters.q.value,
        environment: useFilters.environment.value,
        merchant_id: useFilters.merchant_id.value,
        size: useFilters.size.value,
      }),
    ),

    queryFn: ({ signal }) =>
      fetchFiltersWebhook({
        page: useFilters.page.value,
        q: useFilters.q.value,
        environment: useFilters.environment.value,
        merchant_id: useFilters.merchant_id.value,
        size: useFilters.size.value,
      }),
  })
  // si les autres filtre a part la page change , on reset la page courante
  watch(
    () => ({
      // page: useFilters.page.value,
      q: useFilters.q.value,
      environment: useFilters.environment.value,
      merchant_id: useFilters.merchant_id.value,
      size: useFilters.size.value,
    }),
    () => {
      useFilters.page.value = 1
      query.refetch()
    },
    { deep: true },
  )

  return {
    ...query,
    invalidateQuery,
    // filters,
  }
}

export function useCreateWebhook(merchant_id:string) {
 const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (values: WebhookRequest) => createWebhook(values),

    onSuccess: () => {
      console.log('create web hook successfully')

      queryClient.invalidateQueries({ queryKey: merchantsQueryKeys.merchant({id:merchant_id}) })
    },
  })
}

export function useWebhookQuery(id: string) {
  return useQuery({
    queryKey: computed(() => webhookQueryKeys.webhook(id)),
    queryFn: ({ signal }) => fetchWebhookById(id),
    enabled: false,
  })
}

export function useCreateWebhookMutation(merchant_id:string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (values: WebhookRequest) => createWebhook(values),

    onSuccess: () => {
      console.log('create web hook successfully')

      queryClient.invalidateQueries({ queryKey: merchantsQueryKeys.merchant({id:merchant_id}) })
    },
  })
}

export function useUpdateWebhookMutation(id: string) {
  const { invalidateQuery } = useWebhookFiltersQuery()
  return useMutation({
    mutationFn: (payload: WebhookPayload) => updateWebhook(id, payload),

    onSuccess: () => {
      console.log('update web hook successfully')

      invalidateQuery()
    },
  })
}

export function useDeleteWebhookMutation(merchant_id:string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteWebhook(id),

    onSuccess: () => {
      console.log('delete web hook  successfully')
      queryClient.invalidateQueries({ queryKey: merchantsQueryKeys.merchant({id:merchant_id}) })
    },
  })
}
