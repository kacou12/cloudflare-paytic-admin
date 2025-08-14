<template>
  <SelectTrigger v-bind="forwardedProps" :class="cn(
    'flex h-10   items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background  data-[placeholder]:text-neutral-30 focus:outline-none focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:truncate text-start ',
    props.class,
  )">
    <slot />
    <SelectIcon as-child>
      <ChevronDown class=" text-[#525866] w-4 h-4  shrink-0 ml-2" />
    </SelectIcon>
  </SelectTrigger>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-vue-next'
import { SelectIcon, SelectTrigger, type SelectTriggerProps, useForwardProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<SelectTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<style scoped>
.selectParent button[data-state='open'] svg {
  @apply -rotate-180 transition-all duration-300;
}

.selectParent button[data-state='close'] svg {
  @apply -rotate-180 transition-all duration-300;
}
</style>