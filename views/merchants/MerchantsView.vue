<template>
    <div class="px-4 bg-white">

        <header class="flex justify-between items-center">
            <div class="mb-6 space-y-1">

                <h1 class="text-md xl:text-xl font-bold font-merriweathersans leading-6 text-black">Marchants</h1>
                <p class="text-neutral-30 text-sm font-normal">Gestion des marchants</p>
            </div>

            <div>
                <notificationIcon></notificationIcon>
            </div>
        </header>



        <div class="h-[1px] bg-neutral-70 my-5"></div>

        <section class="flex flex-col sm:flex-row justify-between mb-4">
            <SearchBar :is-loading="isFetching && filters.q !== undefined" v-model="filters.q"
                class="w-full sm:w-[28%] sm:my-0 my-5"></SearchBar>
            <div>
                <AddMerchantModal></AddMerchantModal>
            </div>

        </section>

        <!-- merchants table -->
        <CommonDataTable :page-size="10" ref="my-table" :default-page="filters.page" :total="merchantsData?.total ?? 0"
            :columns="merchantsColumn" :data="merchantsData?.items ?? []" @go-to-page="goToPage" @prev-page="prevPage"
            @next-page="nextPage">
        </CommonDataTable>

    </div>
</template>

<script setup lang="ts">
import CommonDataTable from '@/components/common/commonDataTable.vue';
import AddMerchantModal from '@/components/main/merchants/addMerchantModal.vue';
import { merchantsColumn } from '@/components/main/merchants/tables/merchantsColumn';
import notificationIcon from '@/components/svg/notificationIcon.vue';
import SearchBar from '@/components/users/SearchBar.vue';
import { useMerchantQuery, useMerchantsFiltersQuery } from '@/composables/queries/useMerchantQueries';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { useRoute } from 'vue-router';

const { data: merchantsData, isFetched, filters, isFetching } = useMerchantsFiltersQuery();

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