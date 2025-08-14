import type { WebhookFiltersPayload } from '@/services/global.type'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const initialFilters: WebhookFiltersPayload = {
  q: undefined,
  page: 1,
  environment: undefined,
  merchant_id: undefined,
  size: 10,
}

export const useWebhookFiltersStore = defineStore('webhookFilters', () => {
  const q = ref(initialFilters.q)
  const page = ref(initialFilters.page)
  const environment = ref(initialFilters.environment)
  const merchant_id = ref(initialFilters.merchant_id)
  const size = ref(initialFilters.size)

  const route = useRoute()

  watch(
    () => route.name,
    (n, o) => {
      if (
        q.value != initialFilters.q ||
        page.value != initialFilters.page ||
        environment.value != initialFilters.environment ||
        merchant_id.value != initialFilters.merchant_id ||
        size.value != initialFilters.size
      ) {
        q.value = initialFilters.q
        page.value = initialFilters.page
        environment.value = initialFilters.environment
        merchant_id.value = initialFilters.merchant_id
        size.value = initialFilters.size
      }
    },
  )

  return {
    q,
    page,
    environment,
    merchant_id,
    size,
  }
})
