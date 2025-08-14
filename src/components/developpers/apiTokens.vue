<template>
    <div class="bg-white rounded-lg  my-4">
        <section class="flex justify-between flex-col md:flex-row mb-5 ">
            <div>
                <h2 class="text-xl font-semibold mb-2">Manage API Tokens</h2>
                <p class="text-gray-600 mb-6 text-sm">
                    API tokens allow third-party services. You may revoke any of your existing tokens if they are no
                    longer in use.
                </p>
            </div>
        </section>

        <section class="w-full overflow-x-auto">
            <div class="min-w-[600px]">
                <table class="w-full mb-6 rounded-t-xl">
                    <thead>
                        <tr class="border-b">
                            <th class="py-2 px-4 text-left text-gray-500 font-medium text-sm">Name</th>
                            <th class="py-2 px-4 text-left text-gray-500 font-medium text-sm">Environnement</th>
                            <th class="py-2 px-4 text-left text-gray-500 font-medium text-sm">Token</th>
                            <th class="py-2 px-4 text-left text-gray-500 font-medium text-sm">Statut</th>
                            <th class="py-2 px-4 text-right text-gray-500 font-medium text-sm">Actions</th>
                        </tr>
                    </thead>

                    <Transition name="fade-slide">
                        <tbody v-if="isFetchingMarchant && !marchantData">
                            <tr v-for="i in 3" :key="i" class="border-b">
                                <td class="py-3 px-4">
                                    <Skeleton class="h-4 w-24" />
                                </td>
                                <td class="py-3 px-4">
                                    <Skeleton class="h-4 w-32" />
                                </td>
                                <td class="py-3 px-4">
                                    <Skeleton class="h-4 w-full" />
                                </td>
                                <td class="py-3 px-4">
                                    <Skeleton class="h-4 w-full" />
                                </td>
                                <td class="py-3 px-4">
                                    <div class="flex justify-end gap-2">
                                        <Skeleton class="h-8 w-8 rounded" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>

                        <tbody v-else-if="isFetchedMarchant" class="text-sm">
                            <tr v-if="!marchantData || marchantData.keys.sort((a, b) => {
                                const dateA = new Date(a.created_at);
                                const dateB = new Date(b.created_at);
                                return dateB.getTime() - dateA.getTime(); // dateB - dateA pour le plus récent au plus ancien
                            }).length === 0">
                                <td colspan="5" class="py-4 text-center text-gray-500">No tokens found</td>
                            </tr>
                            <tr v-for="token in marchantData!.keys.sort((a, b) => {
                                const dateA = new Date(a.created_at);
                                const dateB = new Date(b.created_at);
                                return dateB.getTime() - dateA.getTime(); // dateB - dateA pour le plus récent au plus ancien
                            })" :key="token.id" class="border-b">
                                <td class="py-3 px-4">
                                    <p class="truncate">{{ token.name }}</p>
                                </td>
                                <td class="py-3 px-4">
                                    <span
                                        class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                                        {{ token.environment }}
                                    </span>
                                </td>
                                <td class="py-3 px-4 font-mono">
                                    <span>••••••••••••••••••••••••••••••••••••••••••••••</span>
                                </td>
                                <td class="py-3 px-4 font-mono">
                                    <div>
                                        <span :class="`text-xs text-center font-medium px-2 py-[1px] rounded-2xl`"
                                            :style="{
                                                backgroundColor: getStatusKeyData(token.status).color,
                                                color: getStatusKeyData(token.status).textColor
                                            }">
                                            {{ getStatusKeyData(token.status).name }}</span>
                                    </div>
                                </td>
                                <td class="py-3 px-4 text-right">
                                    <div class="flex justify-end gap-2">

                                        <ConfirmModal :confirmHandler="() => toggleTokenStatus(token)"
                                            :confirm-text="token.status === 'active' ? `Voulez vous vraiment desactiver le token ${token.name} ?` : `Voulez vous vraiment activer le token ${token.name} ?`">
                                            <button :class="[
                                                'p-1.5 rounded transition',
                                                token.status === 'active' ? 'bg-red-100 hover:bg-red-200' : 'bg-green-100 hover:bg-green-200'
                                            ]">
                                                <ShieldCloseIcon class="h-4 w-4"
                                                    v-if="token.status === KeyStatusEnum.active"></ShieldCloseIcon>
                                                <ShieldCheck v-else class="h-4 w-4">
                                                </ShieldCheck>

                                            </button>
                                        </ConfirmModal>


                                        <!-- <button @click="toggleTokenStatus(token)" :class="[
                                            'p-1.5 rounded transition',
                                            token.status === 'active' ? 'bg-red-100 hover:bg-red-200' : 'bg-green-100 hover:bg-green-200'
                                        ]">

                                            <ShieldCloseIcon class="h-4 w-4"
                                                v-if="token.status === KeyStatusEnum.active"></ShieldCloseIcon>
                                            <ShieldCheck v-else class="h-4 w-4">
                                            </ShieldCheck>

                                        </button> -->

                                        <ConfirmModal :confirmHandler="() => deleteTokenHandler(token)"
                                            :confirm-text="`Voulez vous vraiment supprimer le token ${token.name} ?`">
                                            <button class="p-1.5 bg-red-100 hover:bg-red-200 rounded transition">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </ConfirmModal>
                                        <!-- <button @click="deleteTokenHandler(token.id)"
                                            class="p-1.5 bg-red-100 hover:bg-red-200 rounded transition">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button> -->
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
import { useDeleteKeyMutation, useUpdateKeyMutation } from '@/composables/queries/useKeyQueries'; // Import new mutation
import { useMerchantQuery } from '@/composables/queries/useMerchantQueries';
import { KeyStatusDataEnum } from '@/interfaces/datatable.interface';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { useRoute } from 'vue-router';
import Skeleton from '../ui/skeleton/Skeleton.vue';
import { KeyStatusEnum } from '@/constants/constant.enum';
import {
    ShieldCloseIcon,
    ShieldCheck
} from 'lucide-vue-next'
import ConfirmModal from '../modals/confirmModal.vue';
import { useToast } from 'vue-toastification';
import type { Key } from '@/services/merchants/merchant-type';

const route = useRoute();
const toast = useToast();
const { startLoading } = useLoaderStore();

const { mutateAsync: deleteKey } = useDeleteKeyMutation(route.params.id as string);
const { mutateAsync: toggleKeyStatus } = useUpdateKeyMutation(route.params.id as string); // New mutation
const { isFetched: isFetchedMarchant, data: marchantData, isFetching: isFetchingMarchant } = useMerchantQuery(route.params.id as string);

const copyToken = (token: string) => {
    navigator.clipboard.writeText(token);
};

function findKeyStatusDataEnumByName(searchName: string) {
    if (!searchName) return null

    const normalizedSearch = searchName
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')

    for (const [key, value] of Object.entries(KeyStatusDataEnum)) {
        const normalizedName = value.enumName
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')

        if (normalizedName === normalizedSearch) {
            return key
        }
    }

    return null
}

const getStatusKeyData = (status: string) => {
    const statusKey = findKeyStatusDataEnumByName(status) as keyof typeof KeyStatusDataEnum;
    const typeInfo = KeyStatusDataEnum[statusKey];
    return typeInfo;
}

const deleteTokenHandler = async (token: Key) => {
    startLoading();
    await deleteKey(token.id);
    toast.success(`Le token ${token.name} a bien été supprimé`);

};

const toggleTokenStatus = async (token: any) => {
    startLoading();
    const newStatus = token.status === KeyStatusEnum.active ? KeyStatusEnum.revoked : KeyStatusEnum.active;
    await toggleKeyStatus({ data: { status: newStatus }, key_id: token.id });
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