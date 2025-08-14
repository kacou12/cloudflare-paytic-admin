<template>
    <div class="flex gap-2">
        <p>{{ phoneNumber }}</p>
        <CommonClipBoard :data-to-copy="phoneNumber!">
        </CommonClipBoard>
    </div>
</template>

<script setup lang="ts">
import CommonClipBoard from '@/components/common/commonClipBoard.vue';

defineProps({
    phoneNumber: {
        type: String
    }
})

</script>

<style scoped></style>