<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div :class="cn('flex flex-col items-center gap-y-1.5 px-6 text-center sm:text-left min-h-16', props.class)">
    <slot />
  </div>
</template>
