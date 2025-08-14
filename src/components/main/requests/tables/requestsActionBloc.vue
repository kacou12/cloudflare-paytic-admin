<template>
    <div>
        <!-- <CustomButton class="text-xs" variant="default" size="sm"
            @click="$router.push({ name: AppRoute.CLIENT_DETAILS.name, params: { id: id } })">
            <div class="flex items-center">
                <Eye class="w-4 h-4 mr-2"></Eye>
                <span>Examiner</span>
            </div>
        </CustomButton>
         -->
        <RequestValidationModal :request></RequestValidationModal>

    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import RequestValidationModal from '../requestValidationModal.vue';
import type { MerchantRequestResponse } from '@/services/merchant-request/merchant-request.type';

defineProps({
    request: {
        type: Object as PropType<MerchantRequestResponse>,
        required: true,
    }
})

</script>

<style scoped></style>