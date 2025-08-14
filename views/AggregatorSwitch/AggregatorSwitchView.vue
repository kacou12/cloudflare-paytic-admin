<!-- prevelement (transfert d'argent): cash_in

depot (collecte): cash_out  -->
<template>

    <div class="px-4 bg-white">

        <header class="flex justify-between items-center">
            <div class="mb-6 space-y-1">

                <h1 class="text-xl font-bold font-merriweathersans leading-6 text-black">Switch des agrégrateurs</h1>
                <p class="text-neutral-30 text-sm font-normal">Commissions facturées aux utilisateurs et aux partenaires
                </p>
            </div>

            <div>
                <notification-icon></notification-icon>
            </div>
        </header>

        <main v-if="isFetched && serviceAvailabilitiesData!.total > 0">
            <!-- Aggregator sectiosn -->
            <div v-if="isFetched"
                class="grid grid-cols-1 sm:grid-cols-2 xl:flex justify-between my-4 gap-5 2xl:gap-10 ">
                <AggregatorSwitchCard v-for="item in serviceAvailabilitiesData!.items" :key="item.id"
                    :service-availability="item"></AggregatorSwitchCard>
            </div>

            <!-- Swicth Network -->
            <div v-if="isFetched">
                <SwitchByNetwork :service-availabilities="serviceAvailabilitiesData!.items"></SwitchByNetwork>
            </div>

            <!-- Trafic des utilisateurs par reseau -->
            <div v-if="isFetched" class="my-8">

                <SwitchNetworksAction :service-availabilities="serviceAvailabilitiesData!.items"></SwitchNetworksAction>
            </div>

        </main>
        <main v-else-if="isFetched && serviceAvailabilitiesData!.total === 0"
            class="h-[700px] flex justify-center items-center">
            <p class="text-sm text-neutral-20 ">Veuillez ajouter des providers pour ce pays </p>
        </main>




    </div>
</template>

<script setup lang="ts">
import AggregatorSwitchCard from '@/components/aggregatorSwitch/aggregatorSwitchCard.vue';
import SwitchByNetwork from '@/components/aggregatorSwitch/switchByNetwork.vue';
import SwitchNetworksAction from '@/components/aggregatorSwitch/switchNetworksAction.vue';
import notificationIcon from '@/components/svg/notificationIcon.vue';
import { useProviderServiceAvailibilitiesQuery } from '@/composables/queries/useProviderQueries';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { storeToRefs } from 'pinia';
import { computed, nextTick, watch } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const { data: serviceAvailabilitiesData, isFetched, isLoading, isSuccess, isFetching, invalidateQuery } = useProviderServiceAvailibilitiesQuery();
const { startLoadingSkeleton, stopLoadingSkeleton } = useLoaderStore();

// const sortServicecAvailabilitiesItems = computed(() => {
//     if (isFetched.value && serviceAvailabilitiesData.value?.total === 0) return [];
//     const tets = [...serviceAvailabilitiesData.value!.items].sort((a, b) => a.provider!.operator.toLowerCase().localeCompare(b.provider!.operator.toLowerCase()));

//     return [...serviceAvailabilitiesData.value!.items].sort((a, b) => a.provider!.operator.toLowerCase().localeCompare(b.provider!.operator.toLowerCase()));

// })







</script>

<style scoped></style>