<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
   <div class="relative w-full overflow-auto rounded-t-xl  xl:max-w-[calc(100vw-356px)]">
    <table :class="cn('w-full caption-bottom text-sm', props.class)">
      <slot />
    </table>
  </div>
</template>
