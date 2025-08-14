<template>
    <div class="px-4 bg-white">

        <header class="flex justify-between items-center">
            <div class="mb-6 space-y-1">

                <h1 class="text-md xl:text-xl font-bold font-merriweathersans leading-6 text-black">Taux par aggrégateur
                </h1>
                <p class="text-neutral-30 text-sm font-normal">Gestion des taux par aggregateurs</p>
            </div>

            <div>
                <notification-icon></notification-icon>
            </div>
        </header>




        <div class="h-[1px] bg-neutral-70 my-5"></div>

        <section class="flex flex-col sm:flex-row justify-end ">
            <!-- <SearchBar v-model="filters.q" class="w-full sm:w-[28%] sm:my-0 my-5"></SearchBar> -->
            <!-- <div class="my-5">

                <AddIssuerProviderRateModal :is-fetched-issuer="isFetchedIssuer"
                    :is-fetched-provider="isFetchedProvider" :issuers-elements="issuersElements"
                    :providers-elements="providersElements"></AddIssuerProviderRateModal>

            </div> -->

        </section>

        <!-- providers table -->
        <!-- <CommonDataTable :page-size="100" :default-page="filters.page" :dynamic-width-columns="false"
            :total="issuersProviderRateData?.length ?? 0" :columns="issuersProviderRateColumn"
            :data="issuersProviderRateData ?? []" @prev-page="prevPage" @next-page="nextPage" @go-to-page="goToPage">
        </CommonDataTable> -->
        <CommonDataTable :page-size="100" :default-page="filters.page" :dynamic-width-columns="false"
            :total="issuersProviderRateData?.total ?? 0" :columns="issuersProviderRateColumn"
            :data="groupedIssuersProviderRateData ?? []" @prev-page="prevPage" @next-page="nextPage"
            @go-to-page="goToPage">
        </CommonDataTable>

    </div>
</template>

<script setup lang="ts">
import CommonDataTable from '@/components/common/commonDataTable.vue';
import { issuersProviderRateColumn } from '@/components/main/issuersProviderRate/tables/issuersProviderRateColumn';
import AddIssuerProviderRateModal from '@/components/modals/addIssuerProviderRateModal.vue';
import notificationIcon from '@/components/svg/notificationIcon.vue';
import { useIssuerProviderRateFiltersQuery } from '@/composables/queries/useIssuerProviderRateQueries';
import { useIssuersFiltersQuery } from '@/composables/queries/useIssuerQueries';
import { useProvidersFiltersQuery } from '@/composables/queries/useProviderQueries';
import type { GroupedIssuerRates } from '@/services/issuer-provider-rate/Issuer-provider-rate-type';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { computed } from 'vue';
import { useRoute } from 'vue-router';


const { data: issuersProviderRateData, isFetched, filters } = useIssuerProviderRateFiltersQuery();
const { data: providersData, isFetched: isFetchedProvider } = useProvidersFiltersQuery(undefined, 100);
const { data: issuersData, isFetched: isFetchedIssuer } = useIssuersFiltersQuery(100);
const { startLoadingSkeleton } = useLoaderStore();

const groupedIssuersProviderRateData = computed(() => {
    if (!isFetched.value) return [];
    const grouped: { [key: string]: GroupedIssuerRates } = {};

    for (const item of issuersProviderRateData.value?.items ?? []) {
        if (!grouped[item.issuer_id]) {
            grouped[item.issuer_id] = {
                id: item.issuer_id,
                issuer: item.issuer,
                issuer_id: item.issuer_id,
                providers: [],
            };
        }

        grouped[item.issuer_id].providers.push({
            provider: item.provider,
            provider_id: item.provider_id,
            cashin_rate: item.cashin_rate,
            cashout_rate: item.cashout_rate,
            id_line_to_update: item.id
        });
        grouped[item.issuer_id].providers = grouped[item.issuer_id].providers.sort((a, b) => a.provider.operator.toLowerCase().localeCompare(b.provider.operator.toLowerCase()));

    }

    return Object.values(grouped).sort((a, b) => a.issuer.name.toLowerCase().localeCompare(b.issuer.name.toLowerCase()));

})

const issuersElements = computed(() => {
    const testIssuers = issuersData!.value?.items;
    return isFetchedIssuer.value == true ? issuersData!.value!.items.map((issuer) => ({ name: issuer.name, value: issuer.id })) : [];
})

const providersElements = computed(() => {
    const testProviders = providersData!.value?.items;
    return isFetchedProvider.value == true ? providersData!.value!.items.map((provider) => ({ name: `${provider.operator}`, value: provider.id })) : [];
})


const route = useRoute();

const nextPage = async () => {
    filters.page = filters.page + 1;
    startLoadingSkeleton();

}
const goToPage = async (page: number) => {

    filters.page = page
    startLoadingSkeleton();

}

const prevPage = async () => {

    filters.page = filters.page - 1;
    startLoadingSkeleton();

}


</script>

<style scoped></style>