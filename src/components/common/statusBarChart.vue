<template>
    <div class="flex flex-col gap-4">
        <div class="flex gap-1 h-2 ">
            <div class="bg-success-500 rounded-[2px]" :style="{ width: `${approvedWidth}%` }"></div>
            <div class="bg-amber-500 rounded-[2px]" :style="{ width: `${pendingWidth}%` }"></div>
            <div class="bg-error-500 rounded-[2px]" :style="{ width: `${rejectedWidth}%` }"></div>
        </div>
        <div class="flex gap-2">
            <div class='flex justify-left  items-center '> <span
                    class='flex w-[8px] h-[8px] me-1 bg-success-500 rounded-full'></span>
                <p class="text-[10px] xl:text-xs"> Approuvées </p>
            </div>

            <div class='flex justify-left  items-center '> <span
                    class='flex w-[8px] h-[8px] me-1 bg-amber-500 rounded-full'></span>
                <p class="text-[10px] xl:text-xs"> En attente </p>
            </div>

            <div class='flex justify-left items-center '> <span
                    class='flex w-[8px] h-[8px] me-1 bg-error-500 rounded-full'></span>
                <p class="text-[10px] xl:text-xs"> Rejetées </p>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    approved: number;
    pending: number;
    rejected: number;
}

const props = withDefaults(defineProps<Props>(), {
    approved: 0,
    pending: 0,
    rejected: 0
})

const total = computed(() => props.approved + props.pending + props.rejected)

const approvedWidth = computed(() => (props.approved / total.value) * 100)
const pendingWidth = computed(() => (props.pending / total.value) * 100)
const rejectedWidth = computed(() => (props.rejected / total.value) * 100)
</script>

<style scoped></style>