<template>
    <div>
        <CustomButton class="text-xs" variant="default" size="sm"
            @click="$router.push({ name: AppRoute.CLIENT_DETAILS.name, params: { id: id } })">
            <div class="flex items-center">
                <Eye class="w-4 h-4 mr-2"></Eye>
                <span>Voir</span>
            </div>
        </CustomButton>

    </div>
</template>

<script setup lang="ts">
import CustomButton from '@/components/buttons/customButton.vue';
import { AppRoute } from '@/constants/app-route';
import { Eye } from 'lucide-vue-next';

defineProps({
    id: {
        type: String,
        required: true,
    }
})

</script>

<style scoped></style>