<template>
  <div class="px-4 w-full ">
    <!-- Titre du tableau de bord -->
    <header class="mb-6">
      <h1 class="text-xl font-bold font-merriweathersans text-black">Tableau de bord</h1>
      <p class="text-sm text-[#808080]">Bienvenue, {{ fullName() }} !</p>
    </header>

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
    <section class=" 2xl:w-[70%] mx-auto ">
      <FadeSlideAnimation>
        <div class="grid grid-cols-1 md:grid-cols-3  gap-6" v-if="isFetchedStats">

          <CommonStatisticCard :amount="dashboardTransactionsStatsData!.all_txns_amount.toString()"
            sub-title="L'essentiel des volumes de transaction" title="Volume transactions" :id="1">
          </CommonStatisticCard>
          <CommonStatisticCard :amount="dashboardTransactionsStatsData!.collected_txns_amount.toString()"
            sub-title="L'essentiel des volumes collectés" title="Volume collecte" :id="2">
          </CommonStatisticCard>
          <CommonStatisticCard :amount="dashboardTransactionsStatsData!.transfered_txns_amount.toString()"
            sub-title="L'essentiel des volumes transferés" title="Volume transferts" :id="3">
          </CommonStatisticCard>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6 h-[213px]">
          <Skeleton class="h-full w-full rounded-lg" />
          <Skeleton class="h-full w-full rounded-lg" />
          <Skeleton class="h-full w-full rounded-lg" />
        </div>
      </FadeSlideAnimation>
    </section>

    <!-- filters sections -->
    <div class="flex xl:justify-between flex-col xl:flex-row my-4 ">
      <section class="xl:flex xl:flex-wrap grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3  gap-2 ">
        <CommonSelect v-model="typeModel" :default-width="width >= 1366 ? 'w-fit' : 'w-full'" class=" w-full"
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
          title="Filtre par operateur" :elements="[
            { name: 'Filtre par operateur', value: 'all' },
            { name: 'Orange', value: OperatorsEnum.Orange },
            { name: 'MTN', value: OperatorsEnum.Mtn },
            { name: 'Moov', value: OperatorsEnum.Moov },
            { name: 'Wave', value: OperatorsEnum.Wave },
          ]">
        </CommonSelect>


      </section>
      <section class="xl:w-[19%] lg:w-1/3 my-5 xl:my-0 ">
        <SearchBar :is-loading="isFetching && filters.q !== undefined" v-model="filters.q"></SearchBar>
      </section>
    </div>

    <section class="my-5 space-y-5">

      <div class="flex justify-end ">

        <div>

          <CustomButton @click="$router.push({ name: AppRoute.TRANSACTIONS.name })" class="px-10" type="default">
            <span>Voir Tout</span>
            <ArrowRight></ArrowRight>
          </CustomButton>
        </div>
      </div>


      <CommonDataTable :page-size="limitModel ? parseInt(limitModel) : 10" ref="my-table" :default-page="filters.page"
        :total="transactionsDashboardData?.total ?? 0" :columns="collectionAndTransferColumn"
        :data="transactionsDashboardData?.items ?? []" @go-to-page="goToPage" @prev-page="prevPage"
        @next-page="nextPage">
      </CommonDataTable>
    </section>






  </div>
</template>

<script setup lang="ts">
import CustomButton from "@/components/buttons/customButton.vue";
import CommonDataTable from "@/components/common/commonDataTable.vue";
import CommonDatesFilter from "@/components/common/commonDatesFilter.vue";
import CommonSelect from '@/components/common/commonSelect.vue';
import CommonStatisticCard from "@/components/common/commonStatisticCard.vue";
import { collectionAndTransferColumn } from "@/components/main/dashboard/collectionAndTransferColumn";
import DashboardTabs from "@/components/main/dashboard/dashboardTabs.vue";
import SearchBar from '@/components/users/SearchBar.vue';
import { useDashboardTransactionsFiltersQuery, useDashboardTransactionsStatsQuery } from "@/composables/queries/useTransactionQueries";
import { AppRoute } from '@/constants/app-route';
import { OperatorsEnum, TransactionStatusEnum, TransactionTypesEnum } from "@/constants/constant.enum";
import { useLoaderStore } from "@/stores/useLoaderStore";
import { useTransactionFiltersStore } from "@/stores/useTransactionFilterStore";
import { useWindowSize } from '@vueuse/core';
import {
  CalendarDate
} from '@internationalized/date';
import { ArrowRight } from "lucide-vue-next";
import type { DateRange } from "radix-vue";
import { ref, watch, type Ref } from "vue";
import { useAuthStore } from "@/stores/useAuthStore";
import { storeToRefs } from "pinia";
import FadeSlideAnimation from "@/components/animations/fadeSlideAnimation.vue";
import Skeleton from "@/components/ui/skeleton/Skeleton.vue";
import FadeInAnimation from "@/components/animations/fadeInAnimation.vue";

const filters = useTransactionFiltersStore()

const { fullName, logout: storeLogout } = useAuthStore();
const { user } = storeToRefs(useAuthStore());

const { width, height } = useWindowSize()


const { isFetched, data: transactionsDashboardData, isFetching } = useDashboardTransactionsFiltersQuery();
const { isFetched: isFetchedStats, data: dashboardTransactionsStatsData, isFetching: isFetchingStats } = useDashboardTransactionsStatsQuery();

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
  default: undefined,
})

const [limitModel, limitModifiers] = defineModel('limitProvider', {
  type: String,

  set(value: string) {
    filters.limit = parseInt(value);
    return value
  },
  default: undefined,
})



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

const tabsValue = ref("0");
let date = new Date();

const dates = ref({
  start: new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
  end: new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
}) as Ref<DateRange>


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