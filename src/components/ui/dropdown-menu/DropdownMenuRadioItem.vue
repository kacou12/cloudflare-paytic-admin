<script setup lang="ts">
import { cn } from '@/lib/utils'
import { CheckIcon } from 'lucide-vue-next'
import {
  DropdownMenuItemIndicator,
  DropdownMenuRadioItem,
  type DropdownMenuRadioItemEmits,
  type DropdownMenuRadioItemProps,
  useForwardPropsEmits,
} from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<DropdownMenuRadioItemProps & { class?: HTMLAttributes['class'] }>()

const emits = defineEmits<DropdownMenuRadioItemEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DropdownMenuRadioItem v-bind="forwarded" :class="cn(
    'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    props.class,
  )">
    <span class="absolute right-2 flex h-5 w-5 items-center justify-center">
      <DropdownMenuItemIndicator>
        <CheckIcon :size="18" class="text-primary" />
      </DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuRadioItem>
</template>
