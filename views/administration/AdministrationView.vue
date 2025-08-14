<template>
    <div class="px-4 ">

        <header class="flex justify-between items-center">
            <div class="mb-6 space-y-1">

                <h1 class="text-md xl:text-xl font-bold font-merriweathersans leading-6 text-black">Administration</h1>
                <p class="text-neutral-30 text-sm font-normal">Gestion des administrateurs</p>
            </div>

            <div>
                <notificationIcon></notificationIcon>
            </div>
        </header>


        <div class="flex flex-col sm:flex-row justify-between my-4">
            <section class="flex gap-2 items-center">
                <p class="text-[18px] font-semibold">Equipe Send Chap</p>
                <div>
                    <span
                        class="text-xs font-medium px-[5px] py-[1px]  rounded-xl border text-[#633DA5] border-[#633DA5]">20
                        Personnes</span>
                </div>
            </section>
            <section class="sm:my-0 my-5">

                <!-- <CommonButton @action="console.log('wapiti')" title="Créer un compte"></CommonButton> -->

                <AddAdminAccountModal> </AddAdminAccountModal>

            </section>

        </div>

        <div class="h-[1px] bg-neutral-70 my-5"></div>

        <section class="flex flex-col sm:flex-row justify-between mb-4">
            <div class="flex gap-3">

                <CommonSelect title="Trier par"
                    :elements="[{ name: 'Tout', value: 'all' }, { name: 'En cours', value: 'en cours' }, { name: 'Termine', value: 'termine' }]">
                    <template #icon>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16 4V13H18.25L15.25 16.75L12.25 13H14.5V4H16ZM10 14.5V16H3.25V14.5H10ZM11.5 9.25V10.75H3.25V9.25H11.5ZM11.5 4V5.5H3.25V4H11.5Z"
                                fill="#666666" />
                        </svg>

                    </template>
                </CommonSelect>
            </div>
            <SearchBar v-model="filters.searchText" class="w-full sm:w-[28%] sm:my-0 my-5"></SearchBar>

        </section>

        <!-- Transactions table -->
        <CommonDataTable :default-page="filters.page" v-if="isFetched" :dynamic-width-columns="false"
            :total="adminsData!.total" :columns="administrationColumn" :data="adminsData?.items!" @prev-page="prevPage"
            @next-page="nextPage" @go-to-page="goToPage">
        </CommonDataTable>





    </div>
</template>

<script setup lang="ts">
import CommonDataTable from '@/components/common/commonDataTable.vue';
import CommonSelect from '@/components/common/commonSelect.vue';
import { administrationColumn } from '@/components/main/administration/tables/administrationColumn';
import AddAdminAccountModal from '@/components/modals/addAdminAccountModal.vue';

import notificationIcon from '@/components/svg/notificationIcon.vue';
import SearchBar from '@/components/users/SearchBar.vue';
import { useLoaderStore } from '@/stores/useLoaderStore';
// import type { AdministrationType } from '@/interfaces/datatable.interface';
import { useAdminsFiltersQuery } from '@/composables/queries/useAdminQueries';
import { useRoute } from 'vue-router';


const { data: adminsData, isFetched, filters, isLoading, isSuccess, isFetching } = useAdminsFiltersQuery();
const { startLoadingSkeleton, stopLoadingSkeleton } = useLoaderStore();

const route = useRoute();

// pour le skeleton loader
// watch(isFetching, (n) => {
//     console.log("isFetching", n);

//     if (n) {
//         console.log("stop loading skeleton");
//         // stopLoadingSkeleton()
//         stopLoadingSkeleton()
//     }
// }, { immediate: true })









const nextPage = async () => {

    filters.page = filters.page + 1;
    startLoadingSkeleton();


}
const goToPage = async (page: number) => {

    filters.page = page
    startLoadingSkeleton();

    // setTimeout(() => {
    //     stopLoadingSkeleton()
    // }, 5000)

}

const prevPage = async () => {

    filters.page = filters.page - 1;
    startLoadingSkeleton();


    // setTimeout(() => {
    //     stopLoadingSkeleton()
    // }, 5000)

}


</script>

<style scoped></style>