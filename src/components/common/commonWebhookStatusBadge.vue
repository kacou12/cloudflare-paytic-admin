<template>
    <span v-if="isActive"
        class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-md ">actif</span>
    <span v-else class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-md ">Inactif</span>
</template>

<script setup lang="ts">
defineProps({
    isActive: {
        type: Boolean,
        required: true
    }
})

</script>

<style scoped></style>