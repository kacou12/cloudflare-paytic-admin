<template>

    <div v-if="type === 'up'"
        :class="[showBackground ? 'bg-success-light-3 ' : '', 'px-1.5 py-0.5 h-fit rounded-2xl  text-success-dark text-xs font-medium  flex gap-0.5 items-center']">
        <svg v-if="showBackground" width="8" height="10" viewBox="0 0 8 10" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M4 9V1V9ZM4 1L7 4L4 1ZM4 1L1 4L4 1Z" fill="#388E3C" />
            <path d="M4 9V1M4 1L7 4M4 1L1 4" stroke="#388E3C" stroke-width="1.68" stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>

        <svg v-else class="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.99984 15.8333V4.16667M9.99984 4.16667L4.1665 10M9.99984 4.16667L15.8332 10" stroke="#388E3C"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span>{{ value }}%</span>
    </div>
</template>

<script setup lang="ts">
import type { Prop, PropType } from 'vue';

const props = defineProps({
    value: {
        type: Number,

    },
    type: {
        type: String as PropType<"up" | "down">,
        default: "up"
    },
    showBackground: {
        type: Boolean,
        default: true
    }
})

</script>

<style scoped></style>