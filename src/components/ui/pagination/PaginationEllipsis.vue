<script setup lang="ts">
import { cn } from '@/lib/utils'
import { MoreHorizontal } from 'lucide-vue-next'
import { PaginationEllipsis, type PaginationEllipsisProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<PaginationEllipsisProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <PaginationEllipsis v-bind="delegatedProps"
    :class="cn('w-5 h-5 flex items-center justify-center text-neutral-40', props.class)">
    <slot>
      <MoreHorizontal :size="14" />
    </slot>
  </PaginationEllipsis>
</template>
