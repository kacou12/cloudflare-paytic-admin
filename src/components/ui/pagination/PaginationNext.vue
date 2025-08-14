<script setup lang="ts">
import {
  Button,
} from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronRight, ArrowRight } from 'lucide-vue-next'
import { PaginationNext, type PaginationNextProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = withDefaults(defineProps<PaginationNextProps & { class?: HTMLAttributes['class'] }>(), {
  asChild: true,
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <PaginationNext v-bind="delegatedProps">
    <Button :class="cn(' h-10 p-2', props.class)" variant="outline">
      <slot>
        <div class="flex items-center gap-2">

          <span>Suivant</span>
          <!-- <ArrowRight class="h-4 w-4" /> -->
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.3335 6H14.6668M14.6668 6L9.66683 11M14.6668 6L9.66683 1" stroke="#666666" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" />
          </svg>


        </div>
      </slot>
    </Button>
  </PaginationNext>
</template>
