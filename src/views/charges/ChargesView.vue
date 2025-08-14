<template>
    <div class="px-4 bg-white">

        <header class="flex justify-between items-center">
            <div class="mb-6 space-y-1">

                <h1 class="text-md xl:text-xl font-bold font-merriweathersans leading-6 text-black">Charges</h1>
                <p class="text-neutral-30 text-sm font-normal">Gestion des charges</p>
            </div>

            <div>
                <notificationIcon></notificationIcon>
            </div>
        </header>




        <div class="h-[1px] bg-neutral-70 my-5"></div>

        <section class="flex flex-col sm:flex-row justify-between mb-4">
            <SearchBar v-model="filters.q" class="w-full sm:w-[28%] sm:my-0 my-5"></SearchBar>
            <div>
                <AddChargeModal></AddChargeModal>

            </div>

        </section>

        <!-- charges table -->
        <CommonDataTable :default-page="filters.page" v-if="isFetched" :dynamic-width-columns="false"
            :total="chargesData!.total" :columns="chargesColumn" :data="chargesData?.items!" @prev-page="prevPage"
            @next-page="nextPage" @go-to-page="goToPage">
        </CommonDataTable>

    </div>
</template>

<script setup lang="ts">
import CommonDataTable from '@/components/common/commonDataTable.vue';

import AddChargeModal from '@/components/main/charges/addChargeModal.vue';
import { chargesColumn } from '@/components/main/charges/tables/chargesColumn';
import notificationIcon from '@/components/svg/notificationIcon.vue';
import SearchBar from '@/components/users/SearchBar.vue';
import { useChargesFiltersQuery } from '@/composables/queries/useChargeQueries';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { useRoute } from 'vue-router';

const { data: chargesData, isFetched, filters } = useChargesFiltersQuery();
const { startLoadingSkeleton } = useLoaderStore();

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