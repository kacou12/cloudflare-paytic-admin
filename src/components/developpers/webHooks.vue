<template>
    <div class="bg-white rounded-lg shadow-md p-6 my-4">
        <section class="flex justify-between flex-col md:flex-row mb-5">
            <div>
                <h2 class="text-xl font-semibold mb-2">Webhooks</h2>
                <p class="text-gray-600 mb-6 text-sm">
                    Create and manage your webhooks.
                </p>
            </div>
        </section>

        <section class="w-full overflow-x-auto">
            <div class="min-w-[600px]">
                <table class="w-full mb-6 rounded-t-xl">
                    <thead>
                        <tr class="border-b">
                            <th class="py-2 text-left text-gray-500 font-medium text-sm">Name</th>
                            <th class="py-2 text-left text-gray-500 font-medium text-sm">Environnement</th>
                            <th class="py-2 text-left text-gray-500 font-medium text-sm">URL</th>
                            <th class="py-2 text-left text-gray-500 font-medium text-sm">Secret key</th>
                            <th class="py-2 text-right text-gray-500 font-medium text-sm">Actions</th>
                        </tr>
                    </thead>

                    <Transition name="fade-slide" mode="out-in">
                        <tbody v-if="isFetchingMarchant && !marchantData">
                            <tr v-for="i in 3" :key="i" class="border-b">
                                <td class="py-3">
                                    <Skeleton class="h-4 w-5/6" />
                                </td>
                                <td class="py-3">
                                    <Skeleton class="h-4 w-5/6" />
                                </td>
                                <td class="py-3">
                                    <Skeleton class="h-4 w-full" />
                                </td>
                                <td class="py-3">
                                    <Skeleton class="h-4 w-3/4" />
                                </td>
                                <td class="py-3">
                                    <div class="flex justify-end gap-2">
                                        <!-- <Skeleton class="h-8 w-8 rounded" /> -->
                                        <Skeleton class="h-8 w-8 rounded" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>

                        <tbody v-else-if="marchantData" class="text-sm">
                            <tr v-if="marchantData.webhooks.sort((a, b) => {
                                const dateA = new Date(a.created_at);
                                const dateB = new Date(b.created_at);
                                return dateB.getTime() - dateA.getTime(); // dateB - dateA pour le plus récent au plus ancien
                            }).length === 0">
                                <td colspan="4" class="py-4 text-center text-gray-500">No webhooks found</td>
                            </tr>
                            <tr v-for="webhook in marchantData.webhooks" :key="webhook.id" class="border-b">
                                <td class="py-3 font-mono text-sm">
                                    <span>{{ webhook.name }}</span>
                                </td>
                                <td class="py-3 ">
                                    <span
                                        class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                                        {{ webhook.environment }}
                                    </span>
                                </td>
                                <td class="py-3 font-mono">
                                    <p class="truncate">{{ webhook.url }}</p>
                                </td>

                                <td class="py-3  font-mono">
                                    <span>••••••••••••••••••••••••••••••••••••••••••••••</span>
                                </td>

                                <td class="py-3 px-4 text-right">
                                    <div class="flex justify-end gap-2">
                                        <button @click="copyToken(webhook.secret)"
                                            class="p-1.5 bg-gray-100 hover:bg-gray-200 rounded transition">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Transition>
                </table>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { useMerchantQuery } from '@/composables/queries/useMerchantQueries';
import { useDeleteWebhookMutation } from '@/composables/queries/useWebhookQueries';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { useRoute } from 'vue-router';
// import WebHooksModal from './modals/webHooksModal.vue';
import Skeleton from '../ui/skeleton/Skeleton.vue';

const route = useRoute();
const { startLoading } = useLoaderStore();

const { mutateAsync: deleteWebhook } = useDeleteWebhookMutation(route.params.id as string);
const { data: marchantData, isFetching: isFetchingMarchant } = useMerchantQuery(route.params.id as string);

const copyToken = (token: string) => {
    navigator.clipboard.writeText(token);
    // Optionnel : ajouter une notification pour l'utilisateur
};

const deleteWebhookHandler = async (id: string) => {
    startLoading();
    await deleteWebhook(id);
};
</script>

<style scoped>
/* Animation de fade et slide */
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.3s ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateX(-10px);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateX(10px);
}

/* Styles pour le défilement horizontal */
.overflow-x-auto {
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
}

.overflow-x-auto::-webkit-scrollbar {
    height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
    background-color: #cbd5e0;
    border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
    background-color: #edf2f7;
    border-radius: 4px;
}
</style>