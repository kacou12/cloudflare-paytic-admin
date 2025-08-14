<!-- HexagonCard.vue -->
<template>
    <div class="bg-white p-4 relative">
      <!-- Close button -->
      <div class="absolute top-0 right-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6l12 12" stroke="#000" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
  
      <!-- Hexagon pattern -->
      <div class="flex flex-wrap -ml-4 -mt-8">
        <div 
          v-for="i in 35" 
          :key="i"
          :class="[
            'relative',
            'ml-[-0.75rem]',
            i % 2 === 0 ? '-mt-4' : ''
          ]"
        >
          <svg
            class="w-8 h-9"
            viewBox="0 0 37 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.1631 0.954224L35.9981 11.2509V31.8451L18.1631 42.1417L0.328125 31.8451V11.2501L18.1631 0.954224Z"
              :fill="i % 5 === 0 ? '#DDDDDD' : 'transparent'"
              :fill-opacity="i % 5 === 0 ? '0.270588' : '0'"
              stroke="#DDDDDD"
              stroke-width="0.296556"
            />
          </svg>
        </div>
      </div>
  
      <!-- Card content -->
      <div class="mt-16 p-8 bg-white rounded-3xl shadow-sm">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-full flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09998 22C7.78998 22.05 6.79998 20.68 5.95998 19.47C4.24998 17 2.93998 12.45 4.69998 9.39C5.56998 7.87 7.12998 6.91 8.81998 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
            </svg>
          </div>
          <div>
            <div class="text-gray-500 text-sm">Apple card</div>
            <div class="text-2xl font-semibold mt-1">15 450 F CFA</div>
          </div>
        </div>
        <div class="mt-8 text-xl font-semibold">Code de la recharge</div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // Vous pouvez ajouter des props si nécessaire
  // const props = defineProps<{
  //   amount: number
  // }>()
  
  // Vous pouvez ajouter des émetteurs d'événements si nécessaire
  // const emit = defineEmits<{
  //   (event: 'close'): void
  // }>()
  </script>