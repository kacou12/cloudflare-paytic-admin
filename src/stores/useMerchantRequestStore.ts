import type { MerchantRequestFiltersPayload } from '@/services/global.type'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const initialFilters: MerchantRequestFiltersPayload = {
  q: undefined,
  page: 1,
  status: undefined,
  type: undefined,
  limit: 10,
  dates: [new Date(), new Date()], 
}

export const useMerchantRequestStore = defineStore('merchantRequestFilters', () => {
  const q = ref(initialFilters.q)
  const page = ref(initialFilters.page)
  const status = ref(initialFilters.status)
  const type = ref(initialFilters.type)
  const limit = ref(initialFilters.limit)
  const dates = ref(initialFilters.dates) // ref<[Date, Date] | undefined>(initialFilters.dates)

  const route = useRoute()

  watch(
    () => route.name,
    () => {
      if (
        q.value !== initialFilters.q ||
        page.value !== initialFilters.page ||
        status.value !== initialFilters.status ||
        type.value !== initialFilters.type ||
        dates.value !== initialFilters.dates ||
        limit.value !== initialFilters.limit
      ) {
        q.value = initialFilters.q
        page.value = initialFilters.page
        status.value = initialFilters.status
        type.value = initialFilters.type
        dates.value = initialFilters.dates
        limit.value = initialFilters.limit
      }
    },
  )

  return {
    q,
    page,
    status,
    type,
    dates,
    limit,
  }
})
