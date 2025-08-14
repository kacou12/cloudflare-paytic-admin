<template>
    <div class="flex gap-3 items-center">

        <AdminConfirmModal :id="admin.id" :default-active="testSwicth" :confirm-handler="confirmHandler">
        </AdminConfirmModal>

        <section class="flex items-center gap-2 font-publicsans cursor-pointer"
            @click="$router.push({ name: 'administration-user', params: { id: admin.id } })">

            <img class="w-11 h-11 rounded-full" :src="(admin.profilePhoto as string)" alt="User" />
            <section class="flex flex-col gap-1">
                <p class="text-sm text-neutral-10 font-medium">{{ admin.firstName }} {{ admin.lastName }}</p>
                <p class="text-sm text-neutral-20">+225 0787995058</p>
            </section>
        </section>
        <section>

        </section>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AdminConfirmModal from './adminConfirmModal.vue';
import type { PropType } from 'vue';
import type { AdminResponse } from '@/services/admin/admin-type';
import { useUpdateAdminMutation } from '@/composables/queries/useAdminQueries';
const { admin } = defineProps({
    admin: {
        required: true,
        type: Object as PropType<AdminResponse>
    }

})
const testSwicth = ref(false);

const { mutateAsync: updateAdminMutate, isPending, isSuccess } = useUpdateAdminMutation(admin.id)

// TODO: update admin
const confirmHandler = async () => {
    await updateAdminMutate({ isActive: !admin.isActive });
    testSwicth.value = !testSwicth.value;
}



</script>

<style scoped></style>