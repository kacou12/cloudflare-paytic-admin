import type { TransactionFiltersPayload } from '@/services/global.type' // Assurez-vous que ce type est mis à jour
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

// Définition des filtres initiaux avec les nouveaux champs
const initialFilters: TransactionFiltersPayload = {
  q: undefined,
  page: 1,
  status: undefined,
  type: undefined,
  operator: undefined,
  dates: [new Date(), new Date()], // [Date, Date] ou undefined
  limit: 10,
}

export const useTransactionFiltersStore = defineStore('Transactionfilters', () => {
  // Déclarations des refs pour les champs spécifiés
  const q = ref(initialFilters.q)
  const page = ref(initialFilters.page)
  const status = ref(initialFilters.status)
  const type = ref(initialFilters.type)
  const operator = ref(initialFilters.operator)
  const dates = ref(initialFilters.dates) // ref<[Date, Date] | undefined>(initialFilters.dates)
  const limit = ref(initialFilters.limit)

  const route = useRoute()

  // Surveillance du changement de route pour réinitialiser uniquement les champs spécifiés
  watch(
    () => route.name,
    () => {
      // Vérifie si l'un des champs est différent de sa valeur initiale
      // et les réinitialise si c'est le cas.
      if (
        q.value !== initialFilters.q ||
        page.value !== initialFilters.page ||
        status.value !== initialFilters.status ||
        type.value !== initialFilters.type ||
        operator.value !== initialFilters.operator ||
        // Pour les dates, une comparaison plus complexe peut être nécessaire si les objets Date sont différents
        // mais représentent la même période. Pour l'instant, une simple comparaison de référence est suffisante
        // si initialFilters.dates est toujours undefined ou une nouvelle instance.
        dates.value !== initialFilters.dates ||
        limit.value !== initialFilters.limit
      ) {
        q.value = initialFilters.q
        page.value = initialFilters.page
        status.value = initialFilters.status
        type.value = initialFilters.type
        operator.value = initialFilters.operator
        dates.value = initialFilters.dates
        limit.value = initialFilters.limit
      }
    },
    // Vous pouvez ajouter { immediate: true } si vous voulez que le watch s'exécute au montage initial
    // { immediate: true }
  )

  // Retourne uniquement les champs spécifiés
  return {
    q,
    page,
    status,
    type,
    operator,
    dates,
    limit,
  }
})
