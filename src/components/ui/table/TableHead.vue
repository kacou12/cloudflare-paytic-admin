<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <!--  text-muted-foreground -->
  <th
    :class="cn('h-12 px-4 text-left text-neutral-10 align-middle font-medium [&:has([role=checkbox])]:pr-0', props.class)">
    <slot />
  </th>
</template>
