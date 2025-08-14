<template>
    <div class="px-4 h-full">

        <header class="flex justify-between items-center">
            <div class="mb-6 space-y-1">

                <h1 class="text-xl font-bold font-merriweathersans leading-6 text-black">gestion des webhooks et des
                    keys du
                    marchant</h1>
                <p class="text-neutral-30 text-sm font-normal">Suivez, gérez vos tokens et vos web books
                </p>
            </div>

            <div>
                <NotificationIcon>
                </notificationIcon>
            </div>
        </header>

        <section>
            <div class="flex flex-col gap-1" v-if="isFetchedMarchant">
                <article class="flex gap-3 items-center">
                    <p class="text-sm text-neutral-10 font-[700] text-[20px] font-merriweathersans">
                        {{ marchantData?.business_name }}
                    </p>
                    <div>
                        <span
                            class="text-xs font-medium px-[5px] py-[1px]  rounded-xl border text-[#633DA5] border-[#633DA5]">
                            {{ marchantData?.email }}</span>
                    </div>
                </article>
                <p v-if="isFetchedMarchant" class="text-sm text-neutral-20 font-worksans">{{ marchantData?.phone }}</p>
            </div>
        </section>


        <section class="space-y-10">
            <ApiTokens></ApiTokens>
            <WebHooks></WebHooks>
        </section>








    </div>
</template>

<script setup lang="ts">
import ApiTokens from '@/components/developpers/apiTokens.vue';
import WebHooks from '@/components/developpers/webHooks.vue';
import NotificationIcon from '@/components/svg/notificationIcon.vue';
import { useMerchantQuery } from '@/composables/queries/useMerchantQueries';
import { useRoute } from 'vue-router';

const route = useRoute();
const { isFetched: isFetchedMarchant, data: marchantData, isFetching: isFetchingMarchant } = useMerchantQuery(route.params.id as string);




</script>

<style scoped></style>