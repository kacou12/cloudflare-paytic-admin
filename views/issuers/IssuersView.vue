<template>
    <div class="px-4 bg-white">

        <header class="flex justify-between items-center">
            <div class="mb-6 space-y-1">

                <h1 class="text-md xl:text-xl font-bold font-merriweathersans leading-6 text-black">Aggregateurs</h1>
                <p class="text-neutral-30 text-sm font-normal">Gestion des aggregateurs</p>
            </div>

            <div>
                <notification-icon></notification-icon>
            </div>
        </header>




        <div class="h-[1px] bg-neutral-70 my-5"></div>

        <section class="flex flex-col sm:flex-row justify-between mb-4">
            <SearchBar :is-loading="isFetching && filters.q !== undefined" v-model="filters.q"
                class="w-full sm:w-[28%] sm:my-0 my-5"></SearchBar>
            <!-- <div>

                <AddIssuerModal></AddIssuerModal>

            </div> -->

        </section>

        <!-- providers table -->
        <CommonDataTable :default-page="filters.page" :dynamic-width-columns="false" :total="issuersData?.total ?? 0"
            :columns="issuersColumn" :data="issuersData?.items ?? []" @prev-page="prevPage" @next-page="nextPage"
            @go-to-page="goToPage">
        </CommonDataTable>

    </div>
</template>

<script setup lang="ts">
import CommonDataTable from '@/components/common/commonDataTable.vue';
import { issuersColumn } from '@/components/main/issuers/tables/issuersColumn';
import AddIssuerModal from '@/components/modals/addIssuerModal.vue';
import notificationIcon from '@/components/svg/notificationIcon.vue';
import SearchBar from '@/components/users/SearchBar.vue';
import { useIssuersFiltersQuery } from '@/composables/queries/useIssuerQueries';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { useRoute } from 'vue-router';


const { data: issuersData, isFetched, filters, isFetching } = useIssuersFiltersQuery();
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