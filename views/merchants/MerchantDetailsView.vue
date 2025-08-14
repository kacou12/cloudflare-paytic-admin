<template>
    <div class="px-4 w-full ">
        <!-- Titre du tableau de bord -->
        <header class="mb-6">
            <h1 class="text-xl font-bold font-merriweathersans text-black">Details marchant</h1>
            <p class="text-sm text-[#808080]">Suivez, gérez et prévoyez les collectes de vos utilisateurs</p>
        </header>

        <section class="flex items-center justify-between">

            <div class="flex flex-col gap-1" v-if="isFetchedMarchant">
                <article class="flex gap-3 items-center">
                    <p class="text-sm text-neutral-10 font-[700] text-[20px] font-merriweathersans">
                        {{ marchantData?.business_name }}
                    </p>
                    <div>
                        <span v-if="isFetchedTransactionsMarchant"
                            class="text-xs font-medium px-[5px] py-[1px]  rounded-xl border text-[#633DA5] border-[#633DA5]">
                            {{ transactionsMarchantData?.total }} transaction(s)</span>
                    </div>
                </article>
                <p v-if="isFetchedMarchant" class="text-sm text-neutral-20 font-worksans">{{ marchantData?.phone }}</p>
            </div>

            <article class="space-x-3" v-if="isFetchedMarchant">
                <MerchantUpdateProfilModal :merchant="marchantData!"></MerchantUpdateProfilModal>
                <MerchantUpdateChargesModal :merchant="marchantData!"></MerchantUpdateChargesModal>

                <!-- <CommonButton type="default" @action="console.log('wapiti')" title="Modifier profil"></CommonButton>
                <CommonButton type="outline" @action="console.log('wapiti')" title="Modifier les charges">
                </CommonButton> -->
                <!-- <CommonButton type="destructive" @action="console.log('wapiti')" title="Supprimer"></CommonButton> -->

            </article>
        </section>

        <!-- Filtres en haut -->
        <section class="flex  flex-col  md:flex-row my-5 gap-5 justify-between w-full ">
            <div class="h-10  w-full">

                <DashboardTabs v-model="tabsValue" class="w-full "></DashboardTabs>

            </div>

            <div class="gap-3  w-full  md:w-[60%] 2xl:w-[50%]  flex justify-start lg:justify-end">

                <CommonDatesFilter :update-handler="updateData" v-model="dates"></commonDatesFilter>

            </div>
        </section>



        <!-- Contenu principal -->
        <section class="  mx-auto">
            <!-- Cards principales -->
            <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5  gap-6" v-if="isFetchedStats">

                <CommonStatisticCard :amount="transactionStatsData!.volume_transactions.toString()"
                    sub-title="L'essentiel des volumes de transaction" title="Volume transactions" :id="1">
                </CommonStatisticCard>

                <CommonStatisticCard :amount="transactionStatsData!.volume_collected.toString()"
                    sub-title="L'essentiel des volumes collectés" title="Volume collecte" :id="2">
                </CommonStatisticCard>

                <CommonStatisticCard :amount="transactionStatsData!.volume_transfered.toString()"
                    sub-title="L'essentiel des volumes transferés" title="Volume transferts" :id="3">
                </CommonStatisticCard>

                <WalletCard :amount="transactionStatsData?.balance_cashout" class="flex-1" :id="2"
                    title="Solde collecte"></WalletCard>

                <WalletCard :amount="transactionStatsData?.balance_wallet" class="flex-1" :id="3"
                    title="Solde transfert"></WalletCard>

            </div>
            <!-- <CommonStatisticCard></CommonStatisticCard> -->
        </section>


        <section class="grid grid-cols-1 md:grid-cols-3  xl:grid-cols-5 gap-6 h-[232px] mt-5" v-if="isFetchedStats">

            <div class="h-full  flex flex-col justify-between gap-5">
                <section class="flex flex-col justify-center items-center  flex-1
                bg-white p-5 rounded-xl shadow border border-neutral-70  font-publicsans relative">
                    <p class="text-sm">Nombre de réussites</p>
                    <p class="text-3xl">{{ transactionStatsData?.count_transaction_success }}</p>
                    <div class="absolute top-0 bottom-[-1px] right-0 left-0 border-b-2 border-red-400 rounded-lg"></div>

                </section>

                <section
                    class="flex flex-col justify-center items-center  flex-1 bg-white p-5 rounded-xl shadow border border-neutral-70  font-publicsans relative">
                    <p class="text-sm">Nombre d'echecs</p>
                    <p class="text-3xl">{{ transactionStatsData?.count_transaction_failed }}</p>

                    <div class="absolute top-0 bottom-[-1px] right-0 left-0 border-b-2 border-red-400 rounded-lg"></div>


                </section>
            </div>
            <div class="col-span-3 h-full  flex justify-end " v-if="isFetchedStats">

                <CommonDoughnutCard :count_txns_failed="transactionStatsData!.count_transaction_failed"
                    :count_txns_success="transactionStatsData!.count_transaction_success"
                    :sum_txns="transactionStatsData!.volume_transactions"
                    :sum_txns_amount_group_by_provider="transactionStatsData!.volume_by_provider.map((item) => ({ operator: item.operator.toString(), total: item.total }))"
                    class="w-full"></CommonDoughnutCard>
            </div>
        </section>

        <!-- filters sections -->
        <div class="flex xl:justify-between flex-col md:flex-row my-4">
            <section class="xl:flex xl:flex-wrap grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3  gap-2 ">
                <CommonSelect v-model="typeModel" default-width="w-fit" class="w-full"
                    title="Filtre par type de transaction" :elements="[
                        { name: 'Filtre par type  de transaction', value: 'all' },
                        { name: 'Collecte', value: TransactionTypesEnum.Payout },
                        { name: 'Transfert', value: TransactionTypesEnum.Payin }]">
                </CommonSelect>
                <CommonSelect v-model="statusModel" :default-width="width >= 1366 ? 'w-fit' : 'w-full'" class=" w-full"
                    title="Filtre par statut" :elements="[
                        { name: 'Filtre par statut', value: 'all' },
                        { name: 'En attente', value: TransactionStatusEnum.Pending },
                        { name: 'En cours ', value: TransactionStatusEnum.Processing },
                        { name: 'Effectué', value: TransactionStatusEnum.Success },
                        { name: 'Echoué ', value: TransactionStatusEnum.Failed },
                        { name: 'Remboursé ', value: TransactionStatusEnum.Refunded },
                    ]">
                </CommonSelect>

                <CommonSelect v-model="limitModel" :default-width="width >= 1366 ? 'w-fit' : 'w-full'" class=" w-full"
                    title="Lignes par page"
                    :elements="[{ name: 'Lignes par page', value: '10' }, { name: '20', value: '20' }, { name: '50', value: '50' }, { name: '100', value: '100' }]">
                </CommonSelect>
                <CommonSelect v-model="operatorModel" :default-width="width >= 1366 ? 'w-fit' : 'w-full'"
                    class=" w-full" title="Filtre par operateur" :elements="[
                        { name: 'Filtre par operateur', value: 'all' },
                        { name: 'Orange', value: OperatorsEnum.Orange },
                        { name: 'MTN', value: OperatorsEnum.Mtn },
                        { name: 'Moov', value: OperatorsEnum.Moov },
                        { name: 'Wave', value: OperatorsEnum.Wave },
                    ]">
                </CommonSelect>


            </section>
            <section class="xl:w-[19%] my-5 xl:my-0 ">
                <SearchBar :is-loading="isFetchedTransactionsMarchant && filters.q !== undefined" v-model="filters.q">
                </SearchBar>
            </section>
        </div>


        <section class="my-5 space-y-5">

            <CommonDataTable :page-size="limitModel ? parseInt(limitModel) : 10" ref="my-table"
                :default-page="filters.page" :total="transactionsMarchantData?.total ?? 0"
                :columns="collectionAndTransferColumn" :data="transactionsMarchantData?.items ?? []"
                @go-to-page="goToPage" @prev-page="prevPage" @next-page="nextPage">
            </CommonDataTable>
        </section>






    </div>
</template>

<script setup lang="ts">
import { OperatorsEnum, TransactionStatusEnum, TransactionTypesEnum } from "@/constants/constant.enum";

import CommonButton from '@/components/buttons/commonButton.vue';
import CommonDataTable from '@/components/common/commonDataTable.vue';
import CommonDatesFilter from '@/components/common/commonDatesFilter.vue';
import CommonDoughnutCard from '@/components/common/commonDoughnutCard.vue';
import CommonSelect from '@/components/common/commonSelect.vue';
import CommonStatisticCard from '@/components/common/commonStatisticCard.vue';
import { collectionAndTransferColumn } from "@/components/main/dashboard/collectionAndTransferColumn";
import DashboardTabs from '@/components/main/dashboard/dashboardTabs.vue';
import SearchBar from '@/components/users/SearchBar.vue';
import WalletCard from '@/components/walletCard.vue';
import { useMerchantQuery, useMerchantStatsQuery, useTransactionsFiltersMerchantQuery } from '@/composables/queries/useMerchantQueries';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { useTransactionFiltersStore } from '@/stores/useTransactionFilterStore';
import {
    CalendarDate
} from '@internationalized/date';
import type { DateRange } from "radix-vue";
import { ref, watch, type Ref } from "vue";
import { useRoute } from 'vue-router';
import MerchantUpdateProfilModal from "@/components/main/merchants/tables/merchantUpdateProfilModal.vue";
import MerchantUpdateChargesModal from "@/components/main/merchants/tables/merchantUpdateChargesModal.vue";
import { useWindowSize } from "@vueuse/core";

const filters = useTransactionFiltersStore()
const route = useRoute();

const { width, height } = useWindowSize()



const { isFetched: isFetchedTransactionsMarchant, data: transactionsMarchantData, isFetching: isFetchingTransactionsMarchant } = useTransactionsFiltersMerchantQuery(route.params.id as string);
const { isFetched: isFetchedMarchant, data: marchantData, isFetching: isFetchingMarchant } = useMerchantQuery(route.params.id as string);
const { isFetched: isFetchedStats, data: transactionStatsData } = useMerchantStatsQuery(route.params.id as string);

const { startLoadingSkeleton, stopLoadingSkeleton } = useLoaderStore();


const [statusModel,] = defineModel('status', {
    set(value: string) {
        if (value == "all") {
            filters.status = undefined;
        } else {
            filters.status = value;
        }
        return value
    },
    //   get(v) {
    //     return v;
    //   },
    default: undefined,
})

const [typeModel,] = defineModel('type', {
    set(value: string) {
        if (value == "all") {
            filters.type = undefined;
        } else {
            filters.type = value;
        }
        return value
    },
    //   get(v) {
    //     return v;
    //   },
    default: undefined,
})

const [operatorModel,] = defineModel('operator', {
    set(value: string) {
        if (value == "all") {
            filters.operator = undefined;
        } else {
            filters.operator = value;
        }
        return value
    },
    //   get(v) {
    //     return v;
    //   },
    default: undefined,
})

const [limitModel, limitModifiers] = defineModel('limitProvider', {
    type: String,

    set(value: string) {
        filters.limit = parseInt(value);
        return value
    },
    //   get(v) {
    //     return v;
    //   },
    default: undefined,
})


const tabsValue = ref("0");
let date = new Date();

const dates = ref({
    start: new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
    end: new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
}) as Ref<DateRange>
// const dates = ref({
//     start: new CalendarDate(date.getFullYear(), date.getMonth(), date.getDate()),
//     end: new CalendarDate(date.getFullYear(), date.getMonth(), date.getDate()),
// }) as Ref<DateRange>

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


const updateData = () => {
    tabsValue.value = "";
    const startDate = dates.value.start!.toDate('Africa/Abidjan')
    const endDate = dates.value.end!.toDate('Africa/Abidjan')
    filters.dates = [dates.value.start!.toDate('Africa/Abidjan'), dates.value.end!.toDate('Africa/Abidjan')]
}

watch(tabsValue, (n, o) => {
    if (n == "") return;
    // yesterday
    if (n == "1") {
        dates.value = {
            start:
                new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()).subtract({ days: parseInt("1") }),
            end: new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()).subtract({ days: parseInt("1") }),
        }

    } else {
        dates.value = {
            start:
                new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()).subtract({ days: parseInt(n) }),
            end: new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
        }

    }
    filters.dates = [dates.value.start!.toDate('Africa/Abidjan'), dates.value.end!.toDate('Africa/Abidjan')]
})






</script>

<style>
/* Ajoutez des styles personnalisés si nécessaire */
</style>