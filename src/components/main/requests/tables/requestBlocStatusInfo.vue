<template>
    <span :class="`text-xs text-center font-medium px-2 py-[1px] rounded-2xl`" :style="{
        backgroundColor: status.color,
        color: status.textColor
    }">
        {{ status.name }}</span>
</template>

<script setup lang="ts">
import { MerchantRequestTypeEnum } from '@/constants/constant.enum';
import type { PropType } from 'vue';

defineProps({
    status: {
        type: Object as PropType<{
            name: string;
            color: string;
            textColor: string;
        }>,
        required: true

    }
})

</script>

<style scoped></style>