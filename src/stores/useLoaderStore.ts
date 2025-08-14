import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useLoaderStore = defineStore('loader', () => {
  const isLoading = ref(false)
  const isLoadingSkeleton = ref(false)

  const startLoadingSkeleton = () => {
    isLoadingSkeleton.value = true
  }

  const stopLoadingSkeleton = () => {
    setTimeout(() => {
      isLoadingSkeleton.value = false
    }, 3000)
  }

  const startLoading = () => {
    isLoading.value = true
  }

  const stopLoading = () => {
    setTimeout(() => {
      isLoading.value = false
    }, 3000)
  }

  return {
    isLoading,
    startLoading,
    stopLoading,
    isLoadingSkeleton,
    startLoadingSkeleton,
    stopLoadingSkeleton,
  }
})
