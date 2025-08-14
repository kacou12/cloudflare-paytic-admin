import { defineStore } from 'pinia'
import { ref } from 'vue'

// Store pour le pays courant
export const useCountryStore = defineStore('country', () => {
  // Vous pouvez remplacer cela par un vrai store (Pinia par exemple)
  const country = ref('FR') // Valeur par défaut

  const setCountry = (newCountry: string) => {
    country.value = newCountry
  }

  return {
    country,
    setCountry,
  }
})
