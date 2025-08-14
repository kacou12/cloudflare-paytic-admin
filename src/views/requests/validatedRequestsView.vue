<template>
    <div class="px-4 ">

        <header class="flex justify-between items-center">
            <div class="mb-6 space-y-1">

                <h1 class="text-xl font-bold font-merriweathersans leading-6 text-black">Gestion des requetes validées
                </h1>
                <p class="text-neutral-30 text-sm font-normal">Suivez, gérez et prévoyez les requests de
                    vos clients
                </p>
            </div>

            <div>
                <notificationIcon></notificationIcon>
            </div>
        </header>

        <!-- Filtres dates en haut -->
        <section class="flex  flex-col  md:flex-row my-5 gap-5 justify-between w-full ">
            <div class="h-10  w-full">

                <DashboardTabs v-model="tabsValue" class="w-full "></DashboardTabs>

            </div>

            <div class="gap-3  w-full  md:w-[60%] 2xl:w-[50%]  flex justify-start lg:justify-end">

                <CommonDatesFilter :update-handler="updateData" v-model="dates"></commonDatesFilter>

            </div>
        </section>


        <div class="flex xl:justify-between flex-col xl:flex-row my-4 ">
            <section class="xl:flex xl:flex-wrap grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3  gap-2 ">


                <CommonSelect v-model="limitModel" :default-width="width >= 1366 ? 'w-fit' : 'w-full'" class=" w-full"
                    title="Lignes par page"
                    :elements="[{ name: 'Lignes par page', value: '10' }, { name: '20', value: '20' }, { name: '50', value: '50' }, { name: '100', value: '100' }]">
                </CommonSelect>


            </section>
            <section class="xl:w-[19%] lg:w-1/3 my-5 xl:my-0 ">
                <SearchBar :is-loading="isFetching && filters.q !== undefined" v-model="filters.q"></SearchBar>
            </section>
        </div>

        <section class="my-5">

            <CommonDataTable :page-size="10" ref="my-table" :default-page="filters.page"
                :total="merchantRequestsData?.total ?? 0" :columns="requestsColumn"
                :data="merchantRequestsData?.items ?? []" @go-to-page="goToPage" @prev-page="prevPage"
                @next-page="nextPage">
            </CommonDataTable>
        </section>




    </div>
</template>

<script setup lang="ts">
import CommonDataTable from "@/components/common/commonDataTable.vue";
import CommonDatesFilter from "@/components/common/commonDatesFilter.vue";
import CommonSelect from '@/components/common/commonSelect.vue';
import DashboardTabs from "@/components/main/dashboard/dashboardTabs.vue";
import { requestsColumn } from "@/components/main/requests/tables/requestsColumn";
import SearchBar from '@/components/users/SearchBar.vue';
import { useMerchantRequestsFiltersQuery } from "@/composables/queries/useMerchantRequestQueries";
import { MerchantRequestStatusEnum } from "@/constants/constant.enum";
import { useAuthStore } from "@/stores/useAuthStore";
import { useLoaderStore } from "@/stores/useLoaderStore";
import { useMerchantRequestStore } from "@/stores/useMerchantRequestStore";
import { useWindowSize } from '@vueuse/core';
import { storeToRefs } from "pinia";

import {
    CalendarDate
} from '@internationalized/date';
import type { DateRange } from "radix-vue";
import { ref, watch, type Ref } from "vue";



const filters = useMerchantRequestStore()

const { fullName, logout: storeLogout } = useAuthStore();
const { user } = storeToRefs(useAuthStore());

const { width, height } = useWindowSize()


const { isFetched, data: merchantRequestsData, isFetching } = useMerchantRequestsFiltersQuery(MerchantRequestStatusEnum.Approved);

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

<style scoped></style>